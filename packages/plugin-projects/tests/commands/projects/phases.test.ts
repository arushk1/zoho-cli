import { describe, it, expect } from 'vitest'
import PhasesList from '../../../src/commands/projects/phases/list.js'
import PhasesGet from '../../../src/commands/projects/phases/get.js'
import PhasesCreate from '../../../src/commands/projects/phases/create.js'
import PhasesUpdate from '../../../src/commands/projects/phases/update.js'
import PhasesDelete from '../../../src/commands/projects/phases/delete.js'

describe('projects phases list', () => {
  it('has correct command metadata', () => {
    expect(PhasesList.id).toBe('projects phases list')
  })

  it('has a summary', () => {
    expect(PhasesList.summary).toBeTruthy()
  })

  it('supports --project flag (optional)', () => {
    expect(PhasesList.flags.project).toBeDefined()
  })

  it('--project flag is not required', () => {
    expect(PhasesList.flags.project.required).toBeFalsy()
  })

  it('supports --page flag', () => {
    expect(PhasesList.flags.page).toBeDefined()
  })

  it('--page defaults to 1', () => {
    expect((PhasesList.flags.page as any).default).toBe(1)
  })

  it('supports --per-page flag', () => {
    expect(PhasesList.flags['per-page']).toBeDefined()
  })
})

describe('projects phases get', () => {
  it('has correct command metadata', () => {
    expect(PhasesGet.id).toBe('projects phases get')
  })

  it('has a summary', () => {
    expect(PhasesGet.summary).toBeTruthy()
  })

  it('requires id arg', () => {
    expect(PhasesGet.args.id.required).toBe(true)
  })

  it('requires --project flag', () => {
    expect(PhasesGet.flags.project.required).toBe(true)
  })
})

describe('projects phases create', () => {
  it('has correct command metadata', () => {
    expect(PhasesCreate.id).toBe('projects phases create')
  })

  it('has a summary', () => {
    expect(PhasesCreate.summary).toBeTruthy()
  })

  it('requires --project flag', () => {
    expect(PhasesCreate.flags.project.required).toBe(true)
  })

  it('requires --data flag', () => {
    expect(PhasesCreate.flags.data.required).toBe(true)
  })

  it('supports --dry-run flag', () => {
    expect(PhasesCreate.flags['dry-run']).toBeDefined()
  })

  it('--dry-run defaults to false', () => {
    expect((PhasesCreate.flags['dry-run'] as any).default).toBe(false)
  })
})

describe('projects phases update', () => {
  it('has correct command metadata', () => {
    expect(PhasesUpdate.id).toBe('projects phases update')
  })

  it('has a summary', () => {
    expect(PhasesUpdate.summary).toBeTruthy()
  })

  it('requires id arg', () => {
    expect(PhasesUpdate.args.id.required).toBe(true)
  })

  it('requires --project flag', () => {
    expect(PhasesUpdate.flags.project.required).toBe(true)
  })

  it('requires --data flag', () => {
    expect(PhasesUpdate.flags.data.required).toBe(true)
  })

  it('supports --dry-run flag', () => {
    expect(PhasesUpdate.flags['dry-run']).toBeDefined()
  })

  it('--dry-run defaults to false', () => {
    expect((PhasesUpdate.flags['dry-run'] as any).default).toBe(false)
  })
})

describe('projects phases delete', () => {
  it('has correct command metadata', () => {
    expect(PhasesDelete.id).toBe('projects phases delete')
  })

  it('has a summary', () => {
    expect(PhasesDelete.summary).toBeTruthy()
  })

  it('requires id arg', () => {
    expect(PhasesDelete.args.id.required).toBe(true)
  })

  it('requires --project flag', () => {
    expect(PhasesDelete.flags.project.required).toBe(true)
  })

  it('supports --dry-run flag', () => {
    expect(PhasesDelete.flags['dry-run']).toBeDefined()
  })

  it('--dry-run defaults to false', () => {
    expect((PhasesDelete.flags['dry-run'] as any).default).toBe(false)
  })
})
