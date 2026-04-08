import { describe, it, expect } from 'vitest'
import CustomersList from '../../../src/commands/expense/customers/list.js'
import CustomersGet from '../../../src/commands/expense/customers/get.js'
import CustomersCreate from '../../../src/commands/expense/customers/create.js'
import CustomersUpdate from '../../../src/commands/expense/customers/update.js'
import CustomersDelete from '../../../src/commands/expense/customers/delete.js'

describe('expense customers list', () => {
  it('has correct command id', () => { expect(CustomersList.id).toBe('expense customers list') })
  it('supports --page flag', () => { expect(CustomersList.flags.page).toBeDefined() })
  it('supports --per-page flag', () => { expect(CustomersList.flags['per-page']).toBeDefined() })
})

describe('expense customers get', () => {
  it('has correct command id', () => { expect(CustomersGet.id).toBe('expense customers get') })
  it('requires id arg', () => { expect(CustomersGet.args.id.required).toBe(true) })
})

describe('expense customers create', () => {
  it('has correct command id', () => { expect(CustomersCreate.id).toBe('expense customers create') })
  it('requires --data flag', () => { expect(CustomersCreate.flags.data.required).toBe(true) })
  it('supports --dry-run flag', () => { expect(CustomersCreate.flags['dry-run']).toBeDefined() })
})

describe('expense customers update', () => {
  it('has correct command id', () => { expect(CustomersUpdate.id).toBe('expense customers update') })
  it('requires id arg', () => { expect(CustomersUpdate.args.id.required).toBe(true) })
  it('requires --data flag', () => { expect(CustomersUpdate.flags.data.required).toBe(true) })
  it('supports --dry-run flag', () => { expect(CustomersUpdate.flags['dry-run']).toBeDefined() })
})

describe('expense customers delete', () => {
  it('has correct command id', () => { expect(CustomersDelete.id).toBe('expense customers delete') })
  it('requires id arg', () => { expect(CustomersDelete.args.id.required).toBe(true) })
  it('supports --dry-run flag', () => { expect(CustomersDelete.flags['dry-run']).toBeDefined() })
})
