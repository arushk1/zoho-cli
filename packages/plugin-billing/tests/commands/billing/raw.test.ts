import { describe, it, expect } from 'vitest'
import BillingRawGet from '../../../src/commands/billing/raw/get.js'

describe('billing raw get', () => {
  it('has correct command id', () => { expect(BillingRawGet.id).toBe('billing raw get') })
  it('requires path arg', () => { expect(BillingRawGet.args.path.required).toBe(true) })
})
