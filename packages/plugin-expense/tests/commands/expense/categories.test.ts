import { describe, it, expect } from 'vitest'
import CategoriesList from '../../../src/commands/expense/categories/list.js'
import CategoriesGet from '../../../src/commands/expense/categories/get.js'
import CategoriesCreate from '../../../src/commands/expense/categories/create.js'
import CategoriesUpdate from '../../../src/commands/expense/categories/update.js'
import CategoriesDelete from '../../../src/commands/expense/categories/delete.js'
import CategoriesEnable from '../../../src/commands/expense/categories/enable.js'
import CategoriesDisable from '../../../src/commands/expense/categories/disable.js'

describe('expense categories list', () => {
  it('has correct command id', () => { expect(CategoriesList.id).toBe('expense categories list') })
  it('supports --page flag', () => { expect(CategoriesList.flags.page).toBeDefined() })
  it('supports --per-page flag', () => { expect(CategoriesList.flags['per-page']).toBeDefined() })
})

describe('expense categories get', () => {
  it('has correct command id', () => { expect(CategoriesGet.id).toBe('expense categories get') })
  it('requires id arg', () => { expect(CategoriesGet.args.id.required).toBe(true) })
})

describe('expense categories create', () => {
  it('has correct command id', () => { expect(CategoriesCreate.id).toBe('expense categories create') })
  it('requires --data flag', () => { expect(CategoriesCreate.flags.data.required).toBe(true) })
  it('supports --dry-run flag', () => { expect(CategoriesCreate.flags['dry-run']).toBeDefined() })
})

describe('expense categories update', () => {
  it('has correct command id', () => { expect(CategoriesUpdate.id).toBe('expense categories update') })
  it('requires id arg', () => { expect(CategoriesUpdate.args.id.required).toBe(true) })
  it('requires --data flag', () => { expect(CategoriesUpdate.flags.data.required).toBe(true) })
  it('supports --dry-run flag', () => { expect(CategoriesUpdate.flags['dry-run']).toBeDefined() })
})

describe('expense categories delete', () => {
  it('has correct command id', () => { expect(CategoriesDelete.id).toBe('expense categories delete') })
  it('requires id arg', () => { expect(CategoriesDelete.args.id.required).toBe(true) })
  it('supports --dry-run flag', () => { expect(CategoriesDelete.flags['dry-run']).toBeDefined() })
})

describe('expense categories enable', () => {
  it('has correct command id', () => { expect(CategoriesEnable.id).toBe('expense categories enable') })
  it('requires id arg', () => { expect(CategoriesEnable.args.id.required).toBe(true) })
  it('supports --dry-run flag', () => { expect(CategoriesEnable.flags['dry-run']).toBeDefined() })
})

describe('expense categories disable', () => {
  it('has correct command id', () => { expect(CategoriesDisable.id).toBe('expense categories disable') })
  it('requires id arg', () => { expect(CategoriesDisable.args.id.required).toBe(true) })
  it('supports --dry-run flag', () => { expect(CategoriesDisable.flags['dry-run']).toBeDefined() })
})
