import { describe, it, expect } from 'vitest'
import ProjectsList from '../../../src/commands/projects/list.js'
import ProjectsGet from '../../../src/commands/projects/get.js'
import ProjectsCreate from '../../../src/commands/projects/create.js'
import ProjectsUpdate from '../../../src/commands/projects/update.js'
import ProjectsDelete from '../../../src/commands/projects/delete.js'

describe('projects list', () => {
  it('has correct command id', () => {
    expect(ProjectsList.id).toBe('projects list')
  })

  it('has a summary', () => {
    expect(ProjectsList.summary).toBeTruthy()
  })

  it('has examples', () => {
    expect(ProjectsList.examples).toBeDefined()
    expect(ProjectsList.examples!.length).toBeGreaterThan(0)
  })

  it('supports --page flag', () => {
    expect(ProjectsList.flags.page).toBeDefined()
  })

  it('supports --per-page flag', () => {
    expect(ProjectsList.flags['per-page']).toBeDefined()
  })

  it('supports --status filter flag', () => {
    expect(ProjectsList.flags.status).toBeDefined()
  })

  it('supports --sort-by flag', () => {
    expect(ProjectsList.flags['sort-by']).toBeDefined()
  })

  it('supports --sort-order flag', () => {
    expect(ProjectsList.flags['sort-order']).toBeDefined()
  })
})

describe('projects get', () => {
  it('has correct command id', () => {
    expect(ProjectsGet.id).toBe('projects get')
  })

  it('has a summary', () => {
    expect(ProjectsGet.summary).toBeTruthy()
  })

  it('requires id arg', () => {
    expect(ProjectsGet.args.id.required).toBe(true)
  })

  it('has examples', () => {
    expect(ProjectsGet.examples).toBeDefined()
    expect(ProjectsGet.examples!.length).toBeGreaterThan(0)
  })
})

describe('projects create', () => {
  it('has correct command id', () => {
    expect(ProjectsCreate.id).toBe('projects create')
  })

  it('has a summary', () => {
    expect(ProjectsCreate.summary).toBeTruthy()
  })

  it('requires --data flag', () => {
    expect(ProjectsCreate.flags.data.required).toBe(true)
  })

  it('--data flag has -d shorthand', () => {
    expect((ProjectsCreate.flags.data as any).char).toBe('d')
  })

  it('supports --dry-run flag', () => {
    expect(ProjectsCreate.flags['dry-run']).toBeDefined()
  })

  it('--dry-run defaults to false', () => {
    expect((ProjectsCreate.flags['dry-run'] as any).default).toBe(false)
  })
})

describe('projects update', () => {
  it('has correct command id', () => {
    expect(ProjectsUpdate.id).toBe('projects update')
  })

  it('has a summary', () => {
    expect(ProjectsUpdate.summary).toBeTruthy()
  })

  it('requires id arg', () => {
    expect(ProjectsUpdate.args.id.required).toBe(true)
  })

  it('requires --data flag', () => {
    expect(ProjectsUpdate.flags.data.required).toBe(true)
  })

  it('--data flag has -d shorthand', () => {
    expect((ProjectsUpdate.flags.data as any).char).toBe('d')
  })

  it('supports --dry-run flag', () => {
    expect(ProjectsUpdate.flags['dry-run']).toBeDefined()
  })

  it('--dry-run defaults to false', () => {
    expect((ProjectsUpdate.flags['dry-run'] as any).default).toBe(false)
  })
})

describe('projects delete', () => {
  it('has correct command id', () => {
    expect(ProjectsDelete.id).toBe('projects delete')
  })

  it('has a summary', () => {
    expect(ProjectsDelete.summary).toBeTruthy()
  })

  it('requires id arg', () => {
    expect(ProjectsDelete.args.id.required).toBe(true)
  })

  it('supports --permanent flag', () => {
    expect(ProjectsDelete.flags.permanent).toBeDefined()
  })

  it('--permanent defaults to false', () => {
    expect((ProjectsDelete.flags.permanent as any).default).toBe(false)
  })

  it('supports --dry-run flag', () => {
    expect(ProjectsDelete.flags['dry-run']).toBeDefined()
  })

  it('--dry-run defaults to false', () => {
    expect((ProjectsDelete.flags['dry-run'] as any).default).toBe(false)
  })
})
