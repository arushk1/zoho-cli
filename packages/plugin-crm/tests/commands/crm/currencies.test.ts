import { describe, it, expect } from 'vitest'
import CrmCurrenciesList from '../../../src/commands/crm/currencies/list.js'

describe('crm currencies list', () => {
  it('has correct command id', () => {
    expect(CrmCurrenciesList.id).toBe('crm currencies list')
  })

  it('has a summary', () => {
    expect(CrmCurrenciesList.summary).toBeDefined()
    expect(typeof CrmCurrenciesList.summary).toBe('string')
    expect(CrmCurrenciesList.summary!.length).toBeGreaterThan(0)
  })

  it('has examples', () => {
    expect(CrmCurrenciesList.examples).toBeDefined()
    expect(CrmCurrenciesList.examples!.length).toBeGreaterThan(0)
  })

  it('has no required args', () => {
    expect(Object.keys(CrmCurrenciesList.args ?? {}).length).toBe(0)
  })

  it('has no custom flags', () => {
    expect(Object.keys(CrmCurrenciesList.flags ?? {}).length).toBe(0)
  })
})
