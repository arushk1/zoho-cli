import { describe, it, expect } from 'vitest'
import BillingAddonsCreate from '../../../src/commands/billing/addons/create.js'
import BillingAddonsDelete from '../../../src/commands/billing/addons/delete.js'
import BillingAddonsGet from '../../../src/commands/billing/addons/get.js'
import BillingAddonsList from '../../../src/commands/billing/addons/list.js'
import BillingAddonsUpdate from '../../../src/commands/billing/addons/update.js'

describe('billing addons create', () => {
  it('has correct command id', () => { expect(BillingAddonsCreate.id).toBe('billing addons create') })
  it('requires --data flag', () => { expect(BillingAddonsCreate.flags.data.required).toBe(true) })
  it('supports --dry-run flag', () => { expect(BillingAddonsCreate.flags['dry-run']).toBeDefined() })
})

describe('billing addons delete', () => {
  it('has correct command id', () => { expect(BillingAddonsDelete.id).toBe('billing addons delete') })
  it('requires id arg', () => { expect(BillingAddonsDelete.args.id.required).toBe(true) })
  it('supports --dry-run flag', () => { expect(BillingAddonsDelete.flags['dry-run']).toBeDefined() })
})

describe('billing addons get', () => {
  it('has correct command id', () => { expect(BillingAddonsGet.id).toBe('billing addons get') })
  it('requires id arg', () => { expect(BillingAddonsGet.args.id.required).toBe(true) })
})

describe('billing addons list', () => {
  it('has correct command id', () => { expect(BillingAddonsList.id).toBe('billing addons list') })
  it('supports --page flag', () => { expect(BillingAddonsList.flags.page).toBeDefined() })
  it('supports --per-page flag', () => { expect(BillingAddonsList.flags['per-page']).toBeDefined() })
})

describe('billing addons update', () => {
  it('has correct command id', () => { expect(BillingAddonsUpdate.id).toBe('billing addons update') })
  it('requires id arg', () => { expect(BillingAddonsUpdate.args.id.required).toBe(true) })
  it('requires --data flag', () => { expect(BillingAddonsUpdate.flags.data.required).toBe(true) })
  it('supports --dry-run flag', () => { expect(BillingAddonsUpdate.flags['dry-run']).toBeDefined() })
})
