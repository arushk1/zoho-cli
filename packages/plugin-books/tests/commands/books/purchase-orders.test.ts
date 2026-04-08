import { describe, it, expect } from 'vitest'
import PurchaseOrdersList from '../../../src/commands/books/purchase-orders/list.js'
import PurchaseOrdersGet from '../../../src/commands/books/purchase-orders/get.js'
import PurchaseOrdersCreate from '../../../src/commands/books/purchase-orders/create.js'
import PurchaseOrdersUpdate from '../../../src/commands/books/purchase-orders/update.js'
import PurchaseOrdersDelete from '../../../src/commands/books/purchase-orders/delete.js'
import PurchaseOrdersOpen from '../../../src/commands/books/purchase-orders/open.js'
import PurchaseOrdersBilled from '../../../src/commands/books/purchase-orders/billed.js'
import PurchaseOrdersCancel from '../../../src/commands/books/purchase-orders/cancel.js'
import PurchaseOrdersApprove from '../../../src/commands/books/purchase-orders/approve.js'
import PurchaseOrdersReject from '../../../src/commands/books/purchase-orders/reject.js'

describe('books purchase-orders list', () => {
  it('has correct command id', () => { expect(PurchaseOrdersList.id).toBe('books purchase-orders list') })
  it('supports --page flag', () => { expect(PurchaseOrdersList.flags.page).toBeDefined() })
  it('supports --per-page flag', () => { expect(PurchaseOrdersList.flags['per-page']).toBeDefined() })
  it('supports --status filter', () => { expect(PurchaseOrdersList.flags.status).toBeDefined() })
  it('supports --vendor-id filter', () => { expect(PurchaseOrdersList.flags['vendor-id']).toBeDefined() })
})

describe('books purchase-orders get', () => {
  it('has correct command id', () => { expect(PurchaseOrdersGet.id).toBe('books purchase-orders get') })
  it('requires id arg', () => { expect(PurchaseOrdersGet.args.id.required).toBe(true) })
})

describe('books purchase-orders create', () => {
  it('has correct command id', () => { expect(PurchaseOrdersCreate.id).toBe('books purchase-orders create') })
  it('requires --data flag', () => { expect(PurchaseOrdersCreate.flags.data.required).toBe(true) })
  it('supports --dry-run flag', () => { expect(PurchaseOrdersCreate.flags['dry-run']).toBeDefined() })
})

describe('books purchase-orders update', () => {
  it('has correct command id', () => { expect(PurchaseOrdersUpdate.id).toBe('books purchase-orders update') })
  it('requires id arg', () => { expect(PurchaseOrdersUpdate.args.id.required).toBe(true) })
  it('requires --data flag', () => { expect(PurchaseOrdersUpdate.flags.data.required).toBe(true) })
  it('supports --dry-run flag', () => { expect(PurchaseOrdersUpdate.flags['dry-run']).toBeDefined() })
})

describe('books purchase-orders delete', () => {
  it('has correct command id', () => { expect(PurchaseOrdersDelete.id).toBe('books purchase-orders delete') })
  it('requires id arg', () => { expect(PurchaseOrdersDelete.args.id.required).toBe(true) })
  it('supports --dry-run flag', () => { expect(PurchaseOrdersDelete.flags['dry-run']).toBeDefined() })
})

describe('books purchase-orders open', () => {
  it('has correct command id', () => { expect(PurchaseOrdersOpen.id).toBe('books purchase-orders open') })
  it('requires id arg', () => { expect(PurchaseOrdersOpen.args.id.required).toBe(true) })
  it('supports --dry-run flag', () => { expect(PurchaseOrdersOpen.flags['dry-run']).toBeDefined() })
})

describe('books purchase-orders billed', () => {
  it('has correct command id', () => { expect(PurchaseOrdersBilled.id).toBe('books purchase-orders billed') })
  it('requires id arg', () => { expect(PurchaseOrdersBilled.args.id.required).toBe(true) })
  it('supports --dry-run flag', () => { expect(PurchaseOrdersBilled.flags['dry-run']).toBeDefined() })
})

describe('books purchase-orders cancel', () => {
  it('has correct command id', () => { expect(PurchaseOrdersCancel.id).toBe('books purchase-orders cancel') })
  it('requires id arg', () => { expect(PurchaseOrdersCancel.args.id.required).toBe(true) })
  it('supports --dry-run flag', () => { expect(PurchaseOrdersCancel.flags['dry-run']).toBeDefined() })
})

describe('books purchase-orders approve', () => {
  it('has correct command id', () => { expect(PurchaseOrdersApprove.id).toBe('books purchase-orders approve') })
  it('requires id arg', () => { expect(PurchaseOrdersApprove.args.id.required).toBe(true) })
  it('supports --dry-run flag', () => { expect(PurchaseOrdersApprove.flags['dry-run']).toBeDefined() })
})

describe('books purchase-orders reject', () => {
  it('has correct command id', () => { expect(PurchaseOrdersReject.id).toBe('books purchase-orders reject') })
  it('requires id arg', () => { expect(PurchaseOrdersReject.args.id.required).toBe(true) })
  it('supports --dry-run flag', () => { expect(PurchaseOrdersReject.flags['dry-run']).toBeDefined() })
})
