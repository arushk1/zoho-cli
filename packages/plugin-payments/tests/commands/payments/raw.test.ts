import { describe, it, expect } from 'vitest'
import PaymentsRawGet from '../../../src/commands/payments/raw/get.js'

describe('payments raw get', () => {
  it('has correct command id', () => { expect(PaymentsRawGet.id).toBe('payments raw get') })
  it('requires path arg', () => { expect(PaymentsRawGet.args.path.required).toBe(true) })
})
