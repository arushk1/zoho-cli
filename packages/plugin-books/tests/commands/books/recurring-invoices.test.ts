import { describe, it, expect } from 'vitest'
import RecurringInvoicesList from '../../../src/commands/books/recurring-invoices/list.js'
import RecurringInvoicesGet from '../../../src/commands/books/recurring-invoices/get.js'
import RecurringInvoicesCreate from '../../../src/commands/books/recurring-invoices/create.js'
import RecurringInvoicesUpdate from '../../../src/commands/books/recurring-invoices/update.js'
import RecurringInvoicesDelete from '../../../src/commands/books/recurring-invoices/delete.js'
import RecurringInvoicesStop from '../../../src/commands/books/recurring-invoices/stop.js'
import RecurringInvoicesResume from '../../../src/commands/books/recurring-invoices/resume.js'

describe('books recurring-invoices list', () => {
  it('has correct command id', () => { expect(RecurringInvoicesList.id).toBe('books recurring-invoices list') })
  it('supports --page flag', () => { expect(RecurringInvoicesList.flags.page).toBeDefined() })
  it('supports --per-page flag', () => { expect(RecurringInvoicesList.flags['per-page']).toBeDefined() })
  it('supports --status filter', () => { expect(RecurringInvoicesList.flags.status).toBeDefined() })
  it('supports --customer-id filter', () => { expect(RecurringInvoicesList.flags['customer-id']).toBeDefined() })
})

describe('books recurring-invoices get', () => {
  it('has correct command id', () => { expect(RecurringInvoicesGet.id).toBe('books recurring-invoices get') })
  it('requires id arg', () => { expect(RecurringInvoicesGet.args.id.required).toBe(true) })
})

describe('books recurring-invoices create', () => {
  it('has correct command id', () => { expect(RecurringInvoicesCreate.id).toBe('books recurring-invoices create') })
  it('requires --data flag', () => { expect(RecurringInvoicesCreate.flags.data.required).toBe(true) })
  it('supports --dry-run flag', () => { expect(RecurringInvoicesCreate.flags['dry-run']).toBeDefined() })
})

describe('books recurring-invoices update', () => {
  it('has correct command id', () => { expect(RecurringInvoicesUpdate.id).toBe('books recurring-invoices update') })
  it('requires id arg', () => { expect(RecurringInvoicesUpdate.args.id.required).toBe(true) })
  it('requires --data flag', () => { expect(RecurringInvoicesUpdate.flags.data.required).toBe(true) })
  it('supports --dry-run flag', () => { expect(RecurringInvoicesUpdate.flags['dry-run']).toBeDefined() })
})

describe('books recurring-invoices delete', () => {
  it('has correct command id', () => { expect(RecurringInvoicesDelete.id).toBe('books recurring-invoices delete') })
  it('requires id arg', () => { expect(RecurringInvoicesDelete.args.id.required).toBe(true) })
  it('supports --dry-run flag', () => { expect(RecurringInvoicesDelete.flags['dry-run']).toBeDefined() })
})

describe('books recurring-invoices stop', () => {
  it('has correct command id', () => { expect(RecurringInvoicesStop.id).toBe('books recurring-invoices stop') })
  it('requires id arg', () => { expect(RecurringInvoicesStop.args.id.required).toBe(true) })
  it('supports --dry-run flag', () => { expect(RecurringInvoicesStop.flags['dry-run']).toBeDefined() })
})

describe('books recurring-invoices resume', () => {
  it('has correct command id', () => { expect(RecurringInvoicesResume.id).toBe('books recurring-invoices resume') })
  it('requires id arg', () => { expect(RecurringInvoicesResume.args.id.required).toBe(true) })
  it('supports --dry-run flag', () => { expect(RecurringInvoicesResume.flags['dry-run']).toBeDefined() })
})
