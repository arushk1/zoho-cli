import { describe, it, expect } from 'vitest'
import BillingPlansCreate from '../../../src/commands/billing/plans/create.js'
import BillingPlansDelete from '../../../src/commands/billing/plans/delete.js'
import BillingPlansGet from '../../../src/commands/billing/plans/get.js'
import BillingPlansList from '../../../src/commands/billing/plans/list.js'
import BillingPlansUpdate from '../../../src/commands/billing/plans/update.js'

describe('billing plans create', () => {
  it('has correct command id', () => { expect(BillingPlansCreate.id).toBe('billing plans create') })
  it('requires --data flag', () => { expect(BillingPlansCreate.flags.data.required).toBe(true) })
  it('supports --dry-run flag', () => { expect(BillingPlansCreate.flags['dry-run']).toBeDefined() })
})

describe('billing plans delete', () => {
  it('has correct command id', () => { expect(BillingPlansDelete.id).toBe('billing plans delete') })
  it('requires id arg', () => { expect(BillingPlansDelete.args.id.required).toBe(true) })
  it('supports --dry-run flag', () => { expect(BillingPlansDelete.flags['dry-run']).toBeDefined() })
})

describe('billing plans get', () => {
  it('has correct command id', () => { expect(BillingPlansGet.id).toBe('billing plans get') })
  it('requires id arg', () => { expect(BillingPlansGet.args.id.required).toBe(true) })
})

describe('billing plans list', () => {
  it('has correct command id', () => { expect(BillingPlansList.id).toBe('billing plans list') })
  it('supports --page flag', () => { expect(BillingPlansList.flags.page).toBeDefined() })
  it('supports --per-page flag', () => { expect(BillingPlansList.flags['per-page']).toBeDefined() })
})

describe('billing plans update', () => {
  it('has correct command id', () => { expect(BillingPlansUpdate.id).toBe('billing plans update') })
  it('requires id arg', () => { expect(BillingPlansUpdate.args.id.required).toBe(true) })
  it('requires --data flag', () => { expect(BillingPlansUpdate.flags.data.required).toBe(true) })
  it('supports --dry-run flag', () => { expect(BillingPlansUpdate.flags['dry-run']).toBeDefined() })
})
