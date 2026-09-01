import { Command, Flags, Interfaces } from '@oclif/core'
import {
  resolveConfig,
  loadTokens,
  saveTokens,
  refreshAccessToken,
  formatOutput,
  formatError,
  formatSuccess,
  ZohoApiClient,
  PAYMENTS_REGION_DOMAINS,
  type ZohoConfig,
  type SuccessMeta,
} from '@zoho-cli/core'

export type PaymentsBaseFlags<T extends typeof Command> = Interfaces.InferredFlags<typeof PaymentsBaseCommand['baseFlags'] & T['flags']>
export type PaymentsBaseArgs<T extends typeof Command> = Interfaces.InferredArgs<T['args']>

export abstract class PaymentsBaseCommand<T extends typeof Command> extends Command {
  static baseFlags = {
    pretty: Flags.boolean({
      description: 'Pretty-print JSON output',
      default: false,
      helpGroup: 'GLOBAL',
    }),
    account: Flags.string({
      description: 'Zoho Payments account ID (overrides config)',
      helpGroup: 'GLOBAL',
      env: 'ZOHO_PAYMENTS_ACCOUNT_ID',
    }),
  }

  protected flags!: PaymentsBaseFlags<T>
  protected args!: PaymentsBaseArgs<T>
  protected zohoConfig!: ZohoConfig
  private _apiClient?: ZohoApiClient

  public async init(): Promise<void> {
    await super.init()
    const { args, flags } = await this.parse({
      flags: this.ctor.flags,
      baseFlags: (super.ctor as typeof PaymentsBaseCommand).baseFlags,
      args: this.ctor.args,
      strict: this.ctor.strict,
    })
    this.flags = flags as PaymentsBaseFlags<T>
    this.args = args as PaymentsBaseArgs<T>
    this.zohoConfig = await resolveConfig(undefined, process.env as Record<string, string>)
  }

  /**
   * The Payments API has no endpoint to discover the account ID, so it must be
   * supplied explicitly (dashboard: Settings → Account Details).
   */
  protected resolveAccountId(): string {
    const flagAccount = (this.flags as any).account
    if (flagAccount) return flagAccount
    if (this.zohoConfig.defaultPaymentsAccount) return this.zohoConfig.defaultPaymentsAccount
    this.outputError(
      'ACCOUNT_MISSING',
      'Zoho Payments account ID not configured. Set via --account flag, "zoho config set defaultPaymentsAccount <id>", or ZOHO_PAYMENTS_ACCOUNT_ID env var.',
    )
    this.exit(3)
  }

  protected get apiClient(): ZohoApiClient {
    if (!this._apiClient) {
      const host = PAYMENTS_REGION_DOMAINS[this.zohoConfig.region]
      if (!host) {
        this.outputError(
          'REGION_UNSUPPORTED',
          `Zoho Payments is only available in the "in" and "us" regions (configured region: "${this.zohoConfig.region}")`,
        )
        this.exit(3)
      }
      this._apiClient = new ZohoApiClient({
        region: this.zohoConfig.region,
        app: 'payments',
        version: 'v1',
        baseUrl: `https://${host}/api/v1`,
        getTokens: () => loadTokens(),
        onTokenRefresh: async (accessToken, expiresAt) => {
          const existing = await loadTokens()
          if (existing) {
            await saveTokens(undefined, { ...existing, accessToken, expiresAt })
          }
        },
        refreshToken: async () => {
          const tokens = await loadTokens()
          if (!tokens) throw new Error('No tokens available for refresh')
          return refreshAccessToken(this.zohoConfig.region, {
            refreshToken: tokens.refreshToken,
            clientId: this.zohoConfig.clientId!,
            clientSecret: this.zohoConfig.clientSecret!,
          })
        },
      })
    }
    return this._apiClient
  }

  protected async paymentsGet<R = any>(path: string, params?: Record<string, string>): Promise<R> {
    const { data } = await this.apiClient.get<R>(path, {
      params: { account_id: this.resolveAccountId(), ...params },
    })
    return data
  }

  protected async paymentsPost<R = any>(path: string, body?: unknown, params?: Record<string, string>): Promise<R> {
    const { data } = await this.apiClient.post<R>(path, body, {
      params: { account_id: this.resolveAccountId(), ...params },
    })
    return data
  }

  protected async paymentsPut<R = any>(path: string, body?: unknown, params?: Record<string, string>): Promise<R> {
    const { data } = await this.apiClient.put<R>(path, body, {
      params: { account_id: this.resolveAccountId(), ...params },
    })
    return data
  }

  protected outputSuccess(data: unknown, meta?: SuccessMeta): void {
    const envelope = formatSuccess(data, meta)
    this.log(formatOutput(envelope, (this.flags as any).pretty))
  }

  protected outputError(code: string, message: string, zohoErrorCode?: string, details?: unknown): void {
    const envelope = formatError({ code, message, zohoErrorCode, details })
    this.log(formatOutput(envelope, (this.flags as any).pretty))
  }

  protected handleApiError(error: any): never {
    if (error.response?.data) {
      const respData = error.response.data
      this.outputError(
        String(respData.code ?? 'API_ERROR'),
        respData.message ?? error.message,
        String(respData.code ?? ''),
      )
    } else {
      this.outputError('REQUEST_FAILED', error.message)
    }
    this.exit(1)
  }
}
