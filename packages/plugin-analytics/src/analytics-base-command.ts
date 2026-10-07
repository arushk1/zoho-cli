import { Command, Flags, Interfaces } from '@oclif/core'
import { writeFile } from 'node:fs/promises'
import {
  resolveConfig,
  loadTokens,
  saveTokens,
  refreshAccessToken,
  formatOutput,
  formatError,
  formatSuccess,
  ZohoApiClient,
  ANALYTICS_REGION_DOMAINS,
  type ZohoConfig,
  type SuccessMeta,
} from '@zoho-cli/core'
import {
  AnalyticsApiError,
  TEXT_FORMATS,
  configParams,
  decodeBody,
  jobPhase,
  parseExportBody,
  toAnalyticsError,
  unwrapEnvelope,
  type ExportFormat,
} from './analytics-utils.js'

export type AnalyticsBaseFlags<T extends typeof Command> = Interfaces.InferredFlags<typeof AnalyticsBaseCommand['baseFlags'] & T['flags']>
export type AnalyticsBaseArgs<T extends typeof Command> = Interfaces.InferredArgs<T['args']>

const ORG_HEADER = 'ZANALYTICS-ORGID'

export interface AnalyticsRequestOptions {
  /** Send the ZANALYTICS-ORGID header (default true). /orgs, /dashboards and /recentviews take none. */
  org?: boolean
}

export interface ExportJobWaitOptions {
  intervalMs: number
  timeoutMs: number
}

export abstract class AnalyticsBaseCommand<T extends typeof Command> extends Command {
  static baseFlags = {
    pretty: Flags.boolean({
      description: 'Pretty-print JSON output',
      default: false,
      helpGroup: 'GLOBAL',
    }),
    org: Flags.string({
      description: 'Zoho Analytics organization ID (overrides config)',
      helpGroup: 'GLOBAL',
      env: 'ZOHO_ANALYTICS_ORG_ID',
    }),
  }

  protected flags!: AnalyticsBaseFlags<T>
  protected args!: AnalyticsBaseArgs<T>
  protected zohoConfig!: ZohoConfig
  private _apiClient?: ZohoApiClient
  private _resolvedOrgId?: string

  public async init(): Promise<void> {
    await super.init()
    const { args, flags } = await this.parse({
      flags: this.ctor.flags,
      baseFlags: (super.ctor as typeof AnalyticsBaseCommand).baseFlags,
      args: this.ctor.args,
      strict: this.ctor.strict,
    })
    this.flags = flags as AnalyticsBaseFlags<T>
    this.args = args as AnalyticsBaseArgs<T>
    this.zohoConfig = await resolveConfig(undefined, process.env as Record<string, string>)
  }

  protected async resolveOrgId(): Promise<string> {
    if (this._resolvedOrgId) return this._resolvedOrgId

    const flagOrg = (this.flags as any).org
    if (flagOrg) {
      this._resolvedOrgId = flagOrg
      return flagOrg
    }

    if (this.zohoConfig.defaultAnalyticsOrg) {
      this._resolvedOrgId = this.zohoConfig.defaultAnalyticsOrg
      return this.zohoConfig.defaultAnalyticsOrg
    }

    try {
      process.stderr.write('[zoho-cli] Auto-detecting Analytics organization ID...\n')
      const { orgs } = await this.analyticsGet<{ orgs?: Array<{ orgId: string; orgName: string; isDefault: boolean }> }>(
        '/orgs', undefined, { org: false },
      )
      if (!orgs || orgs.length === 0) {
        this.outputError('NO_ORGS', 'No Zoho Analytics organizations found for this account')
        this.exit(3)
      }

      const org = orgs.find((o) => o.isDefault) ?? orgs[0]
      process.stderr.write(`[zoho-cli] Using organization "${org.orgName}" (${org.orgId})\n`)
      this._resolvedOrgId = org.orgId
      return org.orgId
    } catch (error: any) {
      if (error.oclif?.exit !== undefined) throw error
      this.outputError('ORG_DETECTION_FAILED', `Failed to auto-detect organization: ${error.message}. Set manually via --org flag or "zoho config set defaultAnalyticsOrg <id>"`)
      this.exit(3)
    }
  }

