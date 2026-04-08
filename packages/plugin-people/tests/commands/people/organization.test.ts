import { describe, it, expect } from 'vitest'
import OrgInfo from '../../../src/commands/people/organization/info.js'
import OrgEntities from '../../../src/commands/people/organization/entities.js'
import OrgUnits from '../../../src/commands/people/organization/units.js'
import OrgDivisions from '../../../src/commands/people/organization/divisions.js'

describe('people organization info', () => {
  it('has correct command id', () => {
    expect(OrgInfo.id).toBe('people organization info')
  })

  it('has a summary', () => {
    expect(OrgInfo.summary).toBeTruthy()
  })
})

describe('people organization entities', () => {
  it('has correct command id', () => {
    expect(OrgEntities.id).toBe('people organization entities')
  })

  it('has a summary', () => {
    expect(OrgEntities.summary).toBeTruthy()
  })

  it('supports --page flag', () => {
    expect(OrgEntities.flags.page).toBeDefined()
  })

  it('supports --per-page flag', () => {
    expect(OrgEntities.flags['per-page']).toBeDefined()
  })
})

describe('people organization units', () => {
  it('has correct command id', () => {
    expect(OrgUnits.id).toBe('people organization units')
  })

  it('has a summary', () => {
    expect(OrgUnits.summary).toBeTruthy()
  })

  it('supports --page flag', () => {
    expect(OrgUnits.flags.page).toBeDefined()
  })

  it('supports --per-page flag', () => {
    expect(OrgUnits.flags['per-page']).toBeDefined()
  })
})

describe('people organization divisions', () => {
  it('has correct command id', () => {
    expect(OrgDivisions.id).toBe('people organization divisions')
  })

  it('has a summary', () => {
    expect(OrgDivisions.summary).toBeTruthy()
  })

  it('supports --page flag', () => {
    expect(OrgDivisions.flags.page).toBeDefined()
  })

  it('supports --per-page flag', () => {
    expect(OrgDivisions.flags['per-page']).toBeDefined()
  })
})
