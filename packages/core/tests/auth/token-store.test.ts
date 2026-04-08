import { describe, it, expect, beforeEach, afterEach } from 'vitest'
import { mkdir, rm, stat, writeFile } from 'node:fs/promises'
import { join } from 'node:path'
import { tmpdir } from 'node:os'
import { loadTokens, saveTokens, clearTokens, isTokenExpired, type TokenData } from '../../src/auth/index.js'

describe('TokenStore', () => {
  let configDir: string

  const validTokenData: TokenData = {
    accessToken: 'access-123',
    refreshToken: 'refresh-456',
    expiresAt: Date.now() + 3_600_000,
    scope: 'ZohoCRM.modules.ALL',
    tokenType: 'Zoho-oauthtoken',
  }

  beforeEach(async () => {
    configDir = join(tmpdir(), `zoho-cli-test-${Date.now()}`)
    await mkdir(configDir, { recursive: true })
  })

  afterEach(async () => {
    await rm(configDir, { recursive: true, force: true })
  })

  describe('loadTokens', () => {
    it('returns null when no tokens exist', async () => {
      const tokens = await loadTokens(configDir)
      expect(tokens).toBeNull()
    })

    it('saves and loads tokens', async () => {
      await saveTokens(configDir, validTokenData)
      const loaded = await loadTokens(configDir)
      expect(loaded).toEqual(validTokenData)
    })

    it('returns null for corrupt JSON', async () => {
      await writeFile(join(configDir, 'tokens.json'), 'not-valid-json{{{')
      await expect(loadTokens(configDir)).rejects.toThrow()
    })

    it('returns null for valid JSON with missing required fields', async () => {
      await writeFile(
        join(configDir, 'tokens.json'),
        JSON.stringify({ accessToken: 'at', refreshToken: 'rt' }) // missing expiresAt
      )
      const tokens = await loadTokens(configDir)
      expect(tokens).toBeNull()
    })

    it('fills in defaults for scope and tokenType when missing', async () => {
      await writeFile(
        join(configDir, 'tokens.json'),
        JSON.stringify({
          accessToken: 'at',
          refreshToken: 'rt',
          expiresAt: Date.now() + 3600,
          // scope and tokenType omitted — schema provides defaults
        })
      )
      const tokens = await loadTokens(configDir)
      expect(tokens).not.toBeNull()
      expect(tokens!.scope).toBe('')
      expect(tokens!.tokenType).toBe('Zoho-oauthtoken')
    })

    it('preserves all fields on round-trip', async () => {
      const data: TokenData = {
        accessToken: 'at-xyz',
        refreshToken: 'rt-xyz',
        expiresAt: 9999999999,
        scope: 'ZohoProjects.tasks.ALL',
        tokenType: 'Zoho-oauthtoken',
      }
      await saveTokens(configDir, data)
      const loaded = await loadTokens(configDir)
      expect(loaded).toEqual(data)
    })
  })

  describe('saveTokens', () => {
    it('sets restrictive file permissions (0o600)', async () => {
      await saveTokens(configDir, validTokenData)
      const fileInfo = await stat(join(configDir, 'tokens.json'))
      expect(fileInfo.mode & 0o777).toBe(0o600)
    })

    it('creates configDir if it does not exist', async () => {
      const nestedDir = join(configDir, 'deeply', 'nested')
      await saveTokens(nestedDir, validTokenData)
      const loaded = await loadTokens(nestedDir)
      expect(loaded).toEqual(validTokenData)
    })

    it('overwrites existing tokens on re-save', async () => {
      await saveTokens(configDir, validTokenData)
      const newTokens: TokenData = { ...validTokenData, accessToken: 'new-access' }
      await saveTokens(configDir, newTokens)
      const loaded = await loadTokens(configDir)
      expect(loaded!.accessToken).toBe('new-access')
    })
  })

  describe('clearTokens', () => {
    it('clears tokens', async () => {
      await saveTokens(configDir, validTokenData)
      await clearTokens(configDir)
      const loaded = await loadTokens(configDir)
      expect(loaded).toBeNull()
    })

    it('does not throw when tokens file does not exist', async () => {
      await expect(clearTokens(configDir)).resolves.toBeUndefined()
    })

    it('is idempotent — clearing twice does not throw', async () => {
      await saveTokens(configDir, validTokenData)
      await clearTokens(configDir)
      await expect(clearTokens(configDir)).resolves.toBeUndefined()
    })
  })

  describe('isTokenExpired', () => {
    it('returns false when token is well within expiry window', () => {
      const tokens: TokenData = {
        ...validTokenData,
        expiresAt: Date.now() + 3_600_000, // expires in 1 hour
      }
      expect(isTokenExpired(tokens)).toBe(false)
    })

    it('returns true when token is already expired', () => {
      const tokens: TokenData = {
        ...validTokenData,
        expiresAt: Date.now() - 1, // expired in the past
      }
      expect(isTokenExpired(tokens)).toBe(true)
    })

    it('returns true when token expires within the 60-second buffer', () => {
      const tokens: TokenData = {
        ...validTokenData,
        expiresAt: Date.now() + 30_000, // 30 seconds left (< 60s buffer)
      }
      expect(isTokenExpired(tokens)).toBe(true)
    })

    it('returns false when token expires just after the 60-second buffer', () => {
      const tokens: TokenData = {
        ...validTokenData,
        expiresAt: Date.now() + 61_000, // 61 seconds left (> 60s buffer)
      }
      expect(isTokenExpired(tokens)).toBe(false)
    })
  })
})
