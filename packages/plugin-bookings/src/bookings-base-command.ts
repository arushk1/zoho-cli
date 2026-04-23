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
import { extractBookingsResult, BookingsApiError } from './envelope.js'
import { serializeBookingsForm } from './form-encode.js'

export type BookingsBaseFlags<T extends typeof Command> = Interfaces.InferredFlags<
  typeof BookingsBaseCommand['baseFlags'] & T['flags']
>
export type BookingsBaseArgs<T extends typeof Command> = Interfaces.InferredArgs<T['args']>

export abstract class BookingsBaseCommand<T extends typeof Command> extends Command {
  static readonly SCOPE = 'zohobookings.data.CREATE'

  static baseFlags = {
    pretty: Flags.boolean({
      description: 'Pretty-print JSON output',
      default: false,
      helpGroup: 'GLOBAL',
    }),
    workspace: Flags.string({
      description: 'Zoho Bookings workspace ID (overrides config)',
      helpGroup: 'GLOBAL',
      env: 'ZOHO_BOOKINGS_WORKSPACE_ID',
    }),
  }

  protected flags!: BookingsBaseFlags<T>
  protected args!: BookingsBaseArgs<T>
  protected zohoConfig!: ZohoConfig

  private _apiClient?: ZohoApiClient
  private _resolvedWorkspaceId?: string

  public async init(): Promise<void> {
    await super.init()
    const { args, flags } = await this.parse({
      flags: this.ctor.flags,
      baseFlags: (super.ctor as typeof BookingsBaseCommand).baseFlags,
      args: this.ctor.args,
      strict: this.ctor.strict,
    })
    this.flags = flags as BookingsBaseFlags<T>
    this.args = args as BookingsBaseArgs<T>
    this.zohoConfig = await resolveConfig(undefined, process.env as Record<string, string>)
  }

  protected get apiClient(): ZohoApiClient {
    if (!this._apiClient) {
      this._apiClient = new ZohoApiClient({
        region: this.zohoConfig.region,
        app: 'bookings',
        version: 'v1',
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

  protected async bookingsGet<R = any>(
    action: string,
    params?: Record<string, string | undefined>,
  ): Promise<R> {
    const cleanParams: Record<string, string> = {}
    if (params) {
      for (const [k, v] of Object.entries(params)) {
        if (typeof v === 'string') cleanParams[k] = v
      }
    }
    const { data } = await this.apiClient.get(`/json/${action}`, { params: cleanParams })
    return extractBookingsResult(data) as R
  }

  protected async bookingsPostForm<R = any>(
    action: string,
    fields: Record<string, unknown>,
  ): Promise<R> {
    const body = serializeBookingsForm(fields).toString()
    const { data } = await this.apiClient.post(`/json/${action}`, body, {
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    })
    return extractBookingsResult(data) as R
  }

  protected async resolveWorkspaceId(): Promise<string> {
    if (this._resolvedWorkspaceId) return this._resolvedWorkspaceId

    const flagValue = (this.flags as any).workspace
    if (typeof flagValue === 'string' && flagValue.length > 0) {
      this._resolvedWorkspaceId = flagValue
      return flagValue
    }

    const configValue = this.zohoConfig?.defaultBookingsWorkspace
    if (typeof configValue === 'string' && configValue.length > 0) {
      this._resolvedWorkspaceId = configValue
      return configValue
    }

    try {
      process.stderr.write('[zoho-cli] Auto-detecting Bookings workspace...\n')
      const result = await this.bookingsGet<any>('workspaces')
      const list: Array<{ id: string; name?: string }> = Array.isArray(result)
        ? result
        : Array.isArray(result?.data)
          ? result.data
          : []
      if (list.length === 0) {
        this.outputError('NO_WORKSPACES', 'No Zoho Bookings workspaces found for this user. Set one with --workspace or `zoho config set defaultBookingsWorkspace <id>`.')
        this.exit(3)
      }
      const chosen = list[0]
      process.stderr.write(`[zoho-cli] Using Bookings workspace "${chosen.name ?? '?'}" (${chosen.id})\n`)
      this._resolvedWorkspaceId = chosen.id
      return chosen.id
    } catch (error: any) {
      if (error?.oclif?.exit !== undefined || error?.oclifExit !== undefined) throw error
      this.outputError(
        'WORKSPACE_DETECTION_FAILED',
        `Failed to auto-detect Bookings workspace: ${error.message ?? error}. Set manually via --workspace or "zoho config set defaultBookingsWorkspace <id>".`,
      )
      this.exit(3)
    }
  }

  protected outputSuccess(data: unknown, meta?: SuccessMeta): void {
    this.log(formatOutput(formatSuccess(data, meta), (this.flags as any).pretty))
  }

  protected outputError(code: string, message: string, zohoErrorCode?: string, details?: unknown): void {
    this.log(formatOutput(formatError({ code, message, zohoErrorCode, details }), (this.flags as any).pretty))
  }

  protected handleApiError(error: any): never {
    if (error?.oclif?.exit !== undefined) throw error

    if (error?.isBookingsApiError) {
      const e = error as BookingsApiError
      this.outputError(e.code, e.message, e.zohoErrorCode)
      this.exit(1)
    }

    const respData = error?.response?.data
    if (respData) {
      const logs = Array.isArray(respData?.response?.logMessage)
        ? respData.response.logMessage.filter((m: unknown) => typeof m === 'string')
        : []
      const joined = logs.length > 0 ? logs.join('; ') : respData?.response?.returnvalue?.message
      if (joined) {
        this.outputError('API_ERROR', joined)
      } else if (typeof respData === 'string' && respData.length > 0) {
        this.outputError('API_ERROR', respData)
      } else {
        this.outputError('API_ERROR', error.message ?? 'Zoho Bookings API error')
      }
    } else {
      this.outputError('REQUEST_FAILED', error?.message ?? 'Request failed')
    }
    this.exit(1)
  }
}
