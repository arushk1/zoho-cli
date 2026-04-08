import { describe, it, expect } from 'vitest'
import CrmVariablesList from '../../../src/commands/crm/variables/list.js'

describe('crm variables list', () => {
  it('has correct command id', () => {
    expect(CrmVariablesList.id).toBe('crm variables list')
  })

  it('has a summary', () => {
    expect(CrmVariablesList.summary).toBeDefined()
    expect(typeof CrmVariablesList.summary).toBe('string')
    expect(CrmVariablesList.summary!.length).toBeGreaterThan(0)
  })

  it('has examples', () => {
    expect(CrmVariablesList.examples).toBeDefined()
    expect(CrmVariablesList.examples!.length).toBeGreaterThan(0)
  })

  it('has no required args', () => {
    expect(Object.keys(CrmVariablesList.args ?? {}).length).toBe(0)
  })

  it('has no custom flags', () => {
    expect(Object.keys(CrmVariablesList.flags ?? {}).length).toBe(0)
  })
})
