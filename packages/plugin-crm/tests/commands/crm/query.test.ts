import { describe, it, expect } from 'vitest'
import CrmQuery from '../../../src/commands/crm/query.js'

describe('crm query', () => {
  it('has correct command id', () => {
    expect(CrmQuery.id).toBe('crm query')
  })

  it('has a summary', () => {
    expect(CrmQuery.summary).toBeDefined()
    expect(typeof CrmQuery.summary).toBe('string')
    expect(CrmQuery.summary!.length).toBeGreaterThan(0)
  })

  it('has examples', () => {
    expect(CrmQuery.examples).toBeDefined()
    expect(CrmQuery.examples!.length).toBeGreaterThan(0)
  })

  it('has no required args', () => {
    expect(Object.keys(CrmQuery.args ?? {}).length).toBe(0)
  })

  it('requires --sql flag with COQL query string', () => {
    expect(CrmQuery.flags.sql).toBeDefined()
    expect(CrmQuery.flags.sql.required).toBe(true)
  })

  it('has exactly one custom flag (--sql)', () => {
    const customFlagKeys = Object.keys(CrmQuery.flags)
    expect(customFlagKeys).toContain('sql')
    expect(customFlagKeys).toHaveLength(1)
  })
})
