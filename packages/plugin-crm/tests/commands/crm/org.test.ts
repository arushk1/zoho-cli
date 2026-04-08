import { describe, it, expect } from 'vitest'
import CrmOrgInfo from '../../../src/commands/crm/org/info.js'

describe('crm org info', () => {
  it('has correct command id', () => {
    expect(CrmOrgInfo.id).toBe('crm org info')
  })

  it('has a summary', () => {
    expect(CrmOrgInfo.summary).toBeDefined()
    expect(typeof CrmOrgInfo.summary).toBe('string')
    expect(CrmOrgInfo.summary!.length).toBeGreaterThan(0)
  })

  it('has examples', () => {
    expect(CrmOrgInfo.examples).toBeDefined()
    expect(CrmOrgInfo.examples!.length).toBeGreaterThan(0)
  })

  it('has no required args', () => {
    // oclif returns {} for .args when no static args are defined
    expect(Object.keys(CrmOrgInfo.args ?? {}).length).toBe(0)
  })

  it('has no required flags beyond base flags', () => {
    // org info takes no custom flags — it uses only inherited base flags
    expect(Object.keys(CrmOrgInfo.flags ?? {}).length).toBe(0)
  })
})
