import type { SuccessMeta, SuccessEnvelope, ErrorEnvelope, ErrorInfo, OutputEnvelope } from './types.js'

export function formatSuccess<T>(data: T, meta?: SuccessMeta): SuccessEnvelope<T> {
  const envelope: SuccessEnvelope<T> = { success: true, data }
  if (meta) {
    envelope.meta = meta
  }
  return envelope
}

export function formatError(error: ErrorInfo): ErrorEnvelope {
  return { success: false, error }
}

export function formatOutput(envelope: OutputEnvelope, pretty = false): string {
  return JSON.stringify(envelope, null, pretty ? 2 : undefined)
}

/**
 * Zoho write APIs answer HTTP 200 even when they reject a record. The per-record
 * verdict is carried in the body:
 *
 *   { "data": [ { "code": "INVALID_DATA", "status": "error", "message": "invalid data",
 *                 "details": { "api_name": "Email" } } ] }
 *
 * Because the transport status is 200, axios never throws and the failure is
 * invisible unless the body is inspected. Write results MUST be run through this
 * check before reporting success.
 *
 * Both `code` and `status` are required: a CRM record may legitimately carry a
 * custom field named `status`, so status alone is not enough to call it an error.
 */
export function isZohoRecordError(record: unknown): boolean {
  if (!record || typeof record !== 'object' || Array.isArray(record)) return false
  const { code, status } = record as { code?: unknown; status?: unknown }
  return typeof code === 'string' && typeof status === 'string' && status.toLowerCase() === 'error'
}

/**
 * Collects every rejected record from a write response. Accepts a single record or
 * the array returned by bulk/mass operations, where some records can fail while
 * others succeed. Returns an empty array when nothing was rejected.
 */
export function collectZohoRecordErrors(payload: unknown): unknown[] {
  if (Array.isArray(payload)) return payload.filter(isZohoRecordError)
  return isZohoRecordError(payload) ? [payload] : []
}

export function mapZohoError(zohoResponse: any): ErrorInfo {
  if (zohoResponse?.code) {
    return {
      code: zohoResponse.code,
      message: zohoResponse.message ?? 'Unknown error',
      zohoErrorCode: zohoResponse.code,
      details: zohoResponse.details ?? undefined,
    }
  }
  return {
    code: 'UNKNOWN_ERROR',
    message: typeof zohoResponse === 'string' ? zohoResponse : 'An unknown error occurred',
  }
}
