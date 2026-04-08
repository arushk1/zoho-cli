import { describe, it, expect } from 'vitest'
import CurrenciesList from '../../../src/commands/books/currencies/list.js'
import CurrenciesGet from '../../../src/commands/books/currencies/get.js'
import CurrenciesCreate from '../../../src/commands/books/currencies/create.js'
import CurrenciesUpdate from '../../../src/commands/books/currencies/update.js'
import CurrenciesDelete from '../../../src/commands/books/currencies/delete.js'

describe('books currencies list', () => {
  it('has correct command id', () => { expect(CurrenciesList.id).toBe('books currencies list') })
  it('supports --page flag', () => { expect(CurrenciesList.flags.page).toBeDefined() })
  it('supports --per-page flag', () => { expect(CurrenciesList.flags['per-page']).toBeDefined() })
})

describe('books currencies get', () => {
  it('has correct command id', () => { expect(CurrenciesGet.id).toBe('books currencies get') })
  it('requires id arg', () => { expect(CurrenciesGet.args.id.required).toBe(true) })
})

describe('books currencies create', () => {
  it('has correct command id', () => { expect(CurrenciesCreate.id).toBe('books currencies create') })
  it('requires --data flag', () => { expect(CurrenciesCreate.flags.data.required).toBe(true) })
  it('supports --dry-run flag', () => { expect(CurrenciesCreate.flags['dry-run']).toBeDefined() })
})

describe('books currencies update', () => {
  it('has correct command id', () => { expect(CurrenciesUpdate.id).toBe('books currencies update') })
  it('requires id arg', () => { expect(CurrenciesUpdate.args.id.required).toBe(true) })
  it('requires --data flag', () => { expect(CurrenciesUpdate.flags.data.required).toBe(true) })
  it('supports --dry-run flag', () => { expect(CurrenciesUpdate.flags['dry-run']).toBeDefined() })
})

describe('books currencies delete', () => {
  it('has correct command id', () => { expect(CurrenciesDelete.id).toBe('books currencies delete') })
  it('requires id arg', () => { expect(CurrenciesDelete.args.id.required).toBe(true) })
  it('supports --dry-run flag', () => { expect(CurrenciesDelete.flags['dry-run']).toBeDefined() })
})
