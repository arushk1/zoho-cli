import { describe, it, expect } from 'vitest'
import CrmLayoutsList from '../../../src/commands/crm/layouts/list.js'

describe('crm layouts list', () => {
  it('has correct command id', () => {
    expect(CrmLayoutsList.id).toBe('crm layouts list')
  })

  it('has a summary', () => {
    expect(CrmLayoutsList.summary).toBeDefined()
    expect(typeof CrmLayoutsList.summary).toBe('string')
    expect(CrmLayoutsList.summary!.length).toBeGreaterThan(0)
  })

  it('requires --module flag', () => {
    expect(CrmLayoutsList.flags.module).toBeDefined()
    expect(CrmLayoutsList.flags.module.required).toBe(true)
  })

  it('--module flag has short char -m', () => {
    expect((CrmLayoutsList.flags.module as any).char).toBe('m')
  })

  it('has examples', () => {
    expect(CrmLayoutsList.examples).toBeDefined()
    expect(CrmLayoutsList.examples!.length).toBeGreaterThan(0)
  })
})
