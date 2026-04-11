import { writeFile } from 'node:fs/promises'

import { Command, Flags, Interfaces } from '@oclif/core'
import {
  resolveConfig, loadTokens, saveTokens, refreshAccessToken,
  formatOutput, formatError, formatSuccess, ZohoApiClient, DESK_REGION_DOMAINS,
  type ZohoConfig, type SuccessMeta,
} from '@zoho-cli/core'

export type DeskBaseFlags<T extends typeof Command> = Interfaces.InferredFlags<typeof DeskBaseCommand['baseFlags'] & T['flags']>
export type DeskBaseArgs<T extends typeof Command> = Interfaces.InferredArgs<T['args']>

export abstract class DeskBaseCommand<T extends typeof Command> extends Command {
  static baseFlags = {
    pretty: Flags.boolean({ description: 'Pretty-print JSON output', default: false, helpGroup: 'GLOBAL' }),
    org: Flags.string({ description: 'Zoho Desk organization ID (overrides config)', helpGroup: 'GLOBAL', env: 'ZOHO_DESK_ORG_ID' }),
  }

  protected flags!: DeskBaseFlags<T>
  protected args!: DeskBaseArgs<T>
  protected zohoConfig!: ZohoConfig

  private _apiClient?: ZohoApiClient
  private _resolvedOrgId?: string

  public async init(): Promise<void> {
    await super.init()
    const { args, flags } = await this.parse({
      flags: this.ctor.flags,
      baseFlags: (super.ctor as typeof DeskBaseCommand).baseFlags,
      args: this.ctor.args,
      strict: this.ctor.strict,
    })
    this.flags = flags as DeskBaseFlags<T>
    this.args = args as DeskBaseArgs<T>
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
      process.stderr.write('[zoho-cli] Auto-detecting Desk organization ID...\n')
      const { data } = await this.apiClient.get<{ data: Array<{ id: string; organizationName: string }> }>('/organizations')
      const orgs = data.data
      if (!orgs || orgs.length === 0) {
        this.outputError('NO_ORGS', 'No Zoho Desk organizations found')
        this.exit(3)
      }

      const org = orgs[0]
      process.stderr.write(`[zoho-cli] Using organization "${org.organizationName}" (${org.id})\n`)
      this._resolvedOrgId = org.id
      return org.id
    } catch (error: any) {
      if (error.oclif?.exit !== undefined) throw error
      this.outputError(
        'ORG_DETECTION_FAILED',
        `Failed to auto-detect organization: ${error.message}. Set manually via --org flag or "zoho config set defaultOrg <id>"`,
      )
      this.exit(3)
    }
  }

  protected get apiClient(): ZohoApiClient {
    if (!this._apiClient) {
      const domain = DESK_REGION_DOMAINS[this.zohoConfig.region]
      this._apiClient = new ZohoApiClient({
        region: this.zohoConfig.region,
        app: 'desk',
        version: 'v1',
        baseUrl: `https://${domain}/api/v1`,
        getTokens: () => loadTokens(),
        onTokenRefresh: async (accessToken, expiresAt) => {
          const existing = await loadTokens()
          if (existing) await saveTokens(undefined, { ...existing, accessToken, expiresAt })
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
    return { orgId }
  }

  protected async deskGet<R = any>(path: string, params?: Record<string, string>): Promise<R> {
    const headers = await this.orgHeaders()
    const { data } = await this.apiClient.get<R>(path, { params, headers })
    return data
  }

  protected async deskPost<R = any>(path: string, body?: unknown, params?: Record<string, string>): Promise<R> {
    const headers = await this.orgHeaders()
    const { data } = await this.apiClient.post<R>(path, body, { params, headers })
    return data
  }

  protected async deskPatch<R = any>(path: string, body?: unknown, params?: Record<string, string>): Promise<R> {
    const headers = await this.orgHeaders()
    const { data } = await this.apiClient.patch<R>(path, body, { params, headers })
    return data
  }

  protected async deskDelete<R = any>(path: string, params?: Record<string, string>): Promise<R> {
    const headers = await this.orgHeaders()
    const { data } = await this.apiClient.delete<R>(path, { params, headers })
    return data
  }

  protected async deskUpload<R = any>(
    path: string,
    form: { getHeaders(): Record<string, string> },
    params?: Record<string, string>,
  ): Promise<R> {
    const orgHeaders = await this.orgHeaders()
    const headers = { ...orgHeaders, ...form.getHeaders() }
    const { data } = await this.apiClient.post<R>(path, form, { params, headers })
    return data
  }

  protected async deskDownload(path: string, outputPath: string): Promise<void> {
    const headers = await this.orgHeaders()
    const { data } = await this.apiClient.get<ArrayBuffer>(path, {
      headers,
      responseType: 'arraybuffer',
    })
    await writeFile(outputPath, Buffer.from(data))
  }

  static paginationParams(flags: { page: number; 'per-page': number }): { from: string; limit: string } {
    const perPage = flags['per-page']
    const from = (flags.page - 1) * perPage + 1
    return { from: String(from), limit: String(perPage) }
  }

  protected outputSuccess(data: unknown, meta?: SuccessMeta): void {
    this.log(formatOutput(formatSuccess(data, meta), (this.flags as any).pretty))
  }

  protected outputError(code: string, message: string, zohoErrorCode?: string, details?: unknown): void {
    this.log(formatOutput(formatError({ code, message, zohoErrorCode, details }), (this.flags as any).pretty))
  }

  protected handleApiError(error: any): never {
    if (error.oclif?.exit !== undefined) throw error
    if (error.response?.data) {
      const respData = error.response.data
      this.outputError(
        String(respData.errorCode ?? 'API_ERROR'),
        respData.message ?? error.message,
        String(respData.errorCode ?? ''),
      )
    } else {
      this.outputError('REQUEST_FAILED', error.message)
    }

    this.exit(1)
  }
}
