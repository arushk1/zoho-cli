import { describe, it, expect } from 'vitest'
import PaymentsGet from '../../../src/commands/payments/get.js'
import PaymentsList from '../../../src/commands/payments/list.js'

describe('payments get', () => {
  it('has correct command id', () => { expect(PaymentsGet.id).toBe('payments get') })
  it('requires id arg', () => { expect(PaymentsGet.args.id.required).toBe(true) })
})

describe('payments list', () => {
  it('has correct command id', () => { expect(PaymentsList.id).toBe('payments list') })
  it('supports --page flag', () => { expect(PaymentsList.flags.page).toBeDefined() })
  it('supports --per-page flag', () => { expect(PaymentsList.flags['per-page']).toBeDefined() })
})
