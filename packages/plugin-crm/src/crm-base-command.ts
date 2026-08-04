import { Command, Flags, Interfaces } from '@oclif/core'
import {
  resolveConfig,
  loadTokens,
  saveTokens,
  refreshAccessToken,
  formatOutput,
  formatError,
  formatSuccess,
  mapZohoError,
  collectZohoRecordErrors,
  ZohoApiClient,
  type ZohoConfig,
  type SuccessMeta,
} from '@zoho-cli/core'
import { join } from 'node:path'
import { homedir } from 'node:os'
import { ModuleCache } from './module-cache.js'

export type CrmBaseFlags<T extends typeof Command> = Interfaces.InferredFlags<typeof CrmBaseCommand['baseFlags'] & T['flags']>
export type CrmBaseArgs<T extends typeof Command> = Interfaces.InferredArgs<T['args']>

export abstract class CrmBaseCommand<T extends typeof Command> extends Command {
  static baseFlags = {
    pretty: Flags.boolean({
      description: 'Pretty-print JSON output',
      default: false,
      helpGroup: 'GLOBAL',
    }),
    'api-version': Flags.string({
      description: 'CRM API version',
      default: 'v7',
      options: ['v7', 'v8'],
      helpGroup: 'GLOBAL',
    }),
  }

  protected flags!: CrmBaseFlags<T>
  protected args!: CrmBaseArgs<T>
  protected zohoConfig!: ZohoConfig
  private _apiClient?: ZohoApiClient
  private _moduleCache?: ModuleCache

  public async init(): Promise<void> {
    await super.init()
    const { args, flags } = await this.parse({
      flags: this.ctor.flags,
      baseFlags: (super.ctor as typeof CrmBaseCommand).baseFlags,
      args: this.ctor.args,
      strict: this.ctor.strict,
    })
    this.flags = flags as CrmBaseFlags<T>
    this.args = args as CrmBaseArgs<T>
    this.zohoConfig = await resolveConfig(undefined, process.env as Record<string, string>)
  }

