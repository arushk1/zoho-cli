import { describe, it, expect } from 'vitest'
import CrmRolesList from '../../../src/commands/crm/roles/list.js'

describe('crm roles list', () => {
  it('has correct command id', () => {
    expect(CrmRolesList.id).toBe('crm roles list')
  })

  it('has a summary', () => {
    expect(CrmRolesList.summary).toBeDefined()
    expect(typeof CrmRolesList.summary).toBe('string')
    expect(CrmRolesList.summary!.length).toBeGreaterThan(0)
  })

  it('has examples', () => {
    expect(CrmRolesList.examples).toBeDefined()
    expect(CrmRolesList.examples!.length).toBeGreaterThan(0)
  })

  it('has no required args', () => {
    // oclif returns {} for .args when no static args are defined
    expect(Object.keys(CrmRolesList.args ?? {}).length).toBe(0)
  })

  it('has no custom flags', () => {
    // roles list takes no custom flags — it uses only inherited base flags
    expect(Object.keys(CrmRolesList.flags ?? {}).length).toBe(0)
  })
})
