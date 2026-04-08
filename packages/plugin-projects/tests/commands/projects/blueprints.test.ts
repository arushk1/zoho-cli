import { describe, it, expect } from 'vitest'
import BlueprintsList from '../../../src/commands/projects/blueprints/list.js'
import BlueprintsTransitions from '../../../src/commands/projects/blueprints/transitions.js'
import BlueprintsExecute from '../../../src/commands/projects/blueprints/execute.js'

describe('projects blueprints list', () => {
  it('has correct command metadata', () => {
    expect(BlueprintsList.id).toBe('projects blueprints list')
  })

  it('has a summary', () => {
    expect(BlueprintsList.summary).toBeTruthy()
  })
})

describe('projects blueprints transitions', () => {
  it('has correct command metadata', () => {
    expect(BlueprintsTransitions.id).toBe('projects blueprints transitions')
  })

  it('has a summary', () => {
    expect(BlueprintsTransitions.summary).toBeTruthy()
  })

  it('requires id arg', () => {
    expect(BlueprintsTransitions.args.id.required).toBe(true)
  })
})

describe('projects blueprints execute', () => {
  it('has correct command metadata', () => {
    expect(BlueprintsExecute.id).toBe('projects blueprints execute')
  })

  it('has a summary', () => {
    expect(BlueprintsExecute.summary).toBeTruthy()
  })

  it('requires id arg', () => {
    expect(BlueprintsExecute.args.id.required).toBe(true)
  })

  it('requires --data flag', () => {
    expect(BlueprintsExecute.flags.data.required).toBe(true)
  })

  it('--data flag has -d shorthand', () => {
    expect((BlueprintsExecute.flags.data as any).char).toBe('d')
  })

  it('supports --dry-run flag', () => {
    expect(BlueprintsExecute.flags['dry-run']).toBeDefined()
  })

  it('--dry-run defaults to false', () => {
    expect((BlueprintsExecute.flags['dry-run'] as any).default).toBe(false)
  })
})
