import { describe, it, expect } from 'vitest'
import SalesOrdersList from '../../../src/commands/books/sales-orders/list.js'
import SalesOrdersGet from '../../../src/commands/books/sales-orders/get.js'
import SalesOrdersCreate from '../../../src/commands/books/sales-orders/create.js'
import SalesOrdersUpdate from '../../../src/commands/books/sales-orders/update.js'
import SalesOrdersDelete from '../../../src/commands/books/sales-orders/delete.js'
import SalesOrdersOpen from '../../../src/commands/books/sales-orders/open.js'
import SalesOrdersVoid from '../../../src/commands/books/sales-orders/void.js'
import SalesOrdersApprove from '../../../src/commands/books/sales-orders/approve.js'

describe('books sales-orders list', () => {
  it('has correct command id', () => { expect(SalesOrdersList.id).toBe('books sales-orders list') })
  it('supports --page flag', () => { expect(SalesOrdersList.flags.page).toBeDefined() })
  it('supports --per-page flag', () => { expect(SalesOrdersList.flags['per-page']).toBeDefined() })
  it('supports --status filter', () => { expect(SalesOrdersList.flags.status).toBeDefined() })
  it('supports --customer-id filter', () => { expect(SalesOrdersList.flags['customer-id']).toBeDefined() })
})

describe('books sales-orders get', () => {
  it('has correct command id', () => { expect(SalesOrdersGet.id).toBe('books sales-orders get') })
  it('requires id arg', () => { expect(SalesOrdersGet.args.id.required).toBe(true) })
})

describe('books sales-orders create', () => {
  it('has correct command id', () => { expect(SalesOrdersCreate.id).toBe('books sales-orders create') })
  it('requires --data flag', () => { expect(SalesOrdersCreate.flags.data.required).toBe(true) })
  it('supports --dry-run flag', () => { expect(SalesOrdersCreate.flags['dry-run']).toBeDefined() })
})

describe('books sales-orders update', () => {
  it('has correct command id', () => { expect(SalesOrdersUpdate.id).toBe('books sales-orders update') })
  it('requires id arg', () => { expect(SalesOrdersUpdate.args.id.required).toBe(true) })
  it('requires --data flag', () => { expect(SalesOrdersUpdate.flags.data.required).toBe(true) })
  it('supports --dry-run flag', () => { expect(SalesOrdersUpdate.flags['dry-run']).toBeDefined() })
})

describe('books sales-orders delete', () => {
  it('has correct command id', () => { expect(SalesOrdersDelete.id).toBe('books sales-orders delete') })
  it('requires id arg', () => { expect(SalesOrdersDelete.args.id.required).toBe(true) })
  it('supports --dry-run flag', () => { expect(SalesOrdersDelete.flags['dry-run']).toBeDefined() })
})

describe('books sales-orders open', () => {
  it('has correct command id', () => { expect(SalesOrdersOpen.id).toBe('books sales-orders open') })
  it('requires id arg', () => { expect(SalesOrdersOpen.args.id.required).toBe(true) })
  it('supports --dry-run flag', () => { expect(SalesOrdersOpen.flags['dry-run']).toBeDefined() })
})

describe('books sales-orders void', () => {
  it('has correct command id', () => { expect(SalesOrdersVoid.id).toBe('books sales-orders void') })
  it('requires id arg', () => { expect(SalesOrdersVoid.args.id.required).toBe(true) })
  it('supports --dry-run flag', () => { expect(SalesOrdersVoid.flags['dry-run']).toBeDefined() })
})

describe('books sales-orders approve', () => {
  it('has correct command id', () => { expect(SalesOrdersApprove.id).toBe('books sales-orders approve') })
  it('requires id arg', () => { expect(SalesOrdersApprove.args.id.required).toBe(true) })
  it('supports --dry-run flag', () => { expect(SalesOrdersApprove.flags['dry-run']).toBeDefined() })
})
