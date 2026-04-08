import { describe, it, expect, beforeEach, afterEach } from 'vitest'
import { readFile, rm, writeFile, mkdtemp } from 'node:fs/promises'
import { join } from 'node:path'
import { tmpdir } from 'node:os'
import {
  loadConfig,
  saveConfig,
  getConfigValue,
  resolveConfig,
  defaultConfigDir,
  configSchema,
  ZOHO_REGIONS,
  REGION_DOMAINS,
  ACCOUNTS_DOMAINS,
  PROJECTS_REGION_DOMAINS,
  PEOPLE_REGION_DOMAINS,
  ENV_MAP,
} from '../../src/config/index.js'

describe('Config', () => {
  let configDir: string

  beforeEach(async () => {
    configDir = await mkdtemp(join(tmpdir(), 'zoho-cli-test-'))
  })

  afterEach(async () => {
    await rm(configDir, { recursive: true, force: true })
  })

  describe('defaultConfigDir', () => {
    it('returns a string path ending with .zoho-cli', () => {
      const dir = defaultConfigDir()
      expect(typeof dir).toBe('string')
      expect(dir).toMatch(/\.zoho-cli$/)
    })
  })

  describe('ZOHO_REGIONS', () => {
    it('contains all expected regions', () => {
      expect(ZOHO_REGIONS).toContain('us')
      expect(ZOHO_REGIONS).toContain('eu')
      expect(ZOHO_REGIONS).toContain('in')
      expect(ZOHO_REGIONS).toContain('au')
      expect(ZOHO_REGIONS).toContain('jp')
      expect(ZOHO_REGIONS).toContain('ca')
      expect(ZOHO_REGIONS).toHaveLength(6)
    })
  })

  describe('REGION_DOMAINS', () => {
    it('maps all regions to correct CRM API domains', () => {
      expect(REGION_DOMAINS.us).toBe('zohoapis.com')
      expect(REGION_DOMAINS.eu).toBe('zohoapis.eu')
      expect(REGION_DOMAINS.in).toBe('zohoapis.in')
      expect(REGION_DOMAINS.au).toBe('zohoapis.com.au')
      expect(REGION_DOMAINS.jp).toBe('zohoapis.jp')
      expect(REGION_DOMAINS.ca).toBe('zohoapis.ca')
    })
  })

  describe('ACCOUNTS_DOMAINS', () => {
    it('maps all regions to correct accounts domains', () => {
      expect(ACCOUNTS_DOMAINS.us).toBe('accounts.zoho.com')
      expect(ACCOUNTS_DOMAINS.eu).toBe('accounts.zoho.eu')
      expect(ACCOUNTS_DOMAINS.in).toBe('accounts.zoho.in')
      expect(ACCOUNTS_DOMAINS.au).toBe('accounts.zoho.com.au')
      expect(ACCOUNTS_DOMAINS.jp).toBe('accounts.zoho.jp')
      expect(ACCOUNTS_DOMAINS.ca).toBe('accounts.zoho.ca')
    })
  })

  describe('PROJECTS_REGION_DOMAINS', () => {
    it('maps all regions to correct Projects API domains', () => {
      expect(PROJECTS_REGION_DOMAINS.us).toBe('projectsapi.zoho.com')
      expect(PROJECTS_REGION_DOMAINS.eu).toBe('projectsapi.zoho.eu')
      expect(PROJECTS_REGION_DOMAINS.in).toBe('projectsapi.zoho.in')
      expect(PROJECTS_REGION_DOMAINS.au).toBe('projectsapi.zoho.com.au')
      expect(PROJECTS_REGION_DOMAINS.jp).toBe('projectsapi.zoho.jp')
      expect(PROJECTS_REGION_DOMAINS.ca).toBe('projectsapi.zoho.ca')
    })
  })

  describe('PEOPLE_REGION_DOMAINS', () => {
    it('maps all regions to correct People API domains', () => {
      expect(PEOPLE_REGION_DOMAINS.us).toBe('people.zoho.com')
      expect(PEOPLE_REGION_DOMAINS.eu).toBe('people.zoho.eu')
      expect(PEOPLE_REGION_DOMAINS.in).toBe('people.zoho.in')
      expect(PEOPLE_REGION_DOMAINS.au).toBe('people.zoho.com.au')
      expect(PEOPLE_REGION_DOMAINS.jp).toBe('people.zoho.jp')
      expect(PEOPLE_REGION_DOMAINS.ca).toBe('people.zoho.ca')
    })
  })

  describe('ENV_MAP', () => {
    it('maps all expected env vars to config keys', () => {
      expect(ENV_MAP['ZOHO_REGION']).toBe('region')
      expect(ENV_MAP['ZOHO_CLIENT_ID']).toBe('clientId')
      expect(ENV_MAP['ZOHO_CLIENT_SECRET']).toBe('clientSecret')
      expect(ENV_MAP['ZOHO_DEFAULT_ORG']).toBe('defaultOrg')
      expect(ENV_MAP['ZOHO_PORTAL_ID']).toBe('defaultPortal')
    })
  })

  describe('configSchema', () => {
    it('accepts all valid regions', () => {
      for (const region of ZOHO_REGIONS) {
        expect(() => configSchema.parse({ region })).not.toThrow()
      }
    })

    it('defaults region to in', () => {
      const config = configSchema.parse({})
      expect(config.region).toBe('in')
    })

    it('defaults outputFormat to json', () => {
      const config = configSchema.parse({})
      expect(config.outputFormat).toBe('json')
    })

    it('rejects invalid region', () => {
      expect(() => configSchema.parse({ region: 'invalid' })).toThrow()
    })

    it('rejects invalid outputFormat', () => {
      expect(() => configSchema.parse({ outputFormat: 'csv' })).toThrow()
    })

    it('accepts optional clientId and clientSecret', () => {
      const config = configSchema.parse({ clientId: '1000.ABC', clientSecret: 'secret' })
      expect(config.clientId).toBe('1000.ABC')
      expect(config.clientSecret).toBe('secret')
    })

    it('accepts optional defaultOrg', () => {
      const config = configSchema.parse({ defaultOrg: 'org-123' })
      expect(config.defaultOrg).toBe('org-123')
    })

    it('accepts optional defaultPortal', () => {
      const config = configSchema.parse({ defaultPortal: 'portal-456' })
      expect(config.defaultPortal).toBe('portal-456')
    })

    it('omits optional fields when not provided', () => {
      const config = configSchema.parse({})
      expect(config.clientId).toBeUndefined()
      expect(config.clientSecret).toBeUndefined()
      expect(config.defaultOrg).toBeUndefined()
      expect(config.defaultPortal).toBeUndefined()
    })
  })

  describe('loadConfig', () => {
    it('returns default config when no file exists', async () => {
      const config = await loadConfig(configDir)
      expect(config.region).toBe('in')
      expect(config.outputFormat).toBe('json')
    })

    it('loads config from file', async () => {
      await writeFile(
        join(configDir, 'config.json'),
        JSON.stringify({ region: 'us', clientId: '1000.ABC' })
      )
      const config = await loadConfig(configDir)
      expect(config.region).toBe('us')
      expect(config.clientId).toBe('1000.ABC')
    })

    it('loads all supported regions from file', async () => {
      for (const region of ['us', 'eu', 'au', 'jp', 'ca'] as const) {
        await writeFile(join(configDir, 'config.json'), JSON.stringify({ region }))
        const config = await loadConfig(configDir)
        expect(config.region).toBe(region)
      }
    })

    it('rejects invalid region', async () => {
      await writeFile(
        join(configDir, 'config.json'),
        JSON.stringify({ region: 'invalid' })
      )
      await expect(loadConfig(configDir)).rejects.toThrow()
    })

    it('returns default config when file contains malformed JSON', async () => {
      await writeFile(join(configDir, 'config.json'), 'not-json')
      await expect(loadConfig(configDir)).rejects.toThrow()
    })

    it('loads defaultPortal from file', async () => {
      await writeFile(
        join(configDir, 'config.json'),
        JSON.stringify({ defaultPortal: 'my-portal-id' })
      )
      const config = await loadConfig(configDir)
      expect(config.defaultPortal).toBe('my-portal-id')
    })
  })

  describe('saveConfig', () => {
    it('writes config to file', async () => {
      await saveConfig(configDir, { region: 'eu', clientId: '1000.XYZ' })
      const raw = await readFile(join(configDir, 'config.json'), 'utf-8')
      const parsed = JSON.parse(raw)
      expect(parsed.region).toBe('eu')
      expect(parsed.clientId).toBe('1000.XYZ')
    })

    it('merges partial updates with existing config', async () => {
      await saveConfig(configDir, { region: 'us', clientId: '1000.ABC' })
      await saveConfig(configDir, { clientSecret: 'my-secret' })
      const config = await loadConfig(configDir)
      expect(config.region).toBe('us')
      expect(config.clientId).toBe('1000.ABC')
      expect(config.clientSecret).toBe('my-secret')
    })

    it('overwrites existing keys on save', async () => {
      await saveConfig(configDir, { region: 'us' })
      await saveConfig(configDir, { region: 'eu' })
      const config = await loadConfig(configDir)
      expect(config.region).toBe('eu')
    })

    it('creates configDir if it does not exist', async () => {
      const nonExistentDir = join(configDir, 'nested', 'dir')
      await saveConfig(nonExistentDir, { region: 'in' })
      const config = await loadConfig(nonExistentDir)
      expect(config.region).toBe('in')
    })

    it('returns the saved config', async () => {
      const saved = await saveConfig(configDir, { region: 'au', clientId: '1000.AU' })
      expect(saved.region).toBe('au')
      expect(saved.clientId).toBe('1000.AU')
    })

    it('writes JSON with trailing newline', async () => {
      await saveConfig(configDir, { region: 'in' })
      const raw = await readFile(join(configDir, 'config.json'), 'utf-8')
      expect(raw.endsWith('\n')).toBe(true)
    })
  })

  describe('getConfigValue', () => {
    it('returns a specific config value', async () => {
      await saveConfig(configDir, { region: 'in', clientId: '1000.ABC' })
      const value = await getConfigValue(configDir, 'clientId')
      expect(value).toBe('1000.ABC')
    })

    it('returns undefined for unset keys', async () => {
      const value = await getConfigValue(configDir, 'clientId')
      expect(value).toBeUndefined()
    })

    it('returns region default when no config file', async () => {
      const value = await getConfigValue(configDir, 'region')
      expect(value).toBe('in')
    })

    it('returns defaultPortal value', async () => {
      await saveConfig(configDir, { defaultPortal: 'portal-123' })
      const value = await getConfigValue(configDir, 'defaultPortal')
      expect(value).toBe('portal-123')
    })
  })

  describe('resolveConfig', () => {
    it('env vars override file config', async () => {
      await saveConfig(configDir, { region: 'in', clientId: 'from-file' })
      const config = await resolveConfig(configDir, {
        ZOHO_CLIENT_ID: 'from-env',
        ZOHO_REGION: 'eu',
      })
      expect(config.clientId).toBe('from-env')
      expect(config.region).toBe('eu')
    })

    it('file values used when env not set', async () => {
      await saveConfig(configDir, { region: 'in', clientId: 'from-file' })
      const config = await resolveConfig(configDir, {})
      expect(config.clientId).toBe('from-file')
      expect(config.region).toBe('in')
    })

    it('ZOHO_CLIENT_SECRET env var overrides clientSecret', async () => {
      await saveConfig(configDir, { clientSecret: 'file-secret' })
      const config = await resolveConfig(configDir, { ZOHO_CLIENT_SECRET: 'env-secret' })
      expect(config.clientSecret).toBe('env-secret')
    })

    it('ZOHO_DEFAULT_ORG env var overrides defaultOrg', async () => {
      await saveConfig(configDir, { defaultOrg: 'file-org' })
      const config = await resolveConfig(configDir, { ZOHO_DEFAULT_ORG: 'env-org' })
      expect(config.defaultOrg).toBe('env-org')
    })

    it('ZOHO_PORTAL_ID env var overrides defaultPortal', async () => {
      await saveConfig(configDir, { defaultPortal: 'file-portal' })
      const config = await resolveConfig(configDir, { ZOHO_PORTAL_ID: 'env-portal' })
      expect(config.defaultPortal).toBe('env-portal')
    })

    it('ignores undefined env values', async () => {
      await saveConfig(configDir, { region: 'us' })
      const config = await resolveConfig(configDir, { ZOHO_REGION: undefined })
      expect(config.region).toBe('us')
    })

    it('uses defaults when no file and no env vars', async () => {
      const config = await resolveConfig(configDir, {})
      expect(config.region).toBe('in')
      expect(config.outputFormat).toBe('json')
    })
  })
})
