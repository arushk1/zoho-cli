import { describe, it, expect } from 'vitest'
import { isZohoRecordError, collectZohoRecordErrors, mapZohoError } from '../../src/output/index.js'

// Zoho write APIs answer HTTP 200 even when a record is rejected. The per-record
// verdict lives in the body, so axios never throws and callers must inspect it.
const REJECTED = {
  code: 'INVALID_DATA',
  details: { expected_data_type: 'email', api_name: 'Email' },
  message: 'invalid data',
  status: 'error',
}

const ACCEPTED = {
  code: 'SUCCESS',
  details: { id: '504196000003271010', Modified_Time: '2026-08-03T12:07:36+05:30' },
  message: 'record added',
  status: 'success',
}

describe('isZohoRecordError', () => {
  it('flags a rejected record returned inside a 200 body', () => {
    expect(isZohoRecordError(REJECTED)).toBe(true)
  })

  it('does not flag an accepted record', () => {
    expect(isZohoRecordError(ACCEPTED)).toBe(false)
  })

  it('does not flag an ordinary read record', () => {
    expect(isZohoRecordError({ id: '123', Last_Name: 'Smith', Email: 'smith@example.com' })).toBe(false)
  })

  it('is case-insensitive on status', () => {
    expect(isZohoRecordError({ code: 'INVALID_DATA', status: 'ERROR' })).toBe(true)
  })

  it('requires a Zoho error code, not just a status field', () => {
    // A CRM record may legitimately carry a custom field named "status".
    expect(isZohoRecordError({ id: '123', status: 'error' })).toBe(false)
  })

  it('returns false for null, undefined and primitives', () => {
    expect(isZohoRecordError(null)).toBe(false)
    expect(isZohoRecordError(undefined)).toBe(false)
    expect(isZohoRecordError('error')).toBe(false)
    expect(isZohoRecordError(42)).toBe(false)
  })
})

describe('collectZohoRecordErrors', () => {
  it('returns the rejected record from a single-record payload', () => {
    expect(collectZohoRecordErrors(REJECTED)).toEqual([REJECTED])
  })

  it('returns an empty array when the record was accepted', () => {
    expect(collectZohoRecordErrors(ACCEPTED)).toEqual([])
  })

  it('picks out only the failures in a mixed bulk response', () => {
    expect(collectZohoRecordErrors([ACCEPTED, REJECTED, ACCEPTED])).toEqual([REJECTED])
  })

  it('returns an empty array when every record in a bulk response succeeded', () => {
    expect(collectZohoRecordErrors([ACCEPTED, ACCEPTED])).toEqual([])
  })

  it('handles empty and non-object payloads safely', () => {
    expect(collectZohoRecordErrors([])).toEqual([])
    expect(collectZohoRecordErrors(null)).toEqual([])
    expect(collectZohoRecordErrors(undefined)).toEqual([])
  })
})

describe('mapZohoError on a rejected record', () => {
  it('surfaces the Zoho code, message and field details', () => {
    expect(mapZohoError(REJECTED)).toEqual({
      code: 'INVALID_DATA',
      message: 'invalid data',
      zohoErrorCode: 'INVALID_DATA',
      details: { expected_data_type: 'email', api_name: 'Email' },
    })
  })
})
