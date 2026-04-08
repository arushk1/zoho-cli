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
