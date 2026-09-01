import { describe, it, expect } from 'vitest'
import BillingSubscriptionsCancel from '../../../src/commands/billing/subscriptions/cancel.js'
import BillingSubscriptionsCreate from '../../../src/commands/billing/subscriptions/create.js'
import BillingSubscriptionsGet from '../../../src/commands/billing/subscriptions/get.js'
import BillingSubscriptionsList from '../../../src/commands/billing/subscriptions/list.js'
import BillingSubscriptionsReactivate from '../../../src/commands/billing/subscriptions/reactivate.js'
import BillingSubscriptionsUpdate from '../../../src/commands/billing/subscriptions/update.js'

describe('billing subscriptions cancel', () => {
  it('has correct command id', () => { expect(BillingSubscriptionsCancel.id).toBe('billing subscriptions cancel') })
  it('requires id arg', () => { expect(BillingSubscriptionsCancel.args.id.required).toBe(true) })
  it('supports --dry-run flag', () => { expect(BillingSubscriptionsCancel.flags['dry-run']).toBeDefined() })
})

describe('billing subscriptions create', () => {
  it('has correct command id', () => { expect(BillingSubscriptionsCreate.id).toBe('billing subscriptions create') })
  it('supports optional --data flag', () => { expect(BillingSubscriptionsCreate.flags.data).toBeDefined() })
  it('supports --dry-run flag', () => { expect(BillingSubscriptionsCreate.flags['dry-run']).toBeDefined() })
})

describe('billing subscriptions get', () => {
  it('has correct command id', () => { expect(BillingSubscriptionsGet.id).toBe('billing subscriptions get') })
  it('requires id arg', () => { expect(BillingSubscriptionsGet.args.id.required).toBe(true) })
})

describe('billing subscriptions list', () => {
  it('has correct command id', () => { expect(BillingSubscriptionsList.id).toBe('billing subscriptions list') })
  it('supports --page flag', () => { expect(BillingSubscriptionsList.flags.page).toBeDefined() })
  it('supports --per-page flag', () => { expect(BillingSubscriptionsList.flags['per-page']).toBeDefined() })
})

describe('billing subscriptions reactivate', () => {
  it('has correct command id', () => { expect(BillingSubscriptionsReactivate.id).toBe('billing subscriptions reactivate') })
  it('requires id arg', () => { expect(BillingSubscriptionsReactivate.args.id.required).toBe(true) })
  it('supports --dry-run flag', () => { expect(BillingSubscriptionsReactivate.flags['dry-run']).toBeDefined() })
})

describe('billing subscriptions update', () => {
  it('has correct command id', () => { expect(BillingSubscriptionsUpdate.id).toBe('billing subscriptions update') })
  it('requires id arg', () => { expect(BillingSubscriptionsUpdate.args.id.required).toBe(true) })
  it('requires --data flag', () => { expect(BillingSubscriptionsUpdate.flags.data.required).toBe(true) })
  it('supports --dry-run flag', () => { expect(BillingSubscriptionsUpdate.flags['dry-run']).toBeDefined() })
})
