import { describe, it, expect } from 'vitest'
import ExpensesList from '../../../src/commands/books/expenses/list.js'
import ExpensesGet from '../../../src/commands/books/expenses/get.js'
import ExpensesCreate from '../../../src/commands/books/expenses/create.js'
import ExpensesUpdate from '../../../src/commands/books/expenses/update.js'
import ExpensesDelete from '../../../src/commands/books/expenses/delete.js'

describe('books expenses list', () => {
  it('has correct command id', () => { expect(ExpensesList.id).toBe('books expenses list') })
  it('supports --page flag', () => { expect(ExpensesList.flags.page).toBeDefined() })
  it('supports --per-page flag', () => { expect(ExpensesList.flags['per-page']).toBeDefined() })
  it('supports --status filter', () => { expect(ExpensesList.flags.status).toBeDefined() })
  it('supports --customer-id filter', () => { expect(ExpensesList.flags['customer-id']).toBeDefined() })
})

describe('books expenses get', () => {
  it('has correct command id', () => { expect(ExpensesGet.id).toBe('books expenses get') })
  it('requires id arg', () => { expect(ExpensesGet.args.id.required).toBe(true) })
})

describe('books expenses create', () => {
  it('has correct command id', () => { expect(ExpensesCreate.id).toBe('books expenses create') })
  it('requires --data flag', () => { expect(ExpensesCreate.flags.data.required).toBe(true) })
  it('supports --dry-run flag', () => { expect(ExpensesCreate.flags['dry-run']).toBeDefined() })
})

describe('books expenses update', () => {
  it('has correct command id', () => { expect(ExpensesUpdate.id).toBe('books expenses update') })
  it('requires id arg', () => { expect(ExpensesUpdate.args.id.required).toBe(true) })
  it('requires --data flag', () => { expect(ExpensesUpdate.flags.data.required).toBe(true) })
  it('supports --dry-run flag', () => { expect(ExpensesUpdate.flags['dry-run']).toBeDefined() })
})

describe('books expenses delete', () => {
  it('has correct command id', () => { expect(ExpensesDelete.id).toBe('books expenses delete') })
  it('requires id arg', () => { expect(ExpensesDelete.args.id.required).toBe(true) })
  it('supports --dry-run flag', () => { expect(ExpensesDelete.flags['dry-run']).toBeDefined() })
})
