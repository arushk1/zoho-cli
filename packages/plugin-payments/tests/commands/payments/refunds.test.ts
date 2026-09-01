import { describe, it, expect } from 'vitest'
import PaymentsRefundsCreate from '../../../src/commands/payments/refunds/create.js'
import PaymentsRefundsGet from '../../../src/commands/payments/refunds/get.js'

describe('payments refunds create', () => {
  it('has correct command id', () => { expect(PaymentsRefundsCreate.id).toBe('payments refunds create') })
  it('requires id arg', () => { expect(PaymentsRefundsCreate.args.id.required).toBe(true) })
  it('requires --data flag', () => { expect(PaymentsRefundsCreate.flags.data.required).toBe(true) })
  it('supports --dry-run flag', () => { expect(PaymentsRefundsCreate.flags['dry-run']).toBeDefined() })
})

describe('payments refunds get', () => {
  it('has correct command id', () => { expect(PaymentsRefundsGet.id).toBe('payments refunds get') })
  it('requires id arg', () => { expect(PaymentsRefundsGet.args.id.required).toBe(true) })
})
