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
  PEOPLE_REGION_DOMAINS,
  type ZohoConfig,
  type SuccessMeta,
} from '@zoho-cli/core'

export type PeopleBaseFlags<T extends typeof Command> = Interfaces.InferredFlags<typeof PeopleBaseCommand['baseFlags'] & T['flags']>
export type PeopleBaseArgs<T extends typeof Command> = Interfaces.InferredArgs<T['args']>

export abstract class PeopleBaseCommand<T extends typeof Command> extends Command {
  static baseFlags = {
    pretty: Flags.boolean({
      description: 'Pretty-print JSON output',
      default: false,
      helpGroup: 'GLOBAL',
    }),
  }

  protected flags!: PeopleBaseFlags<T>
  protected args!: PeopleBaseArgs<T>
  protected zohoConfig!: ZohoConfig
  private _apiClient?: ZohoApiClient

  public async init(): Promise<void> {
    await super.init()
    const { args, flags } = await this.parse({
      flags: this.ctor.flags,
      baseFlags: (super.ctor as typeof PeopleBaseCommand).baseFlags,
      args: this.ctor.args,
      strict: this.ctor.strict,
    })
    this.flags = flags as PeopleBaseFlags<T>
    this.args = args as PeopleBaseArgs<T>
    this.zohoConfig = await resolveConfig(undefined, process.env as Record<string, string>)
  }

  protected get apiClient(): ZohoApiClient {
    if (!this._apiClient) {
      const domain = PEOPLE_REGION_DOMAINS[this.zohoConfig.region]
      this._apiClient = new ZohoApiClient({
        region: this.zohoConfig.region,
        app: 'people',
        version: 'api',
        baseUrl: `https://${domain}`,
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

  // --- Form CRUD helpers ---

  protected async formInsert(form: string, data: Record<string, unknown>): Promise<any> {
    const params = new URLSearchParams()
    params.append('inputData', JSON.stringify(data))
    const { data: resp } = await this.apiClient.post(
      `/people/api/forms/json/${form}/insertRecord`,
      params.toString(),
      { headers: { 'Content-Type': 'application/x-www-form-urlencoded' } },
    )
    return this.extractResult(resp)
  }

  protected async formUpdate(form: string, recordId: string, data: Record<string, unknown>): Promise<any> {
    const params = new URLSearchParams()
    params.append('inputData', JSON.stringify(data))
    params.append('recordId', recordId)
    const { data: resp } = await this.apiClient.post(
      `/people/api/forms/json/${form}/updateRecord`,
      params.toString(),
      { headers: { 'Content-Type': 'application/x-www-form-urlencoded' } },
    )
    return this.extractResult(resp)
  }

  protected async formGetById(form: string, recordId: string): Promise<any> {
    const { data: resp } = await this.apiClient.get(`/people/api/forms/${form}/getDataByID`, {
      params: { recordId },
    })
    return this.extractResult(resp)
  }

  protected async formSearch(form: string, searchParams: object[], options?: { sIndex?: number; limit?: number }): Promise<any> {
    const params: Record<string, string> = {
      sIndex: String(options?.sIndex ?? 1),
      limit: String(options?.limit ?? 200),
    }
    // Only send searchParams when non-empty; empty array means "list all"
    if (searchParams.length > 0) {
      params.searchParams = searchParams.map((p) => JSON.stringify(p)).join('|')
    }
    const { data: resp } = await this.apiClient.get(`/people/api/forms/${form}/getRecords`, { params })
    return this.extractResult(resp)
  }

  protected async formFetchByView(viewName: string, options?: { sIndex?: number; recLimit?: number }): Promise<any> {
    const { data: resp } = await this.apiClient.get(`/api/forms/${viewName}/records`, {
      params: {
        sIndex: String(options?.sIndex ?? 1),
        rec_limit: String(options?.recLimit ?? 200),
      },
    })
    return this.extractResult(resp)
  }

  protected async timetrackerRequest(path: string, params: Record<string, string>): Promise<any> {
    const { data: resp } = await this.apiClient.get(`/people/api/timetracker/${path}`, { params })
    return this.extractResult(resp)
  }

  // --- Response normalization ---

  /**
   * Extract the result from a Zoho People API response envelope.
   * Zoho People APIs wrap responses in {"response": {"result": ..., "status": 0|1}}.
   * status=0 means success, status=1 means error.
   * Throws a structured ZohoApiError when the response indicates failure.
   */
  protected extractResult(data: any): any {
    // Check for error response (status === 1) before extracting result
    if (data?.response?.status === 1) {
      const errors = data.response.errors
      const errCode = errors?.code ?? 'API_ERROR'
      const errMessage = errors?.message ?? data.response.message ?? 'Error occurred'
      const err: any = new Error(errMessage)
      err.isPeopleApiError = true
      err.code = String(errCode)
      err.zohoErrorCode = String(errCode)
      throw err
    }
    // Some endpoints return HTTP 200 with top-level {"error": "..."} on failure
    if (typeof data?.error === 'string' && Object.keys(data).length === 1) {
      const err: any = new Error(data.error)
      err.isPeopleApiError = true
      err.code = 'API_ERROR'
      err.zohoErrorCode = 'API_ERROR'
      throw err
    }
    if (data?.response?.result !== undefined) {
      return data.response.result
    }
    if (data?.response?.status === 0) {
      return data.response
    }
    return data
  }

  // --- Output helpers ---

  protected outputSuccess(data: unknown, meta?: SuccessMeta): void {
    const envelope = formatSuccess(data, meta)
    this.log(formatOutput(envelope, (this.flags as any).pretty))
  }

  protected outputError(code: string, message: string, zohoErrorCode?: string, details?: unknown): void {
    const envelope = formatError({ code, message, zohoErrorCode, details })
    this.log(formatOutput(envelope, (this.flags as any).pretty))
  }

  protected handleApiError(error: any): never {
    // Handle errors thrown by extractResult (Zoho People API error envelope)
    if (error.isPeopleApiError) {
      this.outputError(error.code ?? 'API_ERROR', error.message, error.zohoErrorCode)
      this.exit(1)
    }

    if (error.response?.data) {
      const respData = error.response.data
      // Pattern 1: {"response": {"errors": {"code": X, "message": Y}, "status": 1}}
      // errors is an object (not array) — standard People API format
      if (respData.response?.errors) {
        const zohoErr = respData.response.errors
        this.outputError(
          String(zohoErr.code ?? 'API_ERROR'),
          zohoErr.message ?? respData.response.message ?? error.message,
          String(zohoErr.code ?? ''),
        )
      } else if (respData.response?.message) {
        this.outputError('API_ERROR', respData.response.message)
      // Pattern 2: top-level {"errors": {"code": X, "message": Y}, "status": 0/1}
      // Used by Timetracker and some other endpoints
      } else if (respData.errors && typeof respData.errors === 'object') {
        const zohoErr = respData.errors
        this.outputError(
          String(zohoErr.code ?? 'API_ERROR'),
          zohoErr.message ?? respData.message ?? error.message,
          String(zohoErr.code ?? ''),
        )
      } else {
        const zohoError = respData.error ?? respData
        this.outputError(
          String(zohoError.code ?? 'API_ERROR'),
          zohoError.message ?? error.message,
          String(zohoError.code ?? ''),
          zohoError.details,
        )
      }
    } else {
      this.outputError('REQUEST_FAILED', error.message)
    }
    this.exit(1)
  }
}
