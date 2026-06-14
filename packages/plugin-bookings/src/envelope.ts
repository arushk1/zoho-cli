export class BookingsApiError extends Error {
  public readonly isBookingsApiError = true
  public readonly code: string
  public readonly zohoErrorCode: string

  constructor(message: string, code: string = 'API_ERROR') {
    super(message)
    this.name = 'BookingsApiError'
    this.code = code
    this.zohoErrorCode = code
  }
}

interface BookingsResponseEnvelope {
  response?: {
    returnvalue?: any
    logMessage?: unknown
    status?: string
  }
}

export function extractBookingsResult(data: unknown): any {
  const envelope = data as BookingsResponseEnvelope
  const resp = envelope?.response
  if (!resp || typeof resp !== 'object') {
    // Some endpoints (notably fetchappointment) skip the { response: {...} }
    // wrapper and return a bare body like { "status": "failure" } when they
    // reject a request. Surface that as an error instead of letting it ride
    // through as a successful empty result.
    const bare = data as { status?: unknown; logMessage?: unknown; message?: unknown }
    if (bare && typeof bare === 'object' && typeof bare.status === 'string' && bare.status.toLowerCase() === 'failure') {
      const logs = Array.isArray(bare.logMessage)
        ? (bare.logMessage as unknown[]).filter((m): m is string => typeof m === 'string')
        : []
      const message =
        logs.length > 0
          ? logs.join('; ')
          : typeof bare.message === 'string'
            ? bare.message
            : 'Zoho Bookings rejected the request (status: failure) — a required parameter is likely missing or malformed.'
      throw new BookingsApiError(message, 'API_ERROR')
    }
    return data
  }

  const status = resp.status
  const logMessage = Array.isArray(resp.logMessage) ? (resp.logMessage as unknown[]) : []
  const returnvalue = resp.returnvalue

  if (status === 'success') {
    return returnvalue !== undefined ? returnvalue : resp
  }

  // Failure path.
  const messages: string[] = logMessage.filter((m): m is string => typeof m === 'string')
  const rvMessage =
    returnvalue && typeof returnvalue === 'object' && typeof returnvalue.message === 'string'
      ? returnvalue.message
      : undefined
  const message = messages.length > 0 ? messages.join('; ') : rvMessage ?? 'Zoho Bookings API error'
  const code =
    returnvalue && typeof returnvalue === 'object' && typeof returnvalue.code === 'string'
      ? returnvalue.code
      : 'API_ERROR'
  throw new BookingsApiError(message, code)
}
