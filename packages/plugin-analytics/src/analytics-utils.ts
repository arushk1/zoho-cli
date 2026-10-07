/**
 * Pure helpers for the Zoho Analytics REST API v2 (no I/O), kept separate from the
 * base command so they can be unit-tested directly.
 * API reference: docs/research/zoho-analytics-api.md
 */

/** Error raised for a `{ status: "failure", summary, data: { errorCode, errorMessage } }` envelope. */
export class AnalyticsApiError extends Error {
  constructor(
    public readonly code: string,
    message: string,
    public readonly zohoErrorCode?: string,
  ) {
    super(message)
    this.name = 'AnalyticsApiError'
  }
}

/**
 * Analytics takes every operation parameter as one URL-encoded JSON value named `CONFIG`.
 * Returns undefined when there is nothing to send so the query string stays clean.
 */
export function configParams(config?: Record<string, unknown>): Record<string, string> | undefined {
  if (!config) return undefined
  const defined = Object.fromEntries(Object.entries(config).filter(([, v]) => v !== undefined))
  if (Object.keys(defined).length === 0) return undefined
  return { CONFIG: JSON.stringify(defined) }
}

/** Decode a response body that may arrive as a Buffer/ArrayBuffer (raw downloads) or string. */
export function decodeBody(body: unknown): unknown {
  let text: string | undefined
  if (Buffer.isBuffer(body)) text = body.toString('utf8')
  else if (body instanceof ArrayBuffer) text = Buffer.from(body).toString('utf8')
  else if (typeof body === 'string') text = body
  if (text === undefined) return body
  try {
    return JSON.parse(text)
  } catch {
    return text
  }
}

/** Build an AnalyticsApiError from a failure envelope, or return undefined if the body isn't one. */
export function toAnalyticsError(body: unknown): AnalyticsApiError | undefined {
  const decoded = decodeBody(body) as any
  if (!decoded || typeof decoded !== 'object' || decoded.status !== 'failure') return undefined
  const errorCode = decoded.data?.errorCode
  return new AnalyticsApiError(
    String(decoded.summary ?? 'API_ERROR'),
    decoded.data?.errorMessage ?? decoded.summary ?? 'Zoho Analytics request failed',
    errorCode !== undefined ? String(errorCode) : undefined,
  )
}

/**
 * Unwrap `{ status: "success", summary, data }`. Several writes (delete workspace, rename/delete
 * view, datasource sync) answer 204 with an empty body, which unwraps to `{}`.
 */
export function unwrapEnvelope<R = any>(body: unknown): R {
  if (body === undefined || body === null || body === '') return {} as R
  const error = toAnalyticsError(body)
  if (error) throw error
  const obj = body as any
  if (obj && typeof obj === 'object' && obj.status === 'success') return (obj.data ?? {}) as R
  return body as R
}

/** Export job states, keyed by the string `jobCode` Zoho returns. */
export const JOB_CODES = {
  NOT_INITIATED: '1001',
  IN_PROGRESS: '1002',
  ERROR: '1003',
  COMPLETED: '1004',
  NOT_FOUND: '1005',
} as const

export type JobPhase = 'pending' | 'completed' | 'failed'

export function jobPhase(jobCode: unknown): JobPhase {
  const code = String(jobCode)
  if (code === JOB_CODES.COMPLETED) return 'completed'
  if (code === JOB_CODES.NOT_INITIATED || code === JOB_CODES.IN_PROGRESS) return 'pending'
  return 'failed'
}

export const EXPORT_FORMATS = ['json', 'csv', 'xml', 'html', 'xls', 'pdf', 'image'] as const
export type ExportFormat = (typeof EXPORT_FORMATS)[number]

/** Formats that can be embedded in the JSON envelope; the rest are binary and need --output. */
export const TEXT_FORMATS: readonly ExportFormat[] = ['json', 'csv', 'xml', 'html']

/**
 * Turn a raw export body into something the JSON envelope can carry. JSON exports are parsed;
 * Zoho does not document the JSON export shape, so a lone `{ data: [...] }` wrapper is unwrapped
 * and anything else passes through. Other text formats are returned as a string.
 */
export function parseExportBody(body: Buffer, format: ExportFormat): unknown {
  const text = body.toString('utf8')
  if (format !== 'json') return text
  const parsed = JSON.parse(text)
  if (parsed && typeof parsed === 'object' && !Array.isArray(parsed)) {
    const keys = Object.keys(parsed)
    if (keys.length === 1 && keys[0] === 'data' && Array.isArray(parsed.data)) return parsed.data
  }
  return parsed
}

/** Request-side `viewTypes` codes for GET /workspaces/{id}/views (code 5 is undocumented). */
export const VIEW_TYPE_CODES: Record<string, number> = {
  table: 0,
  tabular: 1,
  chart: 2,
  pivot: 3,
  summary: 4,
  'query-table': 6,
  dashboard: 7,
}

/** Split a comma-separated flag value into trimmed, non-empty items. */
export function splitList(value: string | undefined): string[] | undefined {
  if (!value) return undefined
  const items = value.split(',').map((s) => s.trim()).filter(Boolean)
  return items.length > 0 ? items : undefined
}

/** Flatten `{ owned..., shared... }` list responses into one array tagged with `access`. */
export function flattenOwnedShared(owned: unknown[] | undefined, shared: unknown[] | undefined): Array<Record<string, unknown>> {
  return [
    ...(owned ?? []).map((item) => ({ ...(item as object), access: 'owned' })),
    ...(shared ?? []).map((item) => ({ ...(item as object), access: 'shared' })),
  ]
}
