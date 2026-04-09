import { describe, it, expect } from 'vitest'
import DeskTasksList from '../../../src/commands/desk/tasks/list.js'
import DeskTasksGet from '../../../src/commands/desk/tasks/get.js'
import DeskTasksCreate from '../../../src/commands/desk/tasks/create.js'
import DeskTasksUpdate from '../../../src/commands/desk/tasks/update.js'
import DeskTasksDelete from '../../../src/commands/desk/tasks/delete.js'
import DeskTasksCount from '../../../src/commands/desk/tasks/count.js'
import DeskTasksSearch from '../../../src/commands/desk/tasks/search.js'

describe('desk tasks list', () => {
  it('has correct command id', () => { expect(DeskTasksList.id).toBe('desk tasks list') })
  it('has summary', () => { expect(DeskTasksList.summary).toBeDefined() })
  it('supports --page flag', () => { expect(DeskTasksList.flags.page).toBeDefined() })
  it('supports --per-page flag', () => { expect(DeskTasksList.flags['per-page']).toBeDefined() })
  it('supports --department filter', () => { expect(DeskTasksList.flags.department).toBeDefined() })
  it('supports --status filter', () => { expect(DeskTasksList.flags.status).toBeDefined() })
  it('supports --assignee filter', () => { expect(DeskTasksList.flags.assignee).toBeDefined() })
  it('supports --sort-by flag', () => { expect(DeskTasksList.flags['sort-by']).toBeDefined() })
})

describe('desk tasks get', () => {
  it('has correct command id', () => { expect(DeskTasksGet.id).toBe('desk tasks get') })
  it('has summary', () => { expect(DeskTasksGet.summary).toBeDefined() })
  it('requires id arg', () => { expect(DeskTasksGet.args.id.required).toBe(true) })
})

describe('desk tasks create', () => {
  it('has correct command id', () => { expect(DeskTasksCreate.id).toBe('desk tasks create') })
  it('has summary', () => { expect(DeskTasksCreate.summary).toBeDefined() })
  it('requires --data flag', () => { expect(DeskTasksCreate.flags.data.required).toBe(true) })
  it('supports --dry-run flag', () => { expect(DeskTasksCreate.flags['dry-run']).toBeDefined() })
})

describe('desk tasks update', () => {
  it('has correct command id', () => { expect(DeskTasksUpdate.id).toBe('desk tasks update') })
  it('has summary', () => { expect(DeskTasksUpdate.summary).toBeDefined() })
  it('requires id arg', () => { expect(DeskTasksUpdate.args.id.required).toBe(true) })
  it('requires --data flag', () => { expect(DeskTasksUpdate.flags.data.required).toBe(true) })
  it('supports --dry-run flag', () => { expect(DeskTasksUpdate.flags['dry-run']).toBeDefined() })
})

describe('desk tasks delete', () => {
  it('has correct command id', () => { expect(DeskTasksDelete.id).toBe('desk tasks delete') })
  it('has summary', () => { expect(DeskTasksDelete.summary).toBeDefined() })
  it('requires id arg', () => { expect(DeskTasksDelete.args.id.required).toBe(true) })
})

describe('desk tasks count', () => {
  it('has correct command id', () => { expect(DeskTasksCount.id).toBe('desk tasks count') })
  it('has summary', () => { expect(DeskTasksCount.summary).toBeDefined() })
  it('supports --department filter', () => { expect(DeskTasksCount.flags.department).toBeDefined() })
  it('supports --status filter', () => { expect(DeskTasksCount.flags.status).toBeDefined() })
})

describe('desk tasks search', () => {
  it('has correct command id', () => { expect(DeskTasksSearch.id).toBe('desk tasks search') })
  it('has summary', () => { expect(DeskTasksSearch.summary).toBeDefined() })
  it('requires --query flag', () => { expect(DeskTasksSearch.flags.query.required).toBe(true) })
  it('supports --page flag', () => { expect(DeskTasksSearch.flags.page).toBeDefined() })
  it('supports --per-page flag', () => { expect(DeskTasksSearch.flags['per-page']).toBeDefined() })
})
