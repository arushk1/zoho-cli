import { describe, it, expect } from 'vitest'
import CustomerPaymentsList from '../../../src/commands/books/customer-payments/list.js'
import CustomerPaymentsGet from '../../../src/commands/books/customer-payments/get.js'
import CustomerPaymentsCreate from '../../../src/commands/books/customer-payments/create.js'
import CustomerPaymentsUpdate from '../../../src/commands/books/customer-payments/update.js'
import CustomerPaymentsDelete from '../../../src/commands/books/customer-payments/delete.js'

describe('books customer-payments list', () => {
  it('has correct command id', () => { expect(CustomerPaymentsList.id).toBe('books customer-payments list') })
  it('supports --page flag', () => { expect(CustomerPaymentsList.flags.page).toBeDefined() })
  it('supports --per-page flag', () => { expect(CustomerPaymentsList.flags['per-page']).toBeDefined() })
  it('supports --customer-id filter', () => { expect(CustomerPaymentsList.flags['customer-id']).toBeDefined() })
})

describe('books customer-payments get', () => {
  it('has correct command id', () => { expect(CustomerPaymentsGet.id).toBe('books customer-payments get') })
  it('requires id arg', () => { expect(CustomerPaymentsGet.args.id.required).toBe(true) })
})

describe('books customer-payments create', () => {
  it('has correct command id', () => { expect(CustomerPaymentsCreate.id).toBe('books customer-payments create') })
  it('requires --data flag', () => { expect(CustomerPaymentsCreate.flags.data.required).toBe(true) })
  it('supports --dry-run flag', () => { expect(CustomerPaymentsCreate.flags['dry-run']).toBeDefined() })
})

describe('books customer-payments update', () => {
  it('has correct command id', () => { expect(CustomerPaymentsUpdate.id).toBe('books customer-payments update') })
  it('requires id arg', () => { expect(CustomerPaymentsUpdate.args.id.required).toBe(true) })
  it('requires --data flag', () => { expect(CustomerPaymentsUpdate.flags.data.required).toBe(true) })
  it('supports --dry-run flag', () => { expect(CustomerPaymentsUpdate.flags['dry-run']).toBeDefined() })
})

describe('books customer-payments delete', () => {
  it('has correct command id', () => { expect(CustomerPaymentsDelete.id).toBe('books customer-payments delete') })
  it('requires id arg', () => { expect(CustomerPaymentsDelete.args.id.required).toBe(true) })
  it('supports --dry-run flag', () => { expect(CustomerPaymentsDelete.flags['dry-run']).toBeDefined() })
})
