import { describe, it, expect } from 'vitest'
import TasklistsList from '../../../src/commands/projects/tasklists/list.js'
import TasklistsGet from '../../../src/commands/projects/tasklists/get.js'
import TasklistsCreate from '../../../src/commands/projects/tasklists/create.js'
import TasklistsUpdate from '../../../src/commands/projects/tasklists/update.js'
import TasklistsDelete from '../../../src/commands/projects/tasklists/delete.js'

describe('projects tasklists list', () => {
  it('has correct command metadata', () => {
    expect(TasklistsList.id).toBe('projects tasklists list')
  })

  it('has a summary', () => {
    expect(TasklistsList.summary).toBeTruthy()
  })

  it('supports --project flag (optional)', () => {
    expect(TasklistsList.flags.project).toBeDefined()
  })

  it('--project flag is not required', () => {
    expect(TasklistsList.flags.project.required).toBeFalsy()
  })

  it('supports --page flag', () => {
    expect(TasklistsList.flags.page).toBeDefined()
  })

  it('--page defaults to 1', () => {
    expect((TasklistsList.flags.page as any).default).toBe(1)
  })

  it('supports --per-page flag', () => {
    expect(TasklistsList.flags['per-page']).toBeDefined()
  })
})

describe('projects tasklists get', () => {
  it('has correct command metadata', () => {
    expect(TasklistsGet.id).toBe('projects tasklists get')
  })

  it('has a summary', () => {
    expect(TasklistsGet.summary).toBeTruthy()
  })

  it('requires id arg', () => {
    expect(TasklistsGet.args.id.required).toBe(true)
  })
})

describe('projects tasklists create', () => {
  it('has correct command metadata', () => {
    expect(TasklistsCreate.id).toBe('projects tasklists create')
  })

  it('has a summary', () => {
    expect(TasklistsCreate.summary).toBeTruthy()
  })

  it('requires --project flag', () => {
    expect(TasklistsCreate.flags.project.required).toBe(true)
  })

  it('requires --data flag', () => {
    expect(TasklistsCreate.flags.data.required).toBe(true)
  })

  it('--data flag has -d shorthand', () => {
    expect((TasklistsCreate.flags.data as any).char).toBe('d')
  })

  it('supports --dry-run flag', () => {
    expect(TasklistsCreate.flags['dry-run']).toBeDefined()
  })

  it('--dry-run defaults to false', () => {
    expect((TasklistsCreate.flags['dry-run'] as any).default).toBe(false)
  })
})

describe('projects tasklists update', () => {
  it('has correct command metadata', () => {
    expect(TasklistsUpdate.id).toBe('projects tasklists update')
  })

  it('has a summary', () => {
    expect(TasklistsUpdate.summary).toBeTruthy()
  })

  it('requires id arg', () => {
    expect(TasklistsUpdate.args.id.required).toBe(true)
  })

  it('requires --data flag', () => {
    expect(TasklistsUpdate.flags.data.required).toBe(true)
  })

  it('--data flag has -d shorthand', () => {
    expect((TasklistsUpdate.flags.data as any).char).toBe('d')
  })

  it('supports --dry-run flag', () => {
    expect(TasklistsUpdate.flags['dry-run']).toBeDefined()
  })

  it('--dry-run defaults to false', () => {
    expect((TasklistsUpdate.flags['dry-run'] as any).default).toBe(false)
  })
})

describe('projects tasklists delete', () => {
  it('has correct command metadata', () => {
    expect(TasklistsDelete.id).toBe('projects tasklists delete')
  })

  it('has a summary', () => {
    expect(TasklistsDelete.summary).toBeTruthy()
  })

  it('requires id arg', () => {
    expect(TasklistsDelete.args.id.required).toBe(true)
  })

  it('supports --dry-run flag', () => {
    expect(TasklistsDelete.flags['dry-run']).toBeDefined()
  })

  it('--dry-run defaults to false', () => {
    expect((TasklistsDelete.flags['dry-run'] as any).default).toBe(false)
  })
})
