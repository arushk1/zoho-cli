import { describe, it, expect } from 'vitest'
import CrmModulesList from '../../../src/commands/crm/modules/list.js'
import CrmModulesGet from '../../../src/commands/crm/modules/get.js'

describe('crm modules list', () => {
  it('has correct command id', () => {
    expect(CrmModulesList.id).toBe('crm modules list')
  })

  it('has a summary', () => {
    expect(CrmModulesList.summary).toBeDefined()
    expect(typeof CrmModulesList.summary).toBe('string')
    expect(CrmModulesList.summary!.length).toBeGreaterThan(0)
  })

  it('has no required args', () => {
    // oclif defines args as {} when no args are declared; there should be no required args
    const requiredArgs = Object.values(CrmModulesList.args ?? {}).filter((a: any) => a.required)
    expect(requiredArgs).toHaveLength(0)
  })

  it('has examples', () => {
    expect(CrmModulesList.examples).toBeDefined()
    expect(CrmModulesList.examples!.length).toBeGreaterThan(0)
  })
})

describe('crm modules get', () => {
  it('has correct command id', () => {
    expect(CrmModulesGet.id).toBe('crm modules get')
  })

  it('has a summary', () => {
    expect(CrmModulesGet.summary).toBeDefined()
    expect(typeof CrmModulesGet.summary).toBe('string')
    expect(CrmModulesGet.summary!.length).toBeGreaterThan(0)
  })

  it('requires a module arg', () => {
    expect(CrmModulesGet.args.module).toBeDefined()
    expect(CrmModulesGet.args.module.required).toBe(true)
  })

  it('has examples', () => {
    expect(CrmModulesGet.examples).toBeDefined()
    expect(CrmModulesGet.examples!.length).toBeGreaterThan(0)
  })
})
