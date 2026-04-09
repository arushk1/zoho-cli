import { describe, it, expect } from 'vitest'
import DeskKbCategoriesList from '../../../src/commands/desk/kb-categories/list.js'
import DeskKbCategoriesGet from '../../../src/commands/desk/kb-categories/get.js'
import DeskKbCategoriesCreate from '../../../src/commands/desk/kb-categories/create.js'
import DeskKbCategoriesUpdate from '../../../src/commands/desk/kb-categories/update.js'
import DeskKbCategoriesDelete from '../../../src/commands/desk/kb-categories/delete.js'

describe('desk kb-categories list', () => {
  it('has correct command id', () => { expect(DeskKbCategoriesList.id).toBe('desk kb-categories list') })
  it('has summary', () => { expect(DeskKbCategoriesList.summary).toBeDefined() })
  it('supports --page flag', () => { expect(DeskKbCategoriesList.flags.page).toBeDefined() })
  it('supports --per-page flag', () => { expect(DeskKbCategoriesList.flags['per-page']).toBeDefined() })
})

describe('desk kb-categories get', () => {
  it('has correct command id', () => { expect(DeskKbCategoriesGet.id).toBe('desk kb-categories get') })
  it('has summary', () => { expect(DeskKbCategoriesGet.summary).toBeDefined() })
  it('requires id arg', () => { expect(DeskKbCategoriesGet.args.id.required).toBe(true) })
})

describe('desk kb-categories create', () => {
  it('has correct command id', () => { expect(DeskKbCategoriesCreate.id).toBe('desk kb-categories create') })
  it('has summary', () => { expect(DeskKbCategoriesCreate.summary).toBeDefined() })
  it('requires --data flag', () => { expect(DeskKbCategoriesCreate.flags.data.required).toBe(true) })
  it('supports --dry-run flag', () => { expect(DeskKbCategoriesCreate.flags['dry-run']).toBeDefined() })
})

describe('desk kb-categories update', () => {
  it('has correct command id', () => { expect(DeskKbCategoriesUpdate.id).toBe('desk kb-categories update') })
  it('has summary', () => { expect(DeskKbCategoriesUpdate.summary).toBeDefined() })
  it('requires id arg', () => { expect(DeskKbCategoriesUpdate.args.id.required).toBe(true) })
  it('requires --data flag', () => { expect(DeskKbCategoriesUpdate.flags.data.required).toBe(true) })
  it('supports --dry-run flag', () => { expect(DeskKbCategoriesUpdate.flags['dry-run']).toBeDefined() })
})

describe('desk kb-categories delete', () => {
  it('has correct command id', () => { expect(DeskKbCategoriesDelete.id).toBe('desk kb-categories delete') })
  it('has summary', () => { expect(DeskKbCategoriesDelete.summary).toBeDefined() })
  it('requires id arg', () => { expect(DeskKbCategoriesDelete.args.id.required).toBe(true) })
})
