import { describe, it, expect } from 'vitest'
import { configSchema } from '../src/config/schema.js'

describe('configSchema — defaultBookingsWorkspace', () => {
  it('accepts a string value', () => {
    const parsed = configSchema.parse({ region: 'in', defaultBookingsWorkspace: 'ws_abc123' })
    expect(parsed.defaultBookingsWorkspace).toBe('ws_abc123')
  })

  it('is optional', () => {
    const parsed = configSchema.parse({ region: 'in' })
    expect(parsed.defaultBookingsWorkspace).toBeUndefined()
  })

  it('rejects non-string values', () => {
    expect(() => configSchema.parse({ region: 'in', defaultBookingsWorkspace: 123 })).toThrow()
  })
})
