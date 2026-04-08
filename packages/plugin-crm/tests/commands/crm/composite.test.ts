import { describe, it, expect } from 'vitest'
import CrmComposite from '../../../src/commands/crm/composite.js'

describe('crm composite', () => {
  it('has correct command id', () => {
    expect(CrmComposite.id).toBe('crm composite')
  })

  it('has a summary', () => {
    expect(CrmComposite.summary).toBeDefined()
    expect(typeof CrmComposite.summary).toBe('string')
    expect(CrmComposite.summary!.length).toBeGreaterThan(0)
  })

  it('has examples', () => {
    expect(CrmComposite.examples).toBeDefined()
    expect(CrmComposite.examples!.length).toBeGreaterThan(0)
  })

  it('has no required args', () => {
    expect(Object.keys(CrmComposite.args ?? {}).length).toBe(0)
  })

  it('requires --requests flag with JSON array of sub-requests', () => {
    expect(CrmComposite.flags.requests).toBeDefined()
    expect(CrmComposite.flags.requests.required).toBe(true)
  })

  it('has exactly one custom flag (--requests)', () => {
    const customFlagKeys = Object.keys(CrmComposite.flags)
    expect(customFlagKeys).toContain('requests')
    expect(customFlagKeys).toHaveLength(1)
  })

  it('summary mentions number of sub-requests allowed', () => {
    // The composite command is documented to support up to 5 sub-requests
    expect(CrmComposite.summary).toContain('5')
  })
})
