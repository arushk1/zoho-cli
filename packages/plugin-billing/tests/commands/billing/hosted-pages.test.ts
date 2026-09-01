import { describe, it, expect } from 'vitest'
import BillingHostedPagesGet from '../../../src/commands/billing/hosted-pages/get.js'
import BillingHostedPagesList from '../../../src/commands/billing/hosted-pages/list.js'

describe('billing hosted-pages get', () => {
  it('has correct command id', () => { expect(BillingHostedPagesGet.id).toBe('billing hosted-pages get') })
  it('requires id arg', () => { expect(BillingHostedPagesGet.args.id.required).toBe(true) })
})

describe('billing hosted-pages list', () => {
  it('has correct command id', () => { expect(BillingHostedPagesList.id).toBe('billing hosted-pages list') })
  it('supports --page flag', () => { expect(BillingHostedPagesList.flags.page).toBeDefined() })
  it('supports --per-page flag', () => { expect(BillingHostedPagesList.flags['per-page']).toBeDefined() })
})
