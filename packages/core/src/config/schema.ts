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
  ca: 'accounts.zoho.ca',
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

export const configSchema = z.object({
  region: z.enum(ZOHO_REGIONS).default('in'),
  clientId: z.string().optional(),
  clientSecret: z.string().optional(),
  defaultOrg: z.string().optional(),
  defaultPortal: z.string().optional(),
  outputFormat: z.enum(['json']).default('json'),
})

export type ZohoConfig = z.infer<typeof configSchema>

export const ENV_MAP: Record<string, keyof ZohoConfig> = {
  ZOHO_REGION: 'region',
  ZOHO_CLIENT_ID: 'clientId',
  ZOHO_CLIENT_SECRET: 'clientSecret',
  ZOHO_DEFAULT_ORG: 'defaultOrg',
  ZOHO_PORTAL_ID: 'defaultPortal',
}
