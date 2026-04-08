import { describe, it, expect } from 'vitest'
import InvoicesList from '../../../src/commands/books/invoices/list.js'
import InvoicesGet from '../../../src/commands/books/invoices/get.js'
import InvoicesCreate from '../../../src/commands/books/invoices/create.js'
import InvoicesUpdate from '../../../src/commands/books/invoices/update.js'
import InvoicesDelete from '../../../src/commands/books/invoices/delete.js'
import InvoicesSend from '../../../src/commands/books/invoices/send.js'
import InvoicesVoid from '../../../src/commands/books/invoices/void.js'
import InvoicesDraft from '../../../src/commands/books/invoices/draft.js'
import InvoicesApprove from '../../../src/commands/books/invoices/approve.js'

describe('books invoices list', () => {
  it('has correct command id', () => { expect(InvoicesList.id).toBe('books invoices list') })
  it('supports --page flag', () => { expect(InvoicesList.flags.page).toBeDefined() })
  it('supports --per-page flag', () => { expect(InvoicesList.flags['per-page']).toBeDefined() })
  it('supports --status filter', () => { expect(InvoicesList.flags.status).toBeDefined() })
  it('supports --customer-id filter', () => { expect(InvoicesList.flags['customer-id']).toBeDefined() })
})

describe('books invoices get', () => {
  it('has correct command id', () => { expect(InvoicesGet.id).toBe('books invoices get') })
  it('requires id arg', () => { expect(InvoicesGet.args.id.required).toBe(true) })
})

describe('books invoices create', () => {
  it('has correct command id', () => { expect(InvoicesCreate.id).toBe('books invoices create') })
  it('requires --data flag', () => { expect(InvoicesCreate.flags.data.required).toBe(true) })
  it('supports --dry-run flag', () => { expect(InvoicesCreate.flags['dry-run']).toBeDefined() })
})

describe('books invoices update', () => {
  it('has correct command id', () => { expect(InvoicesUpdate.id).toBe('books invoices update') })
  it('requires id arg', () => { expect(InvoicesUpdate.args.id.required).toBe(true) })
  it('requires --data flag', () => { expect(InvoicesUpdate.flags.data.required).toBe(true) })
  it('supports --dry-run flag', () => { expect(InvoicesUpdate.flags['dry-run']).toBeDefined() })
})

describe('books invoices delete', () => {
  it('has correct command id', () => { expect(InvoicesDelete.id).toBe('books invoices delete') })
  it('requires id arg', () => { expect(InvoicesDelete.args.id.required).toBe(true) })
  it('supports --dry-run flag', () => { expect(InvoicesDelete.flags['dry-run']).toBeDefined() })
})

describe('books invoices send', () => {
  it('has correct command id', () => { expect(InvoicesSend.id).toBe('books invoices send') })
  it('requires id arg', () => { expect(InvoicesSend.args.id.required).toBe(true) })
  it('supports optional --data flag', () => { expect(InvoicesSend.flags.data).toBeDefined() })
  it('supports --dry-run flag', () => { expect(InvoicesSend.flags['dry-run']).toBeDefined() })
})

describe('books invoices void', () => {
  it('has correct command id', () => { expect(InvoicesVoid.id).toBe('books invoices void') })
  it('requires id arg', () => { expect(InvoicesVoid.args.id.required).toBe(true) })
  it('supports --dry-run flag', () => { expect(InvoicesVoid.flags['dry-run']).toBeDefined() })
})

describe('books invoices draft', () => {
  it('has correct command id', () => { expect(InvoicesDraft.id).toBe('books invoices draft') })
  it('requires id arg', () => { expect(InvoicesDraft.args.id.required).toBe(true) })
  it('supports --dry-run flag', () => { expect(InvoicesDraft.flags['dry-run']).toBeDefined() })
})

describe('books invoices approve', () => {
  it('has correct command id', () => { expect(InvoicesApprove.id).toBe('books invoices approve') })
  it('requires id arg', () => { expect(InvoicesApprove.args.id.required).toBe(true) })
  it('supports --dry-run flag', () => { expect(InvoicesApprove.flags['dry-run']).toBeDefined() })
})
