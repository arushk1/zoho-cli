import { describe, it, expect } from 'vitest'
import DeskViewsList from '../../../src/commands/desk/views/list.js'
import DeskViewsGet from '../../../src/commands/desk/views/get.js'
import DeskViewsCreate from '../../../src/commands/desk/views/create.js'
import DeskViewsUpdate from '../../../src/commands/desk/views/update.js'
import DeskViewsDelete from '../../../src/commands/desk/views/delete.js'

describe('desk views list', () => {
  it('has correct command id', () => { expect(DeskViewsList.id).toBe('desk views list') })
  it('has summary', () => { expect(DeskViewsList.summary).toBeDefined() })
  it('supports --page flag', () => { expect(DeskViewsList.flags.page).toBeDefined() })
  it('supports --per-page flag', () => { expect(DeskViewsList.flags['per-page']).toBeDefined() })
  it('supports --module flag', () => { expect(DeskViewsList.flags.module).toBeDefined() })
})

describe('desk views get', () => {
  it('has correct command id', () => { expect(DeskViewsGet.id).toBe('desk views get') })
  it('has summary', () => { expect(DeskViewsGet.summary).toBeDefined() })
  it('requires id arg', () => { expect(DeskViewsGet.args.id.required).toBe(true) })
})

describe('desk views create', () => {
  it('has correct command id', () => { expect(DeskViewsCreate.id).toBe('desk views create') })
  it('has summary', () => { expect(DeskViewsCreate.summary).toBeDefined() })
  it('requires --data flag', () => { expect(DeskViewsCreate.flags.data.required).toBe(true) })
  it('supports --dry-run flag', () => { expect(DeskViewsCreate.flags['dry-run']).toBeDefined() })
})

describe('desk views update', () => {
  it('has correct command id', () => { expect(DeskViewsUpdate.id).toBe('desk views update') })
  it('has summary', () => { expect(DeskViewsUpdate.summary).toBeDefined() })
  it('requires id arg', () => { expect(DeskViewsUpdate.args.id.required).toBe(true) })
  it('requires --data flag', () => { expect(DeskViewsUpdate.flags.data.required).toBe(true) })
  it('supports --dry-run flag', () => { expect(DeskViewsUpdate.flags['dry-run']).toBeDefined() })
})

describe('desk views delete', () => {
  it('has correct command id', () => { expect(DeskViewsDelete.id).toBe('desk views delete') })
  it('has summary', () => { expect(DeskViewsDelete.summary).toBeDefined() })
  it('requires id arg', () => { expect(DeskViewsDelete.args.id.required).toBe(true) })
})
