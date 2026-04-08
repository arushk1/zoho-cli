import { describe, it, expect } from 'vitest'
import TeamsList from '../../../src/commands/projects/teams/list.js'
import TeamsGet from '../../../src/commands/projects/teams/get.js'
import TeamsCreate from '../../../src/commands/projects/teams/create.js'
import TeamsUpdate from '../../../src/commands/projects/teams/update.js'
import TeamsDelete from '../../../src/commands/projects/teams/delete.js'

describe('projects teams list', () => {
  it('has correct command metadata', () => {
    expect(TeamsList.id).toBe('projects teams list')
  })

  it('has a summary', () => {
    expect(TeamsList.summary).toBeTruthy()
  })

  it('requires --project flag', () => {
    expect(TeamsList.flags.project.required).toBe(true)
  })

  it('supports --page flag', () => {
    expect(TeamsList.flags.page).toBeDefined()
  })

  it('--page defaults to 1', () => {
    expect((TeamsList.flags.page as any).default).toBe(1)
  })

  it('supports --per-page flag', () => {
    expect(TeamsList.flags['per-page']).toBeDefined()
  })
})

describe('projects teams get', () => {
  it('has correct command metadata', () => {
    expect(TeamsGet.id).toBe('projects teams get')
  })

  it('has a summary', () => {
    expect(TeamsGet.summary).toBeTruthy()
  })

  it('requires id arg', () => {
    expect(TeamsGet.args.id.required).toBe(true)
  })
})

describe('projects teams create', () => {
  it('has correct command metadata', () => {
    expect(TeamsCreate.id).toBe('projects teams create')
  })

  it('has a summary', () => {
    expect(TeamsCreate.summary).toBeTruthy()
  })

  it('requires --data flag', () => {
    expect(TeamsCreate.flags.data.required).toBe(true)
  })

  it('--data flag has -d shorthand', () => {
    expect((TeamsCreate.flags.data as any).char).toBe('d')
  })

  it('supports --dry-run flag', () => {
    expect(TeamsCreate.flags['dry-run']).toBeDefined()
  })

  it('--dry-run defaults to false', () => {
    expect((TeamsCreate.flags['dry-run'] as any).default).toBe(false)
  })
})

describe('projects teams update', () => {
  it('has correct command metadata', () => {
    expect(TeamsUpdate.id).toBe('projects teams update')
  })

  it('has a summary', () => {
    expect(TeamsUpdate.summary).toBeTruthy()
  })

  it('requires id arg', () => {
    expect(TeamsUpdate.args.id.required).toBe(true)
  })

  it('requires --data flag', () => {
    expect(TeamsUpdate.flags.data.required).toBe(true)
  })

  it('--data flag has -d shorthand', () => {
    expect((TeamsUpdate.flags.data as any).char).toBe('d')
  })

  it('supports --dry-run flag', () => {
    expect(TeamsUpdate.flags['dry-run']).toBeDefined()
  })

  it('--dry-run defaults to false', () => {
    expect((TeamsUpdate.flags['dry-run'] as any).default).toBe(false)
  })
})

describe('projects teams delete', () => {
  it('has correct command metadata', () => {
    expect(TeamsDelete.id).toBe('projects teams delete')
  })

  it('has a summary', () => {
    expect(TeamsDelete.summary).toBeTruthy()
  })

  it('requires id arg', () => {
    expect(TeamsDelete.args.id.required).toBe(true)
  })

  it('supports --dry-run flag', () => {
    expect(TeamsDelete.flags['dry-run']).toBeDefined()
  })

  it('--dry-run defaults to false', () => {
    expect((TeamsDelete.flags['dry-run'] as any).default).toBe(false)
  })
})
