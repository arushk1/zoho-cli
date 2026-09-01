import { describe, it, expect } from 'vitest'
import PaymentsCustomersCreate from '../../../src/commands/payments/customers/create.js'
import PaymentsCustomersGet from '../../../src/commands/payments/customers/get.js'

describe('payments customers create', () => {
  it('has correct command id', () => { expect(PaymentsCustomersCreate.id).toBe('payments customers create') })
  it('requires --data flag', () => { expect(PaymentsCustomersCreate.flags.data.required).toBe(true) })
  it('supports --dry-run flag', () => { expect(PaymentsCustomersCreate.flags['dry-run']).toBeDefined() })
})

describe('payments customers get', () => {
  it('has correct command id', () => { expect(PaymentsCustomersGet.id).toBe('payments customers get') })
  it('requires id arg', () => { expect(PaymentsCustomersGet.args.id.required).toBe(true) })
})
