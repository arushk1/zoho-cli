import { describe, it, expect } from 'vitest'
import { iso8601ToZohoDateTime, zohoDateTimeToIso8601, InvalidDateError } from '../src/date-format.js'

describe('iso8601ToZohoDateTime', () => {
  it('converts ISO with T separator', () => {
    expect(iso8601ToZohoDateTime('2026-04-30T14:30:00')).toBe('30-Apr-2026 14:30:00')
  })

  it('converts ISO with space separator', () => {
    expect(iso8601ToZohoDateTime('2026-04-30 14:30:00')).toBe('30-Apr-2026 14:30:00')
  })

  it('defaults seconds to 00 when missing', () => {
    expect(iso8601ToZohoDateTime('2026-04-30T14:30')).toBe('30-Apr-2026 14:30:00')
  })

  it('strips Z timezone suffix', () => {
    expect(iso8601ToZohoDateTime('2026-04-30T14:30:00Z')).toBe('30-Apr-2026 14:30:00')
  })

  it('strips +HH:MM timezone suffix', () => {
    expect(iso8601ToZohoDateTime('2026-04-30T14:30:00+05:30')).toBe('30-Apr-2026 14:30:00')
  })

  it('strips -HHMM timezone suffix (no colon)', () => {
    expect(iso8601ToZohoDateTime('2026-04-30T14:30:00-0800')).toBe('30-Apr-2026 14:30:00')
  })

  it('strips fractional seconds', () => {
    expect(iso8601ToZohoDateTime('2026-04-30T14:30:00.123Z')).toBe('30-Apr-2026 14:30:00')
  })

  it('returns date-only format when input has no time component', () => {
    expect(iso8601ToZohoDateTime('2026-04-30')).toBe('30-Apr-2026')
  })

  it('formats January correctly', () => {
    expect(iso8601ToZohoDateTime('2026-01-01T00:00:00')).toBe('01-Jan-2026 00:00:00')
  })

  it('formats December correctly', () => {
    expect(iso8601ToZohoDateTime('2026-12-31T23:59:59')).toBe('31-Dec-2026 23:59:59')
  })

  it('rejects invalid month numbers', () => {
    expect(() => iso8601ToZohoDateTime('2026-13-01T00:00:00')).toThrow(InvalidDateError)
  })

  it('rejects invalid day for February', () => {
    expect(() => iso8601ToZohoDateTime('2025-02-30T00:00:00')).toThrow(InvalidDateError)
  })

  it('rejects non-ISO garbage', () => {
    expect(() => iso8601ToZohoDateTime('tomorrow')).toThrow(InvalidDateError)
  })

  it('rejects slash-separated dates', () => {
    expect(() => iso8601ToZohoDateTime('30/04/2026')).toThrow(InvalidDateError)
  })

  it('rejects empty string', () => {
    expect(() => iso8601ToZohoDateTime('')).toThrow(InvalidDateError)
  })
})

describe('zohoDateTimeToIso8601', () => {
  it('round-trips with iso8601ToZohoDateTime', () => {
    const iso = '2026-04-30T14:30:00'
    expect(zohoDateTimeToIso8601(iso8601ToZohoDateTime(iso))).toBe(iso)
  })

  it('handles date-only round-trip', () => {
    const iso = '2026-04-30'
    expect(zohoDateTimeToIso8601(iso8601ToZohoDateTime(iso))).toBe(iso)
  })

  it('rejects garbage', () => {
    expect(() => zohoDateTimeToIso8601('not-a-date')).toThrow(InvalidDateError)
  })
})
