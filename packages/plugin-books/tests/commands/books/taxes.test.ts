import { describe, it, expect } from 'vitest'
import TaxesList from '../../../src/commands/books/taxes/list.js'
import TaxesGet from '../../../src/commands/books/taxes/get.js'
import TaxesCreate from '../../../src/commands/books/taxes/create.js'
import TaxesUpdate from '../../../src/commands/books/taxes/update.js'
import TaxesDelete from '../../../src/commands/books/taxes/delete.js'

describe('books taxes list', () => {
  it('has correct command id', () => { expect(TaxesList.id).toBe('books taxes list') })
  it('supports --page flag', () => { expect(TaxesList.flags.page).toBeDefined() })
  it('supports --per-page flag', () => { expect(TaxesList.flags['per-page']).toBeDefined() })
})

describe('books taxes get', () => {
  it('has correct command id', () => { expect(TaxesGet.id).toBe('books taxes get') })
  it('requires id arg', () => { expect(TaxesGet.args.id.required).toBe(true) })
})

describe('books taxes create', () => {
  it('has correct command id', () => { expect(TaxesCreate.id).toBe('books taxes create') })
  it('requires --data flag', () => { expect(TaxesCreate.flags.data.required).toBe(true) })
  it('supports --dry-run flag', () => { expect(TaxesCreate.flags['dry-run']).toBeDefined() })
})

describe('books taxes update', () => {
  it('has correct command id', () => { expect(TaxesUpdate.id).toBe('books taxes update') })
  it('requires id arg', () => { expect(TaxesUpdate.args.id.required).toBe(true) })
  it('requires --data flag', () => { expect(TaxesUpdate.flags.data.required).toBe(true) })
  it('supports --dry-run flag', () => { expect(TaxesUpdate.flags['dry-run']).toBeDefined() })
})

describe('books taxes delete', () => {
  it('has correct command id', () => { expect(TaxesDelete.id).toBe('books taxes delete') })
  it('requires id arg', () => { expect(TaxesDelete.args.id.required).toBe(true) })
  it('supports --dry-run flag', () => { expect(TaxesDelete.flags['dry-run']).toBeDefined() })
})
