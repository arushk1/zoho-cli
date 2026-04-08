import { describe, it, expect } from 'vitest'
import SeparationAdd from '../../../src/commands/people/separation/add.js'
import SeparationList from '../../../src/commands/people/separation/list.js'

describe('people separation add', () => {
  it('has correct command id', () => {
    expect(SeparationAdd.id).toBe('people separation add')
  })

  it('has a summary', () => {
    expect(SeparationAdd.summary).toBeTruthy()
  })

  it('requires --data flag', () => {
    expect(SeparationAdd.flags.data.required).toBe(true)
  })

  it('supports --dry-run flag', () => {
    expect(SeparationAdd.flags['dry-run']).toBeDefined()
  })
})

describe('people separation list', () => {
  it('has correct command id', () => {
    expect(SeparationList.id).toBe('people separation list')
  })

  it('has a summary', () => {
    expect(SeparationList.summary).toBeTruthy()
  })

  it('supports --page flag', () => {
    expect(SeparationList.flags.page).toBeDefined()
  })

  it('supports --per-page flag', () => {
    expect(SeparationList.flags['per-page']).toBeDefined()
  })
})
