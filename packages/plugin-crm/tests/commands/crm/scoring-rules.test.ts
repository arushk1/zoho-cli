import { describe, it, expect } from 'vitest'
import CrmScoringRulesList from '../../../src/commands/crm/scoring-rules/list.js'

describe('crm scoring-rules list', () => {
  it('has correct command id', () => {
    expect(CrmScoringRulesList.id).toBe('crm scoring-rules list')
  })

  it('has a summary', () => {
    expect(CrmScoringRulesList.summary).toBeDefined()
    expect(typeof CrmScoringRulesList.summary).toBe('string')
    expect(CrmScoringRulesList.summary!.length).toBeGreaterThan(0)
  })

  it('has examples', () => {
    expect(CrmScoringRulesList.examples).toBeDefined()
    expect(CrmScoringRulesList.examples!.length).toBeGreaterThan(0)
  })

  it('has no required args', () => {
    expect(Object.keys(CrmScoringRulesList.args ?? {}).length).toBe(0)
  })

  it('has no custom flags', () => {
    expect(Object.keys(CrmScoringRulesList.flags ?? {}).length).toBe(0)
  })
})