  protected buildApiClient(baseUrl?: string): ZohoApiClient {
    return new ZohoApiClient({
      region: this.zohoConfig.region,
      app: 'crm',
      version: (this.flags as any)['api-version'] ?? 'v7',
      baseUrl,
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

  protected get apiClient(): ZohoApiClient {
    if (!this._apiClient) {
      this._apiClient = this.buildApiClient()
    }
    return this._apiClient
  }

  protected get uploadApiClient(): ZohoApiClient {
    const version = (this.flags as any)['api-version'] ?? 'v7'
    return this.buildApiClient(`https://upload.zoho.com/crm/${version}`)
  }

  protected async resolveCrmOrgId(explicitOrg?: string): Promise<string> {
    if (explicitOrg) return explicitOrg
    if (this.zohoConfig.defaultOrg) return this.zohoConfig.defaultOrg
    const fromEnv = process.env.ZOHO_DEFAULT_ORG ?? process.env.ZOHO_CRM_ORG_ID
    if (fromEnv) return fromEnv
    const { data } = await this.apiClient.get<{ org: Array<{ zgid: string }> }>('/org')
    const orgId = data.org?.[0]?.zgid
    if (!orgId) throw new Error('Could not resolve CRM org ID (zgid) from /org')
    return orgId
  }

  protected get moduleCache(): ModuleCache {
    if (!this._moduleCache) {
      this._moduleCache = new ModuleCache(join(homedir(), '.zoho-cli', 'cache'))
    }
    return this._moduleCache
  }

  protected async refreshModuleCache(): Promise<string[]> {
    const { data } = await this.apiClient.get<{ modules: Array<{ api_name: string }> }>('/settings/modules')
    const names = data.modules.map((m) => m.api_name)
    await this.moduleCache.set(names)
    return names
  }

  protected outputSuccess(data: unknown, meta?: SuccessMeta): void {
    const envelope = formatSuccess(data, meta)
    this.log(formatOutput(envelope, (this.flags as any).pretty))
  }

  protected outputError(code: string, message: string, zohoErrorCode?: string, details?: unknown): void {
    const envelope = formatError({ code, message, zohoErrorCode, details })
    this.log(formatOutput(envelope, (this.flags as any).pretty))
  }

  /**
   * Emits the result of a write operation.
   *
   * Zoho answers HTTP 200 even when it rejects a record, so a plain outputSuccess
   * would report `"success": true` and exit 0 on a record that was never written.
   * This converts a per-record rejection into an error envelope and a non-zero
   * exit; accepted records fall through to outputSuccess unchanged.
   */
  protected outputRecordResult(payload: unknown, meta?: SuccessMeta): void {
    const failures = collectZohoRecordErrors(payload)
    if (failures.length === 0) {
      this.outputSuccess(payload, meta)
      return
    }
    const primary = mapZohoError(failures[0])
    // On a bulk write, some records may have been accepted. Always report the
    // ratio so a partial failure is not mistaken for a total one, and hand back
    // every rejected record rather than just the first.
    const bulk = Array.isArray(payload)
    this.outputError(
      primary.code,
      bulk ? `${primary.message} (${failures.length} of ${payload.length} records rejected)` : primary.message,
      primary.zohoErrorCode,
      bulk ? failures : primary.details,
    )
    this.exit(1)
  }

  protected async runRecordCreate(
    module: string,
    payload: string | undefined,
    dryRun: boolean,
  ): Promise<void> {
    if (!payload) {
      this.outputError('MISSING_PAYLOAD', 'Provide --json (or --data) with the record fields')
      this.exit(3)
    }
    try {
      const recordData = JSON.parse(payload!)
      const body = { data: [recordData] }
      if (dryRun) {
        this.outputSuccess({ dryRun: true, method: 'POST', path: `/${module}`, body })
        return
      }
      const { data } = await this.apiClient.post(`/${module}`, body)
      this.outputRecordResult(data.data?.[0] ?? data, { module, action: 'create' })
    } catch (error: any) {
      if (error instanceof SyntaxError) {
        this.outputError('INVALID_JSON', 'Invalid JSON in --json/--data flag')
        this.exit(3)
      }
      this.handleApiError(error)
    }
  }

  protected async runRecordUpdate(
    module: string,
    id: string,
    payload: string | undefined,
    dryRun: boolean,
  ): Promise<void> {
    if (!payload) {
      this.outputError('MISSING_PAYLOAD', 'Provide --json (or --data) with the fields to update')
      this.exit(3)
    }
    try {
      const recordData = JSON.parse(payload!)
      const body = { data: [{ id, ...recordData }] }
      if (dryRun) {
        this.outputSuccess({ dryRun: true, method: 'PUT', path: `/${module}`, body })
        return
      }
      const { data } = await this.apiClient.put(`/${module}`, body)
      this.outputRecordResult(data.data?.[0] ?? data, { module, action: 'update' })
    } catch (error: any) {
      if (error instanceof SyntaxError) {
        this.outputError('INVALID_JSON', 'Invalid JSON in --json/--data flag')
        this.exit(3)
      }
      this.handleApiError(error)
    }
  }

  protected async runRecordDelete(module: string, id: string, dryRun: boolean): Promise<void> {
    try {
      if (dryRun) {
        this.outputSuccess({ dryRun: true, method: 'DELETE', path: `/${module}?ids=${id}` })
        return
      }
      const { data } = await this.apiClient.delete(`/${module}`, { params: { ids: id } })
      this.outputRecordResult(data.data?.[0] ?? data, { module, action: 'delete' })
    } catch (error: any) {
      this.handleApiError(error)
    }
  }

  protected handleApiError(error: any): void {
    // Re-throw oclif exit signals to avoid double-output
    if (error.oclif?.exit !== undefined) throw error
    if (error.response?.data) {
      const zohoError = error.response.data
      this.outputError(
        zohoError.code ?? 'API_ERROR',
        zohoError.message ?? error.message,
        zohoError.code,
        zohoError.details,
      )
    } else {
      this.outputError('REQUEST_FAILED', error.message)
    }
    this.exit(1)
  }
}
