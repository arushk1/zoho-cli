import { describe, it, expect } from 'vitest'
import BillingInvoicesGet from '../../../src/commands/billing/invoices/get.js'
import BillingInvoicesList from '../../../src/commands/billing/invoices/list.js'
import BillingInvoicesSend from '../../../src/commands/billing/invoices/send.js'
import BillingInvoicesVoid from '../../../src/commands/billing/invoices/void.js'
import BillingInvoicesWriteOff from '../../../src/commands/billing/invoices/write-off.js'

describe('billing invoices get', () => {
  it('has correct command id', () => { expect(BillingInvoicesGet.id).toBe('billing invoices get') })
  it('requires id arg', () => { expect(BillingInvoicesGet.args.id.required).toBe(true) })
})

describe('billing invoices list', () => {
  it('has correct command id', () => { expect(BillingInvoicesList.id).toBe('billing invoices list') })
  it('supports --page flag', () => { expect(BillingInvoicesList.flags.page).toBeDefined() })
  it('supports --per-page flag', () => { expect(BillingInvoicesList.flags['per-page']).toBeDefined() })
})

describe('billing invoices send', () => {
  it('has correct command id', () => { expect(BillingInvoicesSend.id).toBe('billing invoices send') })
  it('requires id arg', () => { expect(BillingInvoicesSend.args.id.required).toBe(true) })
  it('supports optional --data flag', () => { expect(BillingInvoicesSend.flags.data).toBeDefined() })
  it('supports --dry-run flag', () => { expect(BillingInvoicesSend.flags['dry-run']).toBeDefined() })
})

describe('billing invoices void', () => {
  it('has correct command id', () => { expect(BillingInvoicesVoid.id).toBe('billing invoices void') })
  it('requires id arg', () => { expect(BillingInvoicesVoid.args.id.required).toBe(true) })
  it('supports --dry-run flag', () => { expect(BillingInvoicesVoid.flags['dry-run']).toBeDefined() })
})

describe('billing invoices write-off', () => {
  it('has correct command id', () => { expect(BillingInvoicesWriteOff.id).toBe('billing invoices write-off') })
  it('requires id arg', () => { expect(BillingInvoicesWriteOff.args.id.required).toBe(true) })
  it('supports --dry-run flag', () => { expect(BillingInvoicesWriteOff.flags['dry-run']).toBeDefined() })
})
