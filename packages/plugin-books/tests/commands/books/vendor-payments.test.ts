import { describe, it, expect } from 'vitest'
import VendorPaymentsList from '../../../src/commands/books/vendor-payments/list.js'
import VendorPaymentsGet from '../../../src/commands/books/vendor-payments/get.js'
import VendorPaymentsCreate from '../../../src/commands/books/vendor-payments/create.js'
import VendorPaymentsUpdate from '../../../src/commands/books/vendor-payments/update.js'
import VendorPaymentsDelete from '../../../src/commands/books/vendor-payments/delete.js'

describe('books vendor-payments list', () => {
  it('has correct command id', () => { expect(VendorPaymentsList.id).toBe('books vendor-payments list') })
  it('supports --page flag', () => { expect(VendorPaymentsList.flags.page).toBeDefined() })
  it('supports --per-page flag', () => { expect(VendorPaymentsList.flags['per-page']).toBeDefined() })
  it('supports --vendor-id filter', () => { expect(VendorPaymentsList.flags['vendor-id']).toBeDefined() })
})

describe('books vendor-payments get', () => {
  it('has correct command id', () => { expect(VendorPaymentsGet.id).toBe('books vendor-payments get') })
  it('requires id arg', () => { expect(VendorPaymentsGet.args.id.required).toBe(true) })
})

describe('books vendor-payments create', () => {
  it('has correct command id', () => { expect(VendorPaymentsCreate.id).toBe('books vendor-payments create') })
  it('requires --data flag', () => { expect(VendorPaymentsCreate.flags.data.required).toBe(true) })
  it('supports --dry-run flag', () => { expect(VendorPaymentsCreate.flags['dry-run']).toBeDefined() })
})

describe('books vendor-payments update', () => {
  it('has correct command id', () => { expect(VendorPaymentsUpdate.id).toBe('books vendor-payments update') })
  it('requires id arg', () => { expect(VendorPaymentsUpdate.args.id.required).toBe(true) })
  it('requires --data flag', () => { expect(VendorPaymentsUpdate.flags.data.required).toBe(true) })
  it('supports --dry-run flag', () => { expect(VendorPaymentsUpdate.flags['dry-run']).toBeDefined() })
})

describe('books vendor-payments delete', () => {
  it('has correct command id', () => { expect(VendorPaymentsDelete.id).toBe('books vendor-payments delete') })
  it('requires id arg', () => { expect(VendorPaymentsDelete.args.id.required).toBe(true) })
  it('supports --dry-run flag', () => { expect(VendorPaymentsDelete.flags['dry-run']).toBeDefined() })
})
