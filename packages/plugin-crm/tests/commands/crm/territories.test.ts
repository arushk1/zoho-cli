import { describe, it, expect } from 'vitest'
import CrmTerritoriesList from '../../../src/commands/crm/territories/list.js'

describe('crm territories list', () => {
  it('has correct command id', () => {
    expect(CrmTerritoriesList.id).toBe('crm territories list')
  })

  it('has a summary', () => {
    expect(CrmTerritoriesList.summary).toBeDefined()
    expect(typeof CrmTerritoriesList.summary).toBe('string')
    expect(CrmTerritoriesList.summary!.length).toBeGreaterThan(0)
  })

  it('has examples', () => {
    expect(CrmTerritoriesList.examples).toBeDefined()
    expect(CrmTerritoriesList.examples!.length).toBeGreaterThan(0)
  })

  it('has no required args', () => {
    expect(Object.keys(CrmTerritoriesList.args ?? {}).length).toBe(0)
  })

  it('has no custom flags', () => {
    expect(Object.keys(CrmTerritoriesList.flags ?? {}).length).toBe(0)
  })
})
