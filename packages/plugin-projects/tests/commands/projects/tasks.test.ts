import { describe, it, expect } from 'vitest'
import TasksList from '../../../src/commands/projects/tasks/list.js'
import TasksMy from '../../../src/commands/projects/tasks/my.js'
import TasksGet from '../../../src/commands/projects/tasks/get.js'
import TasksCreate from '../../../src/commands/projects/tasks/create.js'
import TasksUpdate from '../../../src/commands/projects/tasks/update.js'
import TasksDelete from '../../../src/commands/projects/tasks/delete.js'
import TasksMove from '../../../src/commands/projects/tasks/move.js'
import TasksCount from '../../../src/commands/projects/tasks/count.js'

describe('projects tasks list', () => {
  it('has correct command metadata', () => {
    expect(TasksList.id).toBe('projects tasks list')
  })

  it('has a summary', () => {
    expect(TasksList.summary).toBeTruthy()
  })

  it('requires --project flag', () => {
    expect(TasksList.flags.project.required).toBe(true)
  })

  it('supports --page flag', () => {
    expect(TasksList.flags.page).toBeDefined()
  })

  it('--page defaults to 1', () => {
    expect((TasksList.flags.page as any).default).toBe(1)
  })

  it('supports --per-page flag', () => {
    expect(TasksList.flags['per-page']).toBeDefined()
  })

  it('supports --status filter flag', () => {
    expect(TasksList.flags.status).toBeDefined()
  })

  it('supports --priority filter flag', () => {
    expect(TasksList.flags.priority).toBeDefined()
  })

  it('supports --owner filter flag', () => {
    expect(TasksList.flags.owner).toBeDefined()
  })

  it('supports --sort-by flag', () => {
    expect(TasksList.flags['sort-by']).toBeDefined()
  })

  it('supports --sort-order flag', () => {
    expect(TasksList.flags['sort-order']).toBeDefined()
  })
})

describe('projects tasks my', () => {
  it('has correct command metadata', () => {
    expect(TasksMy.id).toBe('projects tasks my')
  })

  it('has a summary', () => {
    expect(TasksMy.summary).toBeTruthy()
  })

  it('supports --page flag', () => {
    expect(TasksMy.flags.page).toBeDefined()
  })

  it('supports --per-page flag', () => {
    expect(TasksMy.flags['per-page']).toBeDefined()
  })

  it('supports --sort-by flag', () => {
    expect(TasksMy.flags['sort-by']).toBeDefined()
  })

  it('supports --sort-order flag', () => {
    expect(TasksMy.flags['sort-order']).toBeDefined()
  })
})

describe('projects tasks get', () => {
  it('has correct command metadata', () => {
    expect(TasksGet.id).toBe('projects tasks get')
  })

  it('has a summary', () => {
    expect(TasksGet.summary).toBeTruthy()
  })

  it('requires id arg', () => {
    expect(TasksGet.args.id.required).toBe(true)
  })
})

describe('projects tasks create', () => {
  it('has correct command metadata', () => {
    expect(TasksCreate.id).toBe('projects tasks create')
  })

  it('has a summary', () => {
    expect(TasksCreate.summary).toBeTruthy()
  })

  it('requires --project flag', () => {
    expect(TasksCreate.flags.project.required).toBe(true)
  })

  it('requires --data flag', () => {
    expect(TasksCreate.flags.data.required).toBe(true)
  })

  it('--data flag has -d shorthand', () => {
    expect((TasksCreate.flags.data as any).char).toBe('d')
  })

  it('supports --dry-run flag', () => {
    expect(TasksCreate.flags['dry-run']).toBeDefined()
  })

  it('--dry-run defaults to false', () => {
    expect((TasksCreate.flags['dry-run'] as any).default).toBe(false)
  })
})

describe('projects tasks update', () => {
  it('has correct command metadata', () => {
    expect(TasksUpdate.id).toBe('projects tasks update')
  })

  it('has a summary', () => {
    expect(TasksUpdate.summary).toBeTruthy()
  })

  it('requires id arg', () => {
    expect(TasksUpdate.args.id.required).toBe(true)
  })

  it('requires --data flag', () => {
    expect(TasksUpdate.flags.data.required).toBe(true)
  })

  it('supports --dry-run flag', () => {
    expect(TasksUpdate.flags['dry-run']).toBeDefined()
  })

  it('--dry-run defaults to false', () => {
    expect((TasksUpdate.flags['dry-run'] as any).default).toBe(false)
  })
})

describe('projects tasks delete', () => {
  it('has correct command metadata', () => {
    expect(TasksDelete.id).toBe('projects tasks delete')
  })

  it('has a summary', () => {
    expect(TasksDelete.summary).toBeTruthy()
  })

  it('requires id arg', () => {
    expect(TasksDelete.args.id.required).toBe(true)
  })

  it('supports --dry-run flag', () => {
    expect(TasksDelete.flags['dry-run']).toBeDefined()
  })

  it('--dry-run defaults to false', () => {
    expect((TasksDelete.flags['dry-run'] as any).default).toBe(false)
  })
})

describe('projects tasks move', () => {
  it('has correct command metadata', () => {
    expect(TasksMove.id).toBe('projects tasks move')
  })

  it('has a summary', () => {
    expect(TasksMove.summary).toBeTruthy()
  })

  it('requires id arg', () => {
    expect(TasksMove.args.id.required).toBe(true)
  })

  it('requires --data flag', () => {
    expect(TasksMove.flags.data.required).toBe(true)
  })

  it('--data flag has -d shorthand', () => {
    expect((TasksMove.flags.data as any).char).toBe('d')
  })

  it('supports --dry-run flag', () => {
    expect(TasksMove.flags['dry-run']).toBeDefined()
  })

  it('--dry-run defaults to false', () => {
    expect((TasksMove.flags['dry-run'] as any).default).toBe(false)
  })
})

describe('projects tasks count', () => {
  it('has correct command metadata', () => {
    expect(TasksCount.id).toBe('projects tasks count')
  })

  it('has a summary', () => {
    expect(TasksCount.summary).toBeTruthy()
  })

  it('requires --project flag', () => {
    expect(TasksCount.flags.project.required).toBe(true)
  })
})
