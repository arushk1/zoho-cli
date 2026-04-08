import { describe, it, expect } from 'vitest'
import CurrenciesList from '../../../src/commands/expense/currencies/list.js'
import CurrenciesGet from '../../../src/commands/expense/currencies/get.js'
import CurrenciesCreate from '../../../src/commands/expense/currencies/create.js'
import CurrenciesUpdate from '../../../src/commands/expense/currencies/update.js'
import CurrenciesDelete from '../../../src/commands/expense/currencies/delete.js'

describe('expense currencies list', () => {
  it('has correct command id', () => { expect(CurrenciesList.id).toBe('expense currencies list') })
  it('supports --page flag', () => { expect(CurrenciesList.flags.page).toBeDefined() })
  it('supports --per-page flag', () => { expect(CurrenciesList.flags['per-page']).toBeDefined() })
})

describe('expense currencies get', () => {
  it('has correct command id', () => { expect(CurrenciesGet.id).toBe('expense currencies get') })
  it('requires id arg', () => { expect(CurrenciesGet.args.id.required).toBe(true) })
})

describe('expense currencies create', () => {
  it('has correct command id', () => { expect(CurrenciesCreate.id).toBe('expense currencies create') })
  it('requires --data flag', () => { expect(CurrenciesCreate.flags.data.required).toBe(true) })
  it('supports --dry-run flag', () => { expect(CurrenciesCreate.flags['dry-run']).toBeDefined() })
})

describe('expense currencies update', () => {
  it('has correct command id', () => { expect(CurrenciesUpdate.id).toBe('expense currencies update') })
  it('requires id arg', () => { expect(CurrenciesUpdate.args.id.required).toBe(true) })
  it('requires --data flag', () => { expect(CurrenciesUpdate.flags.data.required).toBe(true) })
  it('supports --dry-run flag', () => { expect(CurrenciesUpdate.flags['dry-run']).toBeDefined() })
})

describe('expense currencies delete', () => {
  it('has correct command id', () => { expect(CurrenciesDelete.id).toBe('expense currencies delete') })
  it('requires id arg', () => { expect(CurrenciesDelete.args.id.required).toBe(true) })
  it('supports --dry-run flag', () => { expect(CurrenciesDelete.flags['dry-run']).toBeDefined() })
})
