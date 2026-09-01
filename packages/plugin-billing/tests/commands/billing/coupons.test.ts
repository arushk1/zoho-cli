import { describe, it, expect } from 'vitest'
import BillingCouponsCreate from '../../../src/commands/billing/coupons/create.js'
import BillingCouponsDelete from '../../../src/commands/billing/coupons/delete.js'
import BillingCouponsGet from '../../../src/commands/billing/coupons/get.js'
import BillingCouponsList from '../../../src/commands/billing/coupons/list.js'
import BillingCouponsUpdate from '../../../src/commands/billing/coupons/update.js'

describe('billing coupons create', () => {
  it('has correct command id', () => { expect(BillingCouponsCreate.id).toBe('billing coupons create') })
  it('requires --data flag', () => { expect(BillingCouponsCreate.flags.data.required).toBe(true) })
  it('supports --dry-run flag', () => { expect(BillingCouponsCreate.flags['dry-run']).toBeDefined() })
})

describe('billing coupons delete', () => {
  it('has correct command id', () => { expect(BillingCouponsDelete.id).toBe('billing coupons delete') })
  it('requires id arg', () => { expect(BillingCouponsDelete.args.id.required).toBe(true) })
  it('supports --dry-run flag', () => { expect(BillingCouponsDelete.flags['dry-run']).toBeDefined() })
})

describe('billing coupons get', () => {
  it('has correct command id', () => { expect(BillingCouponsGet.id).toBe('billing coupons get') })
  it('requires id arg', () => { expect(BillingCouponsGet.args.id.required).toBe(true) })
})

describe('billing coupons list', () => {
  it('has correct command id', () => { expect(BillingCouponsList.id).toBe('billing coupons list') })
  it('supports --page flag', () => { expect(BillingCouponsList.flags.page).toBeDefined() })
  it('supports --per-page flag', () => { expect(BillingCouponsList.flags['per-page']).toBeDefined() })
})

describe('billing coupons update', () => {
  it('has correct command id', () => { expect(BillingCouponsUpdate.id).toBe('billing coupons update') })
  it('requires id arg', () => { expect(BillingCouponsUpdate.args.id.required).toBe(true) })
  it('requires --data flag', () => { expect(BillingCouponsUpdate.flags.data.required).toBe(true) })
  it('supports --dry-run flag', () => { expect(BillingCouponsUpdate.flags['dry-run']).toBeDefined() })
})
