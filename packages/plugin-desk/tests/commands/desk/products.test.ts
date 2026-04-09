import { describe, it, expect } from 'vitest'
import DeskProductsList from '../../../src/commands/desk/products/list.js'
import DeskProductsGet from '../../../src/commands/desk/products/get.js'
import DeskProductsCreate from '../../../src/commands/desk/products/create.js'
import DeskProductsUpdate from '../../../src/commands/desk/products/update.js'
import DeskProductsDelete from '../../../src/commands/desk/products/delete.js'
import DeskProductsCount from '../../../src/commands/desk/products/count.js'

describe('desk products list', () => {
  it('has correct command id', () => { expect(DeskProductsList.id).toBe('desk products list') })
  it('has summary', () => { expect(DeskProductsList.summary).toBeDefined() })
  it('supports --page flag', () => { expect(DeskProductsList.flags.page).toBeDefined() })
  it('supports --per-page flag', () => { expect(DeskProductsList.flags['per-page']).toBeDefined() })
})

describe('desk products get', () => {
  it('has correct command id', () => { expect(DeskProductsGet.id).toBe('desk products get') })
  it('has summary', () => { expect(DeskProductsGet.summary).toBeDefined() })
  it('requires id arg', () => { expect(DeskProductsGet.args.id.required).toBe(true) })
})

describe('desk products create', () => {
  it('has correct command id', () => { expect(DeskProductsCreate.id).toBe('desk products create') })
  it('has summary', () => { expect(DeskProductsCreate.summary).toBeDefined() })
  it('requires --data flag', () => { expect(DeskProductsCreate.flags.data.required).toBe(true) })
  it('supports --dry-run flag', () => { expect(DeskProductsCreate.flags['dry-run']).toBeDefined() })
})

describe('desk products update', () => {
  it('has correct command id', () => { expect(DeskProductsUpdate.id).toBe('desk products update') })
  it('has summary', () => { expect(DeskProductsUpdate.summary).toBeDefined() })
  it('requires id arg', () => { expect(DeskProductsUpdate.args.id.required).toBe(true) })
  it('requires --data flag', () => { expect(DeskProductsUpdate.flags.data.required).toBe(true) })
  it('supports --dry-run flag', () => { expect(DeskProductsUpdate.flags['dry-run']).toBeDefined() })
})

describe('desk products delete', () => {
  it('has correct command id', () => { expect(DeskProductsDelete.id).toBe('desk products delete') })
  it('has summary', () => { expect(DeskProductsDelete.summary).toBeDefined() })
  it('requires id arg', () => { expect(DeskProductsDelete.args.id.required).toBe(true) })
})

describe('desk products count', () => {
  it('has correct command id', () => { expect(DeskProductsCount.id).toBe('desk products count') })
  it('has summary', () => { expect(DeskProductsCount.summary).toBeDefined() })
})
