import { describe, it, expect } from 'vitest'
import PaymentsPaymentLinksCancel from '../../../src/commands/payments/payment-links/cancel.js'
import PaymentsPaymentLinksCreate from '../../../src/commands/payments/payment-links/create.js'
import PaymentsPaymentLinksGet from '../../../src/commands/payments/payment-links/get.js'
import PaymentsPaymentLinksUpdate from '../../../src/commands/payments/payment-links/update.js'

describe('payments payment-links cancel', () => {
  it('has correct command id', () => { expect(PaymentsPaymentLinksCancel.id).toBe('payments payment-links cancel') })
  it('requires id arg', () => { expect(PaymentsPaymentLinksCancel.args.id.required).toBe(true) })
  it('supports --dry-run flag', () => { expect(PaymentsPaymentLinksCancel.flags['dry-run']).toBeDefined() })
})

describe('payments payment-links create', () => {
  it('has correct command id', () => { expect(PaymentsPaymentLinksCreate.id).toBe('payments payment-links create') })
  it('requires --data flag', () => { expect(PaymentsPaymentLinksCreate.flags.data.required).toBe(true) })
  it('supports --dry-run flag', () => { expect(PaymentsPaymentLinksCreate.flags['dry-run']).toBeDefined() })
})

describe('payments payment-links get', () => {
  it('has correct command id', () => { expect(PaymentsPaymentLinksGet.id).toBe('payments payment-links get') })
  it('requires id arg', () => { expect(PaymentsPaymentLinksGet.args.id.required).toBe(true) })
})

describe('payments payment-links update', () => {
  it('has correct command id', () => { expect(PaymentsPaymentLinksUpdate.id).toBe('payments payment-links update') })
  it('requires id arg', () => { expect(PaymentsPaymentLinksUpdate.args.id.required).toBe(true) })
  it('requires --data flag', () => { expect(PaymentsPaymentLinksUpdate.flags.data.required).toBe(true) })
  it('supports --dry-run flag', () => { expect(PaymentsPaymentLinksUpdate.flags['dry-run']).toBeDefined() })
})
