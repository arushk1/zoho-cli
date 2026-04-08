import { describe, it, expect } from 'vitest'
import CrmFieldsList from '../../../src/commands/crm/fields/list.js'
import CrmFieldsGet from '../../../src/commands/crm/fields/get.js'

describe('crm fields list', () => {
  it('has correct command id', () => {
    expect(CrmFieldsList.id).toBe('crm fields list')
  })

  it('has a summary', () => {
    expect(CrmFieldsList.summary).toBeDefined()
    expect(typeof CrmFieldsList.summary).toBe('string')
    expect(CrmFieldsList.summary!.length).toBeGreaterThan(0)
  })

  it('requires --module flag', () => {
    expect(CrmFieldsList.flags.module).toBeDefined()
    expect(CrmFieldsList.flags.module.required).toBe(true)
  })

  it('--module flag has short char -m', () => {
    expect((CrmFieldsList.flags.module as any).char).toBe('m')
  })

  it('has examples', () => {
    expect(CrmFieldsList.examples).toBeDefined()
    expect(CrmFieldsList.examples!.length).toBeGreaterThan(0)
  })
})

describe('crm fields get', () => {
  it('has correct command id', () => {
    expect(CrmFieldsGet.id).toBe('crm fields get')
  })

  it('has a summary', () => {
    expect(CrmFieldsGet.summary).toBeDefined()
    expect(typeof CrmFieldsGet.summary).toBe('string')
    expect(CrmFieldsGet.summary!.length).toBeGreaterThan(0)
  })

  it('requires id arg', () => {
    expect(CrmFieldsGet.args.id).toBeDefined()
    expect(CrmFieldsGet.args.id.required).toBe(true)
  })

  it('requires --module flag', () => {
    expect(CrmFieldsGet.flags.module).toBeDefined()
    expect(CrmFieldsGet.flags.module.required).toBe(true)
  })

  it('--module flag has short char -m', () => {
    expect((CrmFieldsGet.flags.module as any).char).toBe('m')
  })

  it('has examples', () => {
    expect(CrmFieldsGet.examples).toBeDefined()
    expect(CrmFieldsGet.examples!.length).toBeGreaterThan(0)
  })
})
