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
  PROJECTS_REGION_DOMAINS,
  type ZohoConfig,
  type SuccessMeta,
} from '@zoho-cli/core'
import { join } from 'node:path'
import { homedir } from 'node:os'
import { PortalCache } from './portal-cache.js'

export type ProjectsBaseFlags<T extends typeof Command> = Interfaces.InferredFlags<typeof ProjectsBaseCommand['baseFlags'] & T['flags']>
export type ProjectsBaseArgs<T extends typeof Command> = Interfaces.InferredArgs<T['args']>

export abstract class ProjectsBaseCommand<T extends typeof Command> extends Command {
  static baseFlags = {
    pretty: Flags.boolean({
      description: 'Pretty-print JSON output',
      default: false,
      helpGroup: 'GLOBAL',
    }),
    portal: Flags.string({
      description: 'Zoho Projects portal ID (overrides auto-detected portal)',
      helpGroup: 'GLOBAL',
      env: 'ZOHO_PORTAL_ID',
    }),
  }

  protected flags!: ProjectsBaseFlags<T>
  protected args!: ProjectsBaseArgs<T>
  protected zohoConfig!: ZohoConfig
  private _apiClient?: ZohoApiClient
  private _portalCache?: PortalCache
  private _resolvedPortalId?: string

  public async init(): Promise<void> {
    await super.init()
    const { args, flags } = await this.parse({
      flags: this.ctor.flags,
      baseFlags: (super.ctor as typeof ProjectsBaseCommand).baseFlags,
      args: this.ctor.args,
      strict: this.ctor.strict,
    })
    this.flags = flags as ProjectsBaseFlags<T>
    this.args = args as ProjectsBaseArgs<T>
    this.zohoConfig = await resolveConfig(undefined, process.env as Record<string, string>)
  }

  protected get portalCache(): PortalCache {
    if (!this._portalCache) {
      this._portalCache = new PortalCache(join(homedir(), '.zoho-cli', 'cache'))
    }
    return this._portalCache
  }

  protected async resolvePortalId(): Promise<string> {
    if (this._resolvedPortalId) return this._resolvedPortalId

    // 1. Explicit --portal flag
    const flagPortal = (this.flags as any).portal
    if (flagPortal) {
      this._resolvedPortalId = flagPortal
      return flagPortal
    }

    // 2. Config defaultPortal
    if (this.zohoConfig.defaultPortal) {
      this._resolvedPortalId = this.zohoConfig.defaultPortal
      return this.zohoConfig.defaultPortal
    }

    // 3. Cached portal
    const cached = await this.portalCache.get()
    if (cached) {
      this._resolvedPortalId = cached.portalId
      return cached.portalId
    }

    // 4. Auto-detect from API
    try {
      process.stderr.write('[zoho-cli] Auto-detecting portal ID...\n')
      const { data } = await this.apiClient.get<{ portals: Array<{ id: number; id_string: string; name: string }> }>('/portals')
      const portals = data.portals
      if (!portals || portals.length === 0) {
        this.outputError('NO_PORTALS', 'No Zoho Projects portals found for this account')
        this.exit(3)
      }

      const portal = portals[0]
      const portalId = portal.id_string ?? String(portal.id)
      await this.portalCache.set(portalId, portal.name)
      process.stderr.write(`[zoho-cli] Using portal "${portal.name}" (${portalId})\n`)
      this._resolvedPortalId = portalId
      return portalId
    } catch (error: any) {
      this.outputError('PORTAL_DETECTION_FAILED', `Failed to auto-detect portal: ${error.message}. Set manually via --portal flag or "zoho config set defaultPortal <id>"`)
      this.exit(3)
    }
  }

  protected get apiClient(): ZohoApiClient {
    if (!this._apiClient) {
      const domain = PROJECTS_REGION_DOMAINS[this.zohoConfig.region]
      this._apiClient = new ZohoApiClient({
        region: this.zohoConfig.region,
        app: 'projects',
        version: 'v3',
        baseUrl: `https://${domain}/api/v3`,
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

  protected async portalPath(path: string): Promise<string> {
    const id = await this.resolvePortalId()
    return `/portal/${id}${path}`
  }

  protected async projectPath(projectId: string, path: string): Promise<string> {
    const id = await this.resolvePortalId()
    return `/portal/${id}/projects/${projectId}${path}`
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
    if (error.response?.data) {
      const zohoError = error.response.data.error ?? error.response.data
      // V3 API uses title/status_code as the error code and details[] for messages
      const code = zohoError.code ?? zohoError.title ?? 'API_ERROR'
      const message = zohoError.message
        ?? (Array.isArray(zohoError.details) && zohoError.details[0]?.message)
        ?? error.message
      this.outputError(
        String(code),
        String(message),
        String(zohoError.status_code ?? zohoError.code ?? ''),
        zohoError.details,
      )
    } else {
      this.outputError('REQUEST_FAILED', error.message)
    }
    this.exit(1)
  }
}
