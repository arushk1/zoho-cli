import { describe, it, expect } from 'vitest'
import CrmCustomViewsList from '../../../src/commands/crm/custom-views/list.js'

describe('crm custom-views list', () => {
  it('has correct command id', () => {
    expect(CrmCustomViewsList.id).toBe('crm custom-views list')
  })

  it('has a summary', () => {
    expect(CrmCustomViewsList.summary).toBeDefined()
    expect(typeof CrmCustomViewsList.summary).toBe('string')
    expect(CrmCustomViewsList.summary!.length).toBeGreaterThan(0)
  })

  it('requires --module flag', () => {
    expect(CrmCustomViewsList.flags.module).toBeDefined()
    expect(CrmCustomViewsList.flags.module.required).toBe(true)
  })

  it('--module flag has short char -m', () => {
    expect((CrmCustomViewsList.flags.module as any).char).toBe('m')
  })

  it('has examples', () => {
    expect(CrmCustomViewsList.examples).toBeDefined()
    expect(CrmCustomViewsList.examples!.length).toBeGreaterThan(0)
  })
})
