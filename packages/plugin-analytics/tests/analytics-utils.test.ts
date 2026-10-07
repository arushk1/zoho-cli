import { describe, it, expect } from 'vitest'
import {
  AnalyticsApiError,
  configParams,
  flattenOwnedShared,
  jobPhase,
  parseExportBody,
  splitList,
  toAnalyticsError,
  unwrapEnvelope,
} from '../src/analytics-utils.js'

describe('configParams', () => {
  it('JSON-encodes the config into a single CONFIG param', () => {
    expect(configParams({ responseFormat: 'json', criteria: `"Region"='East'` })).toEqual({
      CONFIG: JSON.stringify({ responseFormat: 'json', criteria: `"Region"='East'` }),
    })
  })

  it('drops undefined keys and returns undefined when nothing is left', () => {
    expect(configParams({ a: undefined })).toBeUndefined()
    expect(configParams(undefined)).toBeUndefined()
    expect(configParams({ a: undefined, b: false })).toEqual({ CONFIG: '{"b":false}' })
  })
})

describe('unwrapEnvelope', () => {
  it('returns data from a success envelope', () => {
    expect(unwrapEnvelope({ status: 'success', summary: 'Create workspace', data: { workspaceId: '1767024000003145002' } }))
      .toEqual({ workspaceId: '1767024000003145002' })
  })

  it('treats an empty 204 body as an empty object', () => {
    expect(unwrapEnvelope('')).toEqual({})
    expect(unwrapEnvelope(undefined)).toEqual({})
  })

  it('throws AnalyticsApiError for a failure envelope', () => {
    const body = { status: 'failure', summary: 'META_DBNAME_DUPLICATE', data: { errorCode: 7101, errorMessage: 'Workspace with the same name exists already.' } }
    expect(() => unwrapEnvelope(body)).toThrow(AnalyticsApiError)
    try {
      unwrapEnvelope(body)
    } catch (error: any) {
      expect(error.code).toBe('META_DBNAME_DUPLICATE')
      expect(error.zohoErrorCode).toBe('7101')
      expect(error.message).toBe('Workspace with the same name exists already.')
    }
  })
})

describe('toAnalyticsError', () => {
  it('decodes a failure envelope delivered as a binary body (export errors)', () => {
    const buf = Buffer.from(JSON.stringify({ status: 'failure', summary: 'META_OBJECT_NOT_PRESENT', data: { errorCode: 7103, errorMessage: 'View not found' } }))
    const error = toAnalyticsError(buf)
    expect(error?.zohoErrorCode).toBe('7103')
    expect(error?.message).toBe('View not found')
  })

  it('ignores non-envelope bodies such as CSV exports', () => {
    expect(toAnalyticsError(Buffer.from('Region,Sales\nEast,10'))).toBeUndefined()
    expect(toAnalyticsError({ status: 'success', data: {} })).toBeUndefined()
  })
})

describe('jobPhase', () => {
  it('maps Zoho job codes (returned as strings) to phases', () => {
    expect(jobPhase('1001')).toBe('pending')
    expect(jobPhase('1002')).toBe('pending')
    expect(jobPhase('1004')).toBe('completed')
    expect(jobPhase('1003')).toBe('failed')
    expect(jobPhase('1005')).toBe('failed')
    expect(jobPhase(1004)).toBe('completed')
  })
})

describe('parseExportBody', () => {
  it('parses JSON exports and unwraps a lone data array', () => {
    expect(parseExportBody(Buffer.from('{"data":[{"Region":"East"}]}'), 'json')).toEqual([{ Region: 'East' }])
  })

  it('passes other JSON shapes through untouched', () => {
    const shape = { response: { result: { rows: [[1]] } } }
    expect(parseExportBody(Buffer.from(JSON.stringify(shape)), 'json')).toEqual(shape)
  })

  it('returns text formats as a string', () => {
    expect(parseExportBody(Buffer.from('Region,Sales\nEast,10\n'), 'csv')).toBe('Region,Sales\nEast,10\n')
  })

  it('keeps 19-digit IDs exact when they arrive as strings', () => {
    expect(parseExportBody(Buffer.from('{"data":[{"id":"1767024000003145011"}]}'), 'json')).toEqual([{ id: '1767024000003145011' }])
  })
})

describe('splitList / flattenOwnedShared', () => {
  it('splits comma lists, trimming blanks', () => {
    expect(splitList(' Region, Sales ,,')).toEqual(['Region', 'Sales'])
    expect(splitList('')).toBeUndefined()
  })

  it('tags owned and shared items with access', () => {
    expect(flattenOwnedShared([{ id: 'a' }], [{ id: 'b' }])).toEqual([
      { id: 'a', access: 'owned' },
      { id: 'b', access: 'shared' },
    ])
    expect(flattenOwnedShared(undefined, undefined)).toEqual([])
  })
})
