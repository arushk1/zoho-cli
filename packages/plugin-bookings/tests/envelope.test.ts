import { describe, it, expect } from 'vitest'
import { extractBookingsResult, BookingsApiError } from '../src/envelope.js'

describe('extractBookingsResult', () => {
  it('returns returnvalue on success', () => {
    const data = {
      response: { returnvalue: { id: '1', name: 'ws' }, logMessage: [], status: 'success' },
    }
    expect(extractBookingsResult(data)).toEqual({ id: '1', name: 'ws' })
  })

  it('returns the whole response when returnvalue is missing on success', () => {
    const data = { response: { logMessage: [], status: 'success' } }
    expect(extractBookingsResult(data)).toEqual({ logMessage: [], status: 'success' })
  })

  it('throws BookingsApiError when status is not success', () => {
    const data = {
      response: {
        returnvalue: { code: 'E001', message: 'boom' },
        logMessage: ['something broke'],
        status: 'failure',
      },
    }
    expect(() => extractBookingsResult(data)).toThrow(BookingsApiError)
    try {
      extractBookingsResult(data)
    } catch (e) {
      const err = e as BookingsApiError
      expect(err.code).toBe('E001')
      expect(err.zohoErrorCode).toBe('E001')
      expect(err.message).toBe('something broke')
      expect(err.isBookingsApiError).toBe(true)
    }
  })

  it('falls back to returnvalue.message when logMessage is empty', () => {
    const data = {
      response: {
        returnvalue: { message: 'fallback msg' },
        logMessage: [],
        status: 'failure',
      },
    }
    try {
      extractBookingsResult(data)
    } catch (e) {
      expect((e as BookingsApiError).message).toBe('fallback msg')
    }
  })

  it('defaults code to API_ERROR when returnvalue has none', () => {
    const data = {
      response: { returnvalue: {}, logMessage: ['oops'], status: 'failure' },
    }
    try {
      extractBookingsResult(data)
    } catch (e) {
      expect((e as BookingsApiError).code).toBe('API_ERROR')
    }
  })

  it('joins multi-entry logMessage with "; "', () => {
    const data = {
      response: { returnvalue: {}, logMessage: ['a', 'b', 'c'], status: 'failure' },
    }
    try {
      extractBookingsResult(data)
    } catch (e) {
      expect((e as BookingsApiError).message).toBe('a; b; c')
    }
  })

  it('returns data as-is when envelope is missing', () => {
    const data = { raw: 'untouched' }
    expect(extractBookingsResult(data)).toEqual({ raw: 'untouched' })
  })

  it('throws on a bare un-enveloped failure (e.g. fetchappointment)', () => {
    expect(() => extractBookingsResult({ status: 'failure' })).toThrow(BookingsApiError)
  })

  it('uses top-level logMessage for bare failures when present', () => {
    try {
      extractBookingsResult({ status: 'failure', logMessage: ['bad param', 'try again'] })
    } catch (e) {
      expect((e as BookingsApiError).message).toBe('bad param; try again')
    }
  })

  it('does not throw on a bare success body', () => {
    expect(extractBookingsResult({ status: 'success', data: [] })).toEqual({ status: 'success', data: [] })
  })
})
