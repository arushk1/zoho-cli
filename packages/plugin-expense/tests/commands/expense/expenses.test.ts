import { describe, it, expect } from 'vitest'
import ExpensesList from '../../../src/commands/expense/expenses/list.js'
import ExpensesCreate from '../../../src/commands/expense/expenses/create.js'
import ExpensesUpdate from '../../../src/commands/expense/expenses/update.js'
import ExpensesMerge from '../../../src/commands/expense/expenses/merge.js'

describe('expense expenses list', () => {
  it('has correct command id', () => { expect(ExpensesList.id).toBe('expense expenses list') })
  it('supports --page flag', () => { expect(ExpensesList.flags.page).toBeDefined() })
  it('supports --per-page flag', () => { expect(ExpensesList.flags['per-page']).toBeDefined() })
  it('supports --status filter', () => { expect(ExpensesList.flags.status).toBeDefined() })
  it('supports --user-id filter', () => { expect(ExpensesList.flags['user-id']).toBeDefined() })
  it('supports --category-id filter', () => { expect(ExpensesList.flags['category-id']).toBeDefined() })
})

describe('expense expenses create', () => {
  it('has correct command id', () => { expect(ExpensesCreate.id).toBe('expense expenses create') })
  it('requires --data flag', () => { expect(ExpensesCreate.flags.data.required).toBe(true) })
  it('supports --dry-run flag', () => { expect(ExpensesCreate.flags['dry-run']).toBeDefined() })
})

describe('expense expenses update', () => {
  it('has correct command id', () => { expect(ExpensesUpdate.id).toBe('expense expenses update') })
  it('requires id arg', () => { expect(ExpensesUpdate.args.id.required).toBe(true) })
  it('requires --data flag', () => { expect(ExpensesUpdate.flags.data.required).toBe(true) })
  it('supports --dry-run flag', () => { expect(ExpensesUpdate.flags['dry-run']).toBeDefined() })
})

describe('expense expenses merge', () => {
  it('has correct command id', () => { expect(ExpensesMerge.id).toBe('expense expenses merge') })
  it('requires id arg', () => { expect(ExpensesMerge.args.id.required).toBe(true) })
  it('requires --data flag', () => { expect(ExpensesMerge.flags.data.required).toBe(true) })
  it('supports --dry-run flag', () => { expect(ExpensesMerge.flags['dry-run']).toBeDefined() })
})
