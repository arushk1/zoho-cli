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
  REGION_DOMAINS,
  type ZohoConfig,
  type SuccessMeta,
} from '@zoho-cli/core'

export type ExpenseBaseFlags<T extends typeof Command> = Interfaces.InferredFlags<typeof ExpenseBaseCommand['baseFlags'] & T['flags']>
export type ExpenseBaseArgs<T extends typeof Command> = Interfaces.InferredArgs<T['args']>

export abstract class ExpenseBaseCommand<T extends typeof Command> extends Command {
  static baseFlags = {
    pretty: Flags.boolean({
      description: 'Pretty-print JSON output',
      default: false,
      helpGroup: 'GLOBAL',
    }),
    org: Flags.string({
      description: 'Zoho Expense organization ID (overrides config)',
      helpGroup: 'GLOBAL',
      env: 'ZOHO_ORG_ID',
    }),
  }

  protected flags!: ExpenseBaseFlags<T>
  protected args!: ExpenseBaseArgs<T>
  protected zohoConfig!: ZohoConfig
  private _apiClient?: ZohoApiClient
  private _resolvedOrgId?: string

  public async init(): Promise<void> {
    await super.init()
    const { args, flags } = await this.parse({
      flags: this.ctor.flags,
      baseFlags: (super.ctor as typeof ExpenseBaseCommand).baseFlags,
      args: this.ctor.args,
      strict: this.ctor.strict,
    })
    this.flags = flags as ExpenseBaseFlags<T>
    this.args = args as ExpenseBaseArgs<T>
    this.zohoConfig = await resolveConfig(undefined, process.env as Record<string, string>)
  }

  protected async resolveOrgId(): Promise<string> {
    if (this._resolvedOrgId) return this._resolvedOrgId

    const flagOrg = (this.flags as any).org
    if (flagOrg) {
      this._resolvedOrgId = flagOrg
      return flagOrg
    }

    if (this.zohoConfig.defaultOrg) {
      this._resolvedOrgId = this.zohoConfig.defaultOrg
      return this.zohoConfig.defaultOrg
    }

    try {
      process.stderr.write('[zoho-cli] Auto-detecting Expense organization ID...\n')
      const { data } = await this.apiClient.get<{ organizations: Array<{ organization_id: string; name: string; is_default_org: boolean }> }>('/organizations')
      const orgs = data.organizations
      if (!orgs || orgs.length === 0) {
        this.outputError('NO_ORGS', 'No Zoho Expense organizations found for this account')
        this.exit(3)
      }

      const org = orgs.find((o) => o.is_default_org) ?? orgs[0]
      process.stderr.write(`[zoho-cli] Using organization "${org.name}" (${org.organization_id})\n`)
      this._resolvedOrgId = org.organization_id
      return org.organization_id
    } catch (error: any) {
      this.outputError('ORG_DETECTION_FAILED', `Failed to auto-detect organization: ${error.message}. Set manually via --org flag or "zoho config set defaultOrg <id>"`)
      this.exit(3)
    }
  }

  protected get apiClient(): ZohoApiClient {
    if (!this._apiClient) {
      const domain = REGION_DOMAINS[this.zohoConfig.region]
      this._apiClient = new ZohoApiClient({
        region: this.zohoConfig.region,
        app: 'expense',
        version: 'v1',
        baseUrl: `https://www.${domain}/expense/v1`,
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

  private async orgHeaders(): Promise<Record<string, string>> {
    const orgId = await this.resolveOrgId()
    return { 'X-com-zoho-expense-organizationid': orgId }
  }

  protected async expenseGet<R = any>(path: string, params?: Record<string, string>): Promise<R> {
    const headers = await this.orgHeaders()
    const { data } = await this.apiClient.get<R>(path, { params, headers })
    return data
  }

  protected async expensePost<R = any>(path: string, body?: unknown, params?: Record<string, string>): Promise<R> {
    const headers = await this.orgHeaders()
    const { data } = await this.apiClient.post<R>(path, body, { params, headers })
    return data
  }

  protected async expensePut<R = any>(path: string, body?: unknown, params?: Record<string, string>): Promise<R> {
    const headers = await this.orgHeaders()
    const { data } = await this.apiClient.put<R>(path, body, { params, headers })
    return data
  }

  protected async expenseDelete<R = any>(path: string, params?: Record<string, string>): Promise<R> {
    const headers = await this.orgHeaders()
    const { data } = await this.apiClient.delete<R>(path, { params, headers })
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
