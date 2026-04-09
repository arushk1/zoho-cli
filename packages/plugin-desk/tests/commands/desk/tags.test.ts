import { describe, it, expect } from 'vitest'
import DeskTagsList from '../../../src/commands/desk/tags/list.js'
import DeskTagsGet from '../../../src/commands/desk/tags/get.js'
import DeskTagsCreate from '../../../src/commands/desk/tags/create.js'
import DeskTagsUpdate from '../../../src/commands/desk/tags/update.js'
import DeskTagsDelete from '../../../src/commands/desk/tags/delete.js'
import DeskTagsCount from '../../../src/commands/desk/tags/count.js'

describe('desk tags list', () => {
  it('has correct command id', () => { expect(DeskTagsList.id).toBe('desk tags list') })
  it('has summary', () => { expect(DeskTagsList.summary).toBeDefined() })
  it('supports --page flag', () => { expect(DeskTagsList.flags.page).toBeDefined() })
  it('supports --per-page flag', () => { expect(DeskTagsList.flags['per-page']).toBeDefined() })
  it('supports --department flag', () => { expect(DeskTagsList.flags.department).toBeDefined() })
})

describe('desk tags get', () => {
  it('has correct command id', () => { expect(DeskTagsGet.id).toBe('desk tags get') })
  it('has summary', () => { expect(DeskTagsGet.summary).toBeDefined() })
  it('requires id arg', () => { expect(DeskTagsGet.args.id.required).toBe(true) })
})

describe('desk tags create', () => {
  it('has correct command id', () => { expect(DeskTagsCreate.id).toBe('desk tags create') })
  it('has summary', () => { expect(DeskTagsCreate.summary).toBeDefined() })
  it('requires --data flag', () => { expect(DeskTagsCreate.flags.data.required).toBe(true) })
  it('supports --dry-run flag', () => { expect(DeskTagsCreate.flags['dry-run']).toBeDefined() })
})

describe('desk tags update', () => {
  it('has correct command id', () => { expect(DeskTagsUpdate.id).toBe('desk tags update') })
  it('has summary', () => { expect(DeskTagsUpdate.summary).toBeDefined() })
  it('requires id arg', () => { expect(DeskTagsUpdate.args.id.required).toBe(true) })
  it('requires --data flag', () => { expect(DeskTagsUpdate.flags.data.required).toBe(true) })
  it('supports --dry-run flag', () => { expect(DeskTagsUpdate.flags['dry-run']).toBeDefined() })
})

describe('desk tags delete', () => {
  it('has correct command id', () => { expect(DeskTagsDelete.id).toBe('desk tags delete') })
  it('has summary', () => { expect(DeskTagsDelete.summary).toBeDefined() })
  it('requires id arg', () => { expect(DeskTagsDelete.args.id.required).toBe(true) })
})

describe('desk tags count', () => {
  it('has correct command id', () => { expect(DeskTagsCount.id).toBe('desk tags count') })
  it('has summary', () => { expect(DeskTagsCount.summary).toBeDefined() })
})
