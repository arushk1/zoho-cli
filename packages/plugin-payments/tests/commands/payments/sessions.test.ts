import { describe, it, expect } from 'vitest'
import PaymentsSessionsCreate from '../../../src/commands/payments/sessions/create.js'
import PaymentsSessionsGet from '../../../src/commands/payments/sessions/get.js'

describe('payments sessions create', () => {
  it('has correct command id', () => { expect(PaymentsSessionsCreate.id).toBe('payments sessions create') })
  it('requires --data flag', () => { expect(PaymentsSessionsCreate.flags.data.required).toBe(true) })
  it('supports --dry-run flag', () => { expect(PaymentsSessionsCreate.flags['dry-run']).toBeDefined() })
})

describe('payments sessions get', () => {
  it('has correct command id', () => { expect(PaymentsSessionsGet.id).toBe('payments sessions get') })
  it('requires id arg', () => { expect(PaymentsSessionsGet.args.id.required).toBe(true) })
})
