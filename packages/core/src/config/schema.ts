import { z } from 'zod'

export const ZOHO_REGIONS = ['us', 'eu', 'in', 'au', 'jp', 'ca'] as const
export type ZohoRegion = (typeof ZOHO_REGIONS)[number]

export const REGION_DOMAINS: Record<ZohoRegion, string> = {
  us: 'zohoapis.com',
  eu: 'zohoapis.eu',
  in: 'zohoapis.in',
  au: 'zohoapis.com.au',
  jp: 'zohoapis.jp',
  ca: 'zohoapis.ca',
}

export const ACCOUNTS_DOMAINS: Record<ZohoRegion, string> = {
  us: 'accounts.zoho.com',
  eu: 'accounts.zoho.eu',
  in: 'accounts.zoho.in',
  au: 'accounts.zoho.com.au',
  jp: 'accounts.zoho.jp',
  ca: 'accounts.zohocloud.ca',
}

export const PROJECTS_REGION_DOMAINS: Record<ZohoRegion, string> = {
  us: 'projectsapi.zoho.com',
  eu: 'projectsapi.zoho.eu',
  in: 'projectsapi.zoho.in',
  au: 'projectsapi.zoho.com.au',
  jp: 'projectsapi.zoho.jp',
  ca: 'projectsapi.zoho.ca',
}

export const PEOPLE_REGION_DOMAINS: Record<ZohoRegion, string> = {
  us: 'people.zoho.com',
  eu: 'people.zoho.eu',
  in: 'people.zoho.in',
  au: 'people.zoho.com.au',
  jp: 'people.zoho.jp',
  ca: 'people.zoho.ca',
}

export const DESK_REGION_DOMAINS: Record<ZohoRegion, string> = {
  us: 'desk.zoho.com',
  eu: 'desk.zoho.eu',
  in: 'desk.zoho.in',
  au: 'desk.zoho.com.au',
  jp: 'desk.zoho.jp',
  ca: 'desk.zoho.ca',
}

// Zoho Payments is only available for businesses registered in India and the US,
// and lives on its own domain (payments.zoho.*) outside the shared zohoapis table.
export const PAYMENTS_REGION_DOMAINS: Partial<Record<ZohoRegion, string>> = {
  in: 'payments.zoho.in',
  us: 'payments.zoho.com',
}

export const configSchema = z.object({
  region: z.enum(ZOHO_REGIONS).default('in'),
  clientId: z.string().optional(),
  clientSecret: z.string().optional(),
  defaultOrg: z.string().optional(),
  defaultPortal: z.string().optional(),
  defaultBookingsWorkspace: z.string().optional(),
  defaultBillingOrg: z.string().optional(),
  defaultPaymentsAccount: z.string().optional(),
  outputFormat: z.enum(['json']).default('json'),
})

export type ZohoConfig = z.infer<typeof configSchema>

export const ENV_MAP: Record<string, keyof ZohoConfig> = {
  ZOHO_REGION: 'region',
  ZOHO_CLIENT_ID: 'clientId',
  ZOHO_CLIENT_SECRET: 'clientSecret',
  ZOHO_DEFAULT_ORG: 'defaultOrg',
  ZOHO_PORTAL_ID: 'defaultPortal',
  ZOHO_BILLING_ORG_ID: 'defaultBillingOrg',
  ZOHO_PAYMENTS_ACCOUNT_ID: 'defaultPaymentsAccount',
}
