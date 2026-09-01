import { describe, it, expect } from 'vitest'
import BillingCreditNotesApply from '../../../src/commands/billing/credit-notes/apply.js'
import BillingCreditNotesCreate from '../../../src/commands/billing/credit-notes/create.js'
import BillingCreditNotesGet from '../../../src/commands/billing/credit-notes/get.js'
import BillingCreditNotesVoid from '../../../src/commands/billing/credit-notes/void.js'

describe('billing credit-notes apply', () => {
  it('has correct command id', () => { expect(BillingCreditNotesApply.id).toBe('billing credit-notes apply') })
  it('requires id arg', () => { expect(BillingCreditNotesApply.args.id.required).toBe(true) })
  it('supports optional --data flag', () => { expect(BillingCreditNotesApply.flags.data).toBeDefined() })
  it('supports --dry-run flag', () => { expect(BillingCreditNotesApply.flags['dry-run']).toBeDefined() })
})

describe('billing credit-notes create', () => {
  it('has correct command id', () => { expect(BillingCreditNotesCreate.id).toBe('billing credit-notes create') })
  it('requires --data flag', () => { expect(BillingCreditNotesCreate.flags.data.required).toBe(true) })
  it('supports --dry-run flag', () => { expect(BillingCreditNotesCreate.flags['dry-run']).toBeDefined() })
})

describe('billing credit-notes get', () => {
  it('has correct command id', () => { expect(BillingCreditNotesGet.id).toBe('billing credit-notes get') })
  it('requires id arg', () => { expect(BillingCreditNotesGet.args.id.required).toBe(true) })
})

describe('billing credit-notes void', () => {
  it('has correct command id', () => { expect(BillingCreditNotesVoid.id).toBe('billing credit-notes void') })
  it('requires id arg', () => { expect(BillingCreditNotesVoid.args.id.required).toBe(true) })
  it('supports --dry-run flag', () => { expect(BillingCreditNotesVoid.flags['dry-run']).toBeDefined() })
})
