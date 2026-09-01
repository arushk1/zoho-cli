import { describe, it, expect } from 'vitest'
import PaymentsPayoutsGet from '../../../src/commands/payments/payouts/get.js'
import PaymentsPayoutsList from '../../../src/commands/payments/payouts/list.js'

describe('payments payouts get', () => {
  it('has correct command id', () => { expect(PaymentsPayoutsGet.id).toBe('payments payouts get') })
  it('requires id arg', () => { expect(PaymentsPayoutsGet.args.id.required).toBe(true) })
})

describe('payments payouts list', () => {
  it('has correct command id', () => { expect(PaymentsPayoutsList.id).toBe('payments payouts list') })
  it('supports --page flag', () => { expect(PaymentsPayoutsList.flags.page).toBeDefined() })
  it('supports --per-page flag', () => { expect(PaymentsPayoutsList.flags['per-page']).toBeDefined() })
})
