import { Command, Flags, Interfaces } from '@oclif/core'
import {
  resolveConfig,
  loadTokens,
  saveTokens,
  refreshAccessToken,
  formatOutput,
  formatError,
  ZohoApiClient,
  type ZohoConfig,
  type TokenData,
} from '@zoho-cli/core'

export type BaseFlags<T extends typeof Command> = Interfaces.InferredFlags<typeof BaseCommand['baseFlags'] & T['flags']>
export type BaseArgs<T extends typeof Command> = Interfaces.InferredArgs<T['args']>

export abstract class BaseCommand<T extends typeof Command> extends Command {
  static baseFlags = {
    pretty: Flags.boolean({
      description: 'Pretty-print JSON output',
      default: false,
      helpGroup: 'GLOBAL',
    }),
  }

  protected flags!: BaseFlags<T>
  protected args!: BaseArgs<T>
  protected zohoConfig!: ZohoConfig

  public async init(): Promise<void> {
    await super.init()
    const { args, flags } = await this.parse({
      flags: this.ctor.flags,
      baseFlags: (super.ctor as typeof BaseCommand).baseFlags,
      args: this.ctor.args,
      strict: this.ctor.strict,
    })
    this.flags = flags as BaseFlags<T>
    this.args = args as BaseArgs<T>
    this.zohoConfig = await resolveConfig(undefined, process.env as Record<string, string>)
  }

  protected outputSuccess(data: unknown, meta?: Record<string, unknown>): void {
    const envelope = { success: true as const, data, ...(meta ? { meta } : {}) }
    this.log(formatOutput(envelope, (this.flags as any).pretty))
  }

  protected outputError(code: string, message: string, details?: unknown): void {
    const envelope = formatError({ code, message, ...(details ? { details } : {}) })
    this.log(formatOutput(envelope, (this.flags as any).pretty))
  }

  protected async getTokensOrFail(): Promise<TokenData> {
    const tokens = await loadTokens()
    if (!tokens) {
      this.outputError('AUTH_REQUIRED', 'Not authenticated. Run "zoho auth login" first.')
      this.exit(2)
    }
    return tokens
  }

  protected async createApiClient(app: string, version: string): Promise<ZohoApiClient> {
    return new ZohoApiClient({
      region: this.zohoConfig.region,
      app,
      version,
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
}
