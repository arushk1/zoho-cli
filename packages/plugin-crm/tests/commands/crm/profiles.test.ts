import { describe, it, expect } from 'vitest'
import CrmProfilesList from '../../../src/commands/crm/profiles/list.js'

describe('crm profiles list', () => {
  it('has correct command id', () => {
    expect(CrmProfilesList.id).toBe('crm profiles list')
  })

  it('has a summary', () => {
    expect(CrmProfilesList.summary).toBeDefined()
    expect(typeof CrmProfilesList.summary).toBe('string')
    expect(CrmProfilesList.summary!.length).toBeGreaterThan(0)
  })

  it('has examples', () => {
    expect(CrmProfilesList.examples).toBeDefined()
    expect(CrmProfilesList.examples!.length).toBeGreaterThan(0)
  })

  it('has no required args', () => {
    expect(Object.keys(CrmProfilesList.args ?? {}).length).toBe(0)
  })

  it('has no custom flags', () => {
    expect(Object.keys(CrmProfilesList.flags ?? {}).length).toBe(0)
  })
})
