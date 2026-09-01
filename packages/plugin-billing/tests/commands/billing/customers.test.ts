import { describe, it, expect } from 'vitest'
import BillingCustomersCreate from '../../../src/commands/billing/customers/create.js'
import BillingCustomersDelete from '../../../src/commands/billing/customers/delete.js'
import BillingCustomersGet from '../../../src/commands/billing/customers/get.js'
import BillingCustomersList from '../../../src/commands/billing/customers/list.js'
import BillingCustomersUpdate from '../../../src/commands/billing/customers/update.js'

describe('billing customers create', () => {
  it('has correct command id', () => { expect(BillingCustomersCreate.id).toBe('billing customers create') })
  it('requires --data flag', () => { expect(BillingCustomersCreate.flags.data.required).toBe(true) })
  it('supports --dry-run flag', () => { expect(BillingCustomersCreate.flags['dry-run']).toBeDefined() })
})

describe('billing customers delete', () => {
  it('has correct command id', () => { expect(BillingCustomersDelete.id).toBe('billing customers delete') })
  it('requires id arg', () => { expect(BillingCustomersDelete.args.id.required).toBe(true) })
  it('supports --dry-run flag', () => { expect(BillingCustomersDelete.flags['dry-run']).toBeDefined() })
})

describe('billing customers get', () => {
  it('has correct command id', () => { expect(BillingCustomersGet.id).toBe('billing customers get') })
  it('requires id arg', () => { expect(BillingCustomersGet.args.id.required).toBe(true) })
})

describe('billing customers list', () => {
  it('has correct command id', () => { expect(BillingCustomersList.id).toBe('billing customers list') })
  it('supports --page flag', () => { expect(BillingCustomersList.flags.page).toBeDefined() })
  it('supports --per-page flag', () => { expect(BillingCustomersList.flags['per-page']).toBeDefined() })
})

describe('billing customers update', () => {
  it('has correct command id', () => { expect(BillingCustomersUpdate.id).toBe('billing customers update') })
  it('requires id arg', () => { expect(BillingCustomersUpdate.args.id.required).toBe(true) })
  it('requires --data flag', () => { expect(BillingCustomersUpdate.flags.data.required).toBe(true) })
  it('supports --dry-run flag', () => { expect(BillingCustomersUpdate.flags['dry-run']).toBeDefined() })
})
