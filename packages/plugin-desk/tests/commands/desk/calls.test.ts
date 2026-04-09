import { describe, it, expect } from 'vitest'
import DeskCallsList from '../../../src/commands/desk/calls/list.js'
import DeskCallsGet from '../../../src/commands/desk/calls/get.js'
import DeskCallsCreate from '../../../src/commands/desk/calls/create.js'
import DeskCallsUpdate from '../../../src/commands/desk/calls/update.js'
import DeskCallsDelete from '../../../src/commands/desk/calls/delete.js'
import DeskCallsCount from '../../../src/commands/desk/calls/count.js'

describe('desk calls list', () => {
  it('has correct command id', () => { expect(DeskCallsList.id).toBe('desk calls list') })
  it('has summary', () => { expect(DeskCallsList.summary).toBeDefined() })
  it('supports --page flag', () => { expect(DeskCallsList.flags.page).toBeDefined() })
  it('supports --per-page flag', () => { expect(DeskCallsList.flags['per-page']).toBeDefined() })
  it('supports --department filter', () => { expect(DeskCallsList.flags.department).toBeDefined() })
  it('supports --assignee filter', () => { expect(DeskCallsList.flags.assignee).toBeDefined() })
  it('supports --status filter', () => { expect(DeskCallsList.flags.status).toBeDefined() })
})

describe('desk calls get', () => {
  it('has correct command id', () => { expect(DeskCallsGet.id).toBe('desk calls get') })
  it('has summary', () => { expect(DeskCallsGet.summary).toBeDefined() })
  it('requires id arg', () => { expect(DeskCallsGet.args.id.required).toBe(true) })
})

describe('desk calls create', () => {
  it('has correct command id', () => { expect(DeskCallsCreate.id).toBe('desk calls create') })
  it('has summary', () => { expect(DeskCallsCreate.summary).toBeDefined() })
  it('requires --data flag', () => { expect(DeskCallsCreate.flags.data.required).toBe(true) })
  it('supports --dry-run flag', () => { expect(DeskCallsCreate.flags['dry-run']).toBeDefined() })
})

describe('desk calls update', () => {
  it('has correct command id', () => { expect(DeskCallsUpdate.id).toBe('desk calls update') })
  it('has summary', () => { expect(DeskCallsUpdate.summary).toBeDefined() })
  it('requires id arg', () => { expect(DeskCallsUpdate.args.id.required).toBe(true) })
  it('requires --data flag', () => { expect(DeskCallsUpdate.flags.data.required).toBe(true) })
  it('supports --dry-run flag', () => { expect(DeskCallsUpdate.flags['dry-run']).toBeDefined() })
})

describe('desk calls delete', () => {
  it('has correct command id', () => { expect(DeskCallsDelete.id).toBe('desk calls delete') })
  it('has summary', () => { expect(DeskCallsDelete.summary).toBeDefined() })
  it('requires id arg', () => { expect(DeskCallsDelete.args.id.required).toBe(true) })
})

describe('desk calls count', () => {
  it('has correct command id', () => { expect(DeskCallsCount.id).toBe('desk calls count') })
  it('has summary', () => { expect(DeskCallsCount.summary).toBeDefined() })
})
