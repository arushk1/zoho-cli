import { describe, it, expect } from 'vitest'
import { formatSuccess, formatError, formatOutput } from '../../src/output/index.js'

describe('Output Envelope', () => {
  describe('formatSuccess', () => {
    it('wraps data in success envelope', () => {
      const result = formatSuccess({ id: '123', name: 'Test' })
      expect(result).toEqual({
        success: true,
        data: { id: '123', name: 'Test' },
      })
    })

    it('includes meta when provided', () => {
      const result = formatSuccess([{ id: '1' }], {
        module: 'Leads',
        action: 'list',
        page: 1,
        perPage: 200,
        hasMore: false,
        count: 1,
      })
      expect(result.success).toBe(true)
      expect(result.meta?.module).toBe('Leads')
      expect(result.meta?.count).toBe(1)
    })
  })

  describe('formatError', () => {
    it('wraps error in error envelope', () => {
      const result = formatError({
        code: 'INVALID_DATA',
        message: 'Field Email is required',
        zohoErrorCode: 'MANDATORY_NOT_FOUND',
      })
      expect(result).toEqual({
        success: false,
        error: {
          code: 'INVALID_DATA',
          message: 'Field Email is required',
          zohoErrorCode: 'MANDATORY_NOT_FOUND',
        },
      })
    })
  })

  describe('formatOutput', () => {
    it('serializes to JSON string', () => {
      const envelope = formatSuccess({ id: '1' })
      const output = formatOutput(envelope)
      const parsed = JSON.parse(output)
      expect(parsed.success).toBe(true)
      expect(parsed.data.id).toBe('1')
    })

    it('pretty-prints when requested', () => {
      const envelope = formatSuccess({ id: '1' })
      const output = formatOutput(envelope, true)
      expect(output).toContain('\n')
      expect(output).toContain('  ')
    })
  })
})
