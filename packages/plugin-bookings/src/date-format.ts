import { Flags } from '@oclif/core'
import type { AlphabetLowercase, AlphabetUppercase } from '@oclif/core/interfaces'

export class InvalidDateError extends Error {
  public readonly code = 'INVALID_DATE'
  constructor(message: string) {
    super(message)
    this.name = 'InvalidDateError'
  }
}

const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'] as const
const MONTH_INDEX: Record<string, number> = MONTHS.reduce<Record<string, number>>((acc, name, idx) => {
  acc[name] = idx + 1
  return acc
}, {})

// Accepts: 2026-04-30T14:30:00 | ...Z | ...+05:30 | ...-0800 | ...T14:30 | ...T14:30:00.123 | space sep | date-only.
const ISO_RE = /^(\d{4})-(\d{2})-(\d{2})(?:[T ](\d{2}):(\d{2})(?::(\d{2}))?(?:\.\d+)?(?:Z|[+-]\d{2}:?\d{2})?)?$/

export function iso8601ToZohoDateTime(input: string): string {
  if (typeof input !== 'string' || input.length === 0) {
    throw new InvalidDateError(`Invalid ISO 8601 date/time: ${JSON.stringify(input)}`)
  }
  const match = ISO_RE.exec(input)
  if (!match) {
    throw new InvalidDateError(
      `Invalid ISO 8601 date/time: ${JSON.stringify(input)}. Expected e.g. "2026-04-30T14:30:00" or "2026-04-30".`,
    )
  }

  const year = Number(match[1])
  const monthNum = Number(match[2])
  const day = Number(match[3])
  const hasTime = match[4] !== undefined
  const hours = hasTime ? Number(match[4]) : 0
  const minutes = hasTime ? Number(match[5]) : 0
  const seconds = hasTime && match[6] !== undefined ? Number(match[6]) : 0

  if (monthNum < 1 || monthNum > 12) {
    throw new InvalidDateError(`Month out of range in ${JSON.stringify(input)}`)
  }
  if (hours > 23 || minutes > 59 || seconds > 59) {
    throw new InvalidDateError(`Time out of range in ${JSON.stringify(input)}`)
  }
  // Calendar validity (rejects Feb 30, Apr 31, etc.) via UTC round-trip.
  const probe = new Date(Date.UTC(year, monthNum - 1, day, hours, minutes, seconds))
  if (
    probe.getUTCFullYear() !== year ||
    probe.getUTCMonth() !== monthNum - 1 ||
    probe.getUTCDate() !== day
  ) {
    throw new InvalidDateError(`Calendar date invalid in ${JSON.stringify(input)}`)
  }

  const dd = String(day).padStart(2, '0')
  const monthName = MONTHS[monthNum - 1]
  const datePart = `${dd}-${monthName}-${year}`
  if (!hasTime) return datePart
  const hh = String(hours).padStart(2, '0')
  const mm = String(minutes).padStart(2, '0')
  const ss = String(seconds).padStart(2, '0')
  return `${datePart} ${hh}:${mm}:${ss}`
}

const ZOHO_RE = /^(\d{2})-(Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)-(\d{4})(?: (\d{2}):(\d{2}):(\d{2}))?$/

export function zohoDateTimeToIso8601(input: string): string {
  if (typeof input !== 'string') {
    throw new InvalidDateError(`Invalid Zoho date/time: ${JSON.stringify(input)}`)
  }
  const match = ZOHO_RE.exec(input)
  if (!match) {
    throw new InvalidDateError(
      `Invalid Zoho date/time: ${JSON.stringify(input)}. Expected e.g. "30-Apr-2026 14:30:00".`,
    )
  }
  const day = match[1]
  const monthName = match[2]
  const year = match[3]
  const month = String(MONTH_INDEX[monthName]).padStart(2, '0')
  const hasTime = match[4] !== undefined
  const datePart = `${year}-${month}-${day}`
  if (!hasTime) return datePart
  return `${datePart}T${match[4]}:${match[5]}:${match[6]}`
}

interface BookingsDateFlagOpts {
  description: string
  required?: boolean
  dateOnly?: boolean
  char?: string
}

export function bookingsDateTimeFlag(opts: BookingsDateFlagOpts) {
  const note = opts.dateOnly
    ? 'Accepts ISO date (YYYY-MM-DD). Any time component is ignored.'
    : 'Accepts ISO 8601 date-time. Timezone suffix is stripped; Bookings treats values as workspace-local time.'
  const char = opts.char as AlphabetLowercase | AlphabetUppercase | undefined
  const description = `${opts.description}. ${note}`
  const parse = async (input: string): Promise<string> => {
    const out = iso8601ToZohoDateTime(input)
    if (opts.dateOnly) return out.split(' ')[0]
    return out
  }
  if (opts.required === true) {
    return Flags.custom<string>({ description, char, required: true, parse })()
  }
  return Flags.custom<string>({ description, char, required: false, parse })()
}
