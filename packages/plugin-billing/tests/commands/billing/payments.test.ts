import { describe, it, expect } from 'vitest'
import BillingPaymentsCreate from '../../../src/commands/billing/payments/create.js'
import BillingPaymentsDelete from '../../../src/commands/billing/payments/delete.js'
import BillingPaymentsGet from '../../../src/commands/billing/payments/get.js'
import BillingPaymentsList from '../../../src/commands/billing/payments/list.js'
import BillingPaymentsUpdate from '../../../src/commands/billing/payments/update.js'

describe('billing payments create', () => {
  it('has correct command id', () => { expect(BillingPaymentsCreate.id).toBe('billing payments create') })
  it('requires --data flag', () => { expect(BillingPaymentsCreate.flags.data.required).toBe(true) })
  it('supports --dry-run flag', () => { expect(BillingPaymentsCreate.flags['dry-run']).toBeDefined() })
})

describe('billing payments delete', () => {
  it('has correct command id', () => { expect(BillingPaymentsDelete.id).toBe('billing payments delete') })
  it('requires id arg', () => { expect(BillingPaymentsDelete.args.id.required).toBe(true) })
  it('supports --dry-run flag', () => { expect(BillingPaymentsDelete.flags['dry-run']).toBeDefined() })
})

describe('billing payments get', () => {
  it('has correct command id', () => { expect(BillingPaymentsGet.id).toBe('billing payments get') })
  it('requires id arg', () => { expect(BillingPaymentsGet.args.id.required).toBe(true) })
})

describe('billing payments list', () => {
  it('has correct command id', () => { expect(BillingPaymentsList.id).toBe('billing payments list') })
  it('supports --page flag', () => { expect(BillingPaymentsList.flags.page).toBeDefined() })
  it('supports --per-page flag', () => { expect(BillingPaymentsList.flags['per-page']).toBeDefined() })
})

describe('billing payments update', () => {
  it('has correct command id', () => { expect(BillingPaymentsUpdate.id).toBe('billing payments update') })
  it('requires id arg', () => { expect(BillingPaymentsUpdate.args.id.required).toBe(true) })
  it('requires --data flag', () => { expect(BillingPaymentsUpdate.flags.data.required).toBe(true) })
  it('supports --dry-run flag', () => { expect(BillingPaymentsUpdate.flags['dry-run']).toBeDefined() })
})
