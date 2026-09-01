import { describe, it, expect } from 'vitest'
import { configSchema, PAYMENTS_REGION_DOMAINS, ENV_MAP } from '../src/config/schema.js'

describe('config schema: billing and payments keys', () => {
  it('accepts defaultBillingOrg', () => {
    const parsed = configSchema.parse({ defaultBillingOrg: '80012345' })
    expect(parsed.defaultBillingOrg).toBe('80012345')
  })

  it('accepts defaultPaymentsAccount', () => {
    const parsed = configSchema.parse({ defaultPaymentsAccount: '23137556' })
    expect(parsed.defaultPaymentsAccount).toBe('23137556')
  })

  it('maps ZOHO_BILLING_ORG_ID and ZOHO_PAYMENTS_ACCOUNT_ID env vars', () => {
    expect(ENV_MAP.ZOHO_BILLING_ORG_ID).toBe('defaultBillingOrg')
    expect(ENV_MAP.ZOHO_PAYMENTS_ACCOUNT_ID).toBe('defaultPaymentsAccount')
  })
})

describe('PAYMENTS_REGION_DOMAINS', () => {
  it('covers exactly the regions where Zoho Payments is available', () => {
    expect(PAYMENTS_REGION_DOMAINS.in).toBe('payments.zoho.in')
    expect(PAYMENTS_REGION_DOMAINS.us).toBe('payments.zoho.com')
    expect(Object.keys(PAYMENTS_REGION_DOMAINS)).toHaveLength(2)
  })
})
