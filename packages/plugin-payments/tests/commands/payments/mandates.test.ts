import { describe, it, expect } from 'vitest'
import PaymentsMandatesExecute from '../../../src/commands/payments/mandates/execute.js'
import PaymentsMandatesGet from '../../../src/commands/payments/mandates/get.js'
import PaymentsMandatesNotify from '../../../src/commands/payments/mandates/notify.js'

describe('payments mandates execute', () => {
  it('has correct command id', () => { expect(PaymentsMandatesExecute.id).toBe('payments mandates execute') })
  it('requires --data flag', () => { expect(PaymentsMandatesExecute.flags.data.required).toBe(true) })
  it('supports --dry-run flag', () => { expect(PaymentsMandatesExecute.flags['dry-run']).toBeDefined() })
})

describe('payments mandates get', () => {
  it('has correct command id', () => { expect(PaymentsMandatesGet.id).toBe('payments mandates get') })
  it('requires id arg', () => { expect(PaymentsMandatesGet.args.id.required).toBe(true) })
})

describe('payments mandates notify', () => {
  it('has correct command id', () => { expect(PaymentsMandatesNotify.id).toBe('payments mandates notify') })
  it('requires --data flag', () => { expect(PaymentsMandatesNotify.flags.data.required).toBe(true) })
  it('supports --dry-run flag', () => { expect(PaymentsMandatesNotify.flags['dry-run']).toBeDefined() })
})
