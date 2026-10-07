import { describe, it, expect } from 'vitest'
import { configSchema, ANALYTICS_REGION_DOMAINS, ENV_MAP, ZOHO_REGIONS } from '../src/config/schema.js'

describe('config schema: analytics keys', () => {
  it('accepts defaultAnalyticsOrg', () => {
    expect(configSchema.parse({ defaultAnalyticsOrg: '671712892' }).defaultAnalyticsOrg).toBe('671712892')
  })

  it('maps ZOHO_ANALYTICS_ORG_ID env var', () => {
    expect(ENV_MAP.ZOHO_ANALYTICS_ORG_ID).toBe('defaultAnalyticsOrg')
  })
})

describe('ANALYTICS_REGION_DOMAINS', () => {
  it('covers every region on the dedicated analyticsapi host', () => {
    for (const region of ZOHO_REGIONS) expect(ANALYTICS_REGION_DOMAINS[region]).toMatch(/^analyticsapi\./)
  })

  it('uses zohocloud.ca for Canada', () => {
    expect(ANALYTICS_REGION_DOMAINS.ca).toBe('analyticsapi.zohocloud.ca')
    expect(ANALYTICS_REGION_DOMAINS.in).toBe('analyticsapi.zoho.in')
  })
})
