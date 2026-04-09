import { describe, it, expect } from 'vitest'
import DeskEventsList from '../../../src/commands/desk/events/list.js'
import DeskEventsGet from '../../../src/commands/desk/events/get.js'
import DeskEventsCreate from '../../../src/commands/desk/events/create.js'
import DeskEventsUpdate from '../../../src/commands/desk/events/update.js'
import DeskEventsDelete from '../../../src/commands/desk/events/delete.js'
import DeskEventsCount from '../../../src/commands/desk/events/count.js'

describe('desk events list', () => {
  it('has correct command id', () => { expect(DeskEventsList.id).toBe('desk events list') })
  it('has summary', () => { expect(DeskEventsList.summary).toBeDefined() })
  it('supports --page flag', () => { expect(DeskEventsList.flags.page).toBeDefined() })
  it('supports --per-page flag', () => { expect(DeskEventsList.flags['per-page']).toBeDefined() })
  it('supports --department filter', () => { expect(DeskEventsList.flags.department).toBeDefined() })
  it('supports --assignee filter', () => { expect(DeskEventsList.flags.assignee).toBeDefined() })
})

describe('desk events get', () => {
  it('has correct command id', () => { expect(DeskEventsGet.id).toBe('desk events get') })
  it('has summary', () => { expect(DeskEventsGet.summary).toBeDefined() })
  it('requires id arg', () => { expect(DeskEventsGet.args.id.required).toBe(true) })
})

describe('desk events create', () => {
  it('has correct command id', () => { expect(DeskEventsCreate.id).toBe('desk events create') })
  it('has summary', () => { expect(DeskEventsCreate.summary).toBeDefined() })
  it('requires --data flag', () => { expect(DeskEventsCreate.flags.data.required).toBe(true) })
  it('supports --dry-run flag', () => { expect(DeskEventsCreate.flags['dry-run']).toBeDefined() })
})

describe('desk events update', () => {
  it('has correct command id', () => { expect(DeskEventsUpdate.id).toBe('desk events update') })
  it('has summary', () => { expect(DeskEventsUpdate.summary).toBeDefined() })
  it('requires id arg', () => { expect(DeskEventsUpdate.args.id.required).toBe(true) })
  it('requires --data flag', () => { expect(DeskEventsUpdate.flags.data.required).toBe(true) })
  it('supports --dry-run flag', () => { expect(DeskEventsUpdate.flags['dry-run']).toBeDefined() })
})

describe('desk events delete', () => {
  it('has correct command id', () => { expect(DeskEventsDelete.id).toBe('desk events delete') })
  it('has summary', () => { expect(DeskEventsDelete.summary).toBeDefined() })
  it('requires id arg', () => { expect(DeskEventsDelete.args.id.required).toBe(true) })
})

describe('desk events count', () => {
  it('has correct command id', () => { expect(DeskEventsCount.id).toBe('desk events count') })
  it('has summary', () => { expect(DeskEventsCount.summary).toBeDefined() })
})