  protected get apiClient(): ZohoApiClient {
    if (!this._apiClient) {
      const host = ANALYTICS_REGION_DOMAINS[this.zohoConfig.region]
      this._apiClient = new ZohoApiClient({
        region: this.zohoConfig.region,
        app: 'analytics',
        version: 'v2',
        baseUrl: `https://${host}/restapi/v2`,
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

  private async headers(options?: AnalyticsRequestOptions): Promise<Record<string, string>> {
    if (options?.org === false) return {}
    return { [ORG_HEADER]: await this.resolveOrgId() }
  }

  /** Run a request, converting failure envelopes (incl. binary-encoded ones) into AnalyticsApiError. */
  private async call<R>(fn: () => Promise<{ data: R }>): Promise<R> {
    try {
      const { data } = await fn()
      return data
    } catch (error: any) {
      const apiError = error.response?.data !== undefined ? toAnalyticsError(error.response.data) : undefined
      if (apiError) throw apiError
      throw error
    }
  }

  protected async analyticsGet<R = any>(path: string, config?: Record<string, unknown>, options?: AnalyticsRequestOptions): Promise<R> {
    const headers = await this.headers(options)
    return unwrapEnvelope<R>(await this.call(() => this.apiClient.get(path, { params: configParams(config), headers })))
  }

  // POST/PUT carry parameters in the CONFIG query param, not a body. Pass `null` as the body:
  // ZohoApiClient treats an `undefined` body as "no body arg" and would send the axios config as data.
  protected async analyticsPost<R = any>(path: string, config?: Record<string, unknown>): Promise<R> {
    const headers = await this.headers()
    return unwrapEnvelope<R>(await this.call(() => this.apiClient.post(path, null, { params: configParams(config), headers })))
  }

  protected async analyticsPut<R = any>(path: string, config?: Record<string, unknown>): Promise<R> {
    const headers = await this.headers()
    return unwrapEnvelope<R>(await this.call(() => this.apiClient.put(path, null, { params: configParams(config), headers })))
  }

  protected async analyticsDelete<R = any>(path: string, config?: Record<string, unknown>): Promise<R> {
    const headers = await this.headers()
    return unwrapEnvelope<R>(await this.call(() => this.apiClient.delete(path, { params: configParams(config), headers })))
  }

  /** Multipart import: FILE goes in the body, CONFIG in the query string (as in Zoho's curl samples). */
  protected async analyticsUpload<R = any>(
    path: string,
    form: { getHeaders(): Record<string, string> },
    config?: Record<string, unknown>,
  ): Promise<R> {
    const headers = { ...(await this.headers()), ...form.getHeaders() }
    return unwrapEnvelope<R>(await this.call(() => this.apiClient.post(path, form, { params: configParams(config), headers, maxBodyLength: Infinity })))
  }

  /** Fetch a raw export body (CSV/JSON/PDF/...). Exports bypass the JSON envelope on success. */
  protected async analyticsDownload(path: string, config?: Record<string, unknown>): Promise<Buffer> {
    const headers = await this.headers()
    const data = await this.call(() => this.apiClient.get<ArrayBuffer>(path, { params: configParams(config), headers, responseType: 'arraybuffer' }))
    const body = Buffer.from(data)
    // A 200 can still carry a failure envelope; surface it instead of writing it out as data.
    const apiError = toAnalyticsError(body)
    if (apiError) throw apiError
    return body
  }

  protected async sleep(ms: number): Promise<void> {
    await new Promise((resolve) => setTimeout(resolve, ms))
  }

  /** Poll an async export job until it completes, fails, or times out. Status checks cost 0 API units. */
  protected async waitForExportJob(workspaceId: string, jobId: string, options: ExportJobWaitOptions): Promise<any> {
    const deadline = Date.now() + options.timeoutMs
    for (;;) {
      const job = await this.analyticsGet(`/bulk/workspaces/${workspaceId}/exportjobs/${jobId}`)
      const phase = jobPhase(job.jobCode)
      if (phase === 'completed') return job
      if (phase === 'failed') {
        throw new AnalyticsApiError('EXPORT_JOB_FAILED', `Export job ${jobId} ended with "${job.jobStatus ?? job.jobCode}"`, String(job.jobCode))
      }
      if (Date.now() >= deadline) {
        this.outputError(
          'JOB_TIMEOUT',
          `Export job ${jobId} still running after ${Math.round(options.timeoutMs / 1000)}s. Check it with "zoho analytics export-jobs get ${jobId} -w ${workspaceId}"`,
          undefined,
          { jobId, workspaceId, jobStatus: job.jobStatus },
        )
        this.exit(1)
      }
      await this.sleep(options.intervalMs)
    }
  }

  /**
   * Emit an export body: write it to `outputPath` when given, otherwise embed text formats in the
   * envelope (JSON parsed). Binary formats without an output path are a usage error.
   */
  protected async emitExport(body: Buffer, format: ExportFormat, outputPath: string | undefined, meta: SuccessMeta): Promise<void> {
    if (outputPath) {
      await writeFile(outputPath, body)
      this.outputSuccess({ file: outputPath, bytes: body.length, format }, meta)
      return
    }
    if (!TEXT_FORMATS.includes(format)) {
      this.outputError('OUTPUT_REQUIRED', `--output is required for binary format "${format}"`)
      this.exit(3)
    }
    const parsed = parseExportBody(body, format)
    if (format === 'json') {
      this.outputSuccess(parsed, { ...meta, count: Array.isArray(parsed) ? parsed.length : undefined })
    } else {
      this.outputSuccess({ format, content: parsed }, meta)
    }
  }

  /** Parse a JSON flag value, exiting with INVALID_JSON (exit 3) on bad input. */
  protected parseJsonFlag<R = any>(value: string, flagName: string): R {
    try {
      return JSON.parse(value) as R
    } catch {
      this.outputError('INVALID_JSON', `Invalid JSON in --${flagName} flag`)
      this.exit(3)
    }
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
    // Re-throw oclif exit signals to avoid double-output
    if (error.oclif?.exit !== undefined) throw error
    if (error instanceof AnalyticsApiError) {
      this.outputError(error.code, error.message, error.zohoErrorCode)
    } else if (error.response?.data) {
      const body = decodeBody(error.response.data)
      this.outputError('API_ERROR', typeof body === 'string' && body ? body : error.message)
    } else {
      this.outputError('REQUEST_FAILED', error.message)
    }
    this.exit(1)
  }
}
