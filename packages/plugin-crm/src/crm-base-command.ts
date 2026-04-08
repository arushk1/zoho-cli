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

  protected get apiClient(): ZohoApiClient {
    if (!this._apiClient) {
      this._apiClient = new ZohoApiClient({
        region: this.zohoConfig.region,
        app: 'crm',
        version: (this.flags as any)['api-version'] ?? 'v7',
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
