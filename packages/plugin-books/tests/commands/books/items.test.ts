import { describe, it, expect } from 'vitest'
import ItemsList from '../../../src/commands/books/items/list.js'
import ItemsGet from '../../../src/commands/books/items/get.js'
import ItemsCreate from '../../../src/commands/books/items/create.js'
import ItemsUpdate from '../../../src/commands/books/items/update.js'
import ItemsDelete from '../../../src/commands/books/items/delete.js'
import ItemsActivate from '../../../src/commands/books/items/activate.js'
import ItemsDeactivate from '../../../src/commands/books/items/deactivate.js'

describe('books items list', () => {
  it('has correct command id', () => { expect(ItemsList.id).toBe('books items list') })
  it('supports --page flag', () => { expect(ItemsList.flags.page).toBeDefined() })
  it('supports --per-page flag', () => { expect(ItemsList.flags['per-page']).toBeDefined() })
  it('supports --name filter', () => { expect(ItemsList.flags.name).toBeDefined() })
})

describe('books items get', () => {
  it('has correct command id', () => { expect(ItemsGet.id).toBe('books items get') })
  it('requires id arg', () => { expect(ItemsGet.args.id.required).toBe(true) })
})

describe('books items create', () => {
  it('has correct command id', () => { expect(ItemsCreate.id).toBe('books items create') })
  it('requires --data flag', () => { expect(ItemsCreate.flags.data.required).toBe(true) })
  it('supports --dry-run flag', () => { expect(ItemsCreate.flags['dry-run']).toBeDefined() })
})

describe('books items update', () => {
  it('has correct command id', () => { expect(ItemsUpdate.id).toBe('books items update') })
  it('requires id arg', () => { expect(ItemsUpdate.args.id.required).toBe(true) })
  it('requires --data flag', () => { expect(ItemsUpdate.flags.data.required).toBe(true) })
  it('supports --dry-run flag', () => { expect(ItemsUpdate.flags['dry-run']).toBeDefined() })
})

describe('books items delete', () => {
  it('has correct command id', () => { expect(ItemsDelete.id).toBe('books items delete') })
  it('requires id arg', () => { expect(ItemsDelete.args.id.required).toBe(true) })
  it('supports --dry-run flag', () => { expect(ItemsDelete.flags['dry-run']).toBeDefined() })
})

describe('books items activate', () => {
  it('has correct command id', () => { expect(ItemsActivate.id).toBe('books items activate') })
  it('requires id arg', () => { expect(ItemsActivate.args.id.required).toBe(true) })
  it('supports --dry-run flag', () => { expect(ItemsActivate.flags['dry-run']).toBeDefined() })
})

describe('books items deactivate', () => {
  it('has correct command id', () => { expect(ItemsDeactivate.id).toBe('books items deactivate') })
  it('requires id arg', () => { expect(ItemsDeactivate.args.id.required).toBe(true) })
  it('supports --dry-run flag', () => { expect(ItemsDeactivate.flags['dry-run']).toBeDefined() })
})
