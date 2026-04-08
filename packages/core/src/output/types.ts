export interface SuccessMeta {
  module?: string
  action?: string
  page?: number
  perPage?: number
  hasMore?: boolean
  count?: number
}

export interface SuccessEnvelope<T = unknown> {
  success: true
  data: T
  meta?: SuccessMeta
}

export interface ErrorInfo {
  code: string
  message: string
  zohoErrorCode?: string
  details?: unknown
}

export interface ErrorEnvelope {
  success: false
  error: ErrorInfo
}

export type OutputEnvelope<T = unknown> = SuccessEnvelope<T> | ErrorEnvelope
