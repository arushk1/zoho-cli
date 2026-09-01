import { describe, it, expect } from 'vitest'
import BillingOrganizationsList from '../../../src/commands/billing/organizations/list.js'

describe('billing organizations list', () => {
  it('has correct command id', () => { expect(BillingOrganizationsList.id).toBe('billing organizations list') })
})
