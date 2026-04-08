import { describe, it, expect, vi, afterEach } from 'vitest'
import axios from 'axios'
import {
  buildAuthorizationUrl,
  buildTokenRequestBody,
  buildRefreshRequestBody,
  exchangeCodeForTokens,
  refreshAccessToken,
} from '../../src/auth/index.js'

vi.mock('axios')

describe('OAuth', () => {
  afterEach(() => {
    vi.restoreAllMocks()
  })

  describe('buildAuthorizationUrl', () => {
    it('builds correct URL for India region', () => {
      const url = buildAuthorizationUrl({
        clientId: '1000.ABC',
        region: 'in',
        redirectUri: 'http://localhost:8901/callback',
        scopes: ['ZohoCRM.modules.ALL', 'ZohoCRM.settings.ALL'],
      })
      expect(url).toContain('accounts.zoho.in/oauth/v2/auth')
      expect(url).toContain('client_id=1000.ABC')
      expect(url).toContain('redirect_uri=http%3A%2F%2Flocalhost%3A8901%2Fcallback')
      expect(url).toContain('scope=ZohoCRM.modules.ALL%2CZohoCRM.settings.ALL')
      expect(url).toContain('response_type=code')
      expect(url).toContain('access_type=offline')
    })

    it('includes prompt=consent in URL', () => {
      const url = buildAuthorizationUrl({
        clientId: '1000.ABC',
        region: 'in',
        redirectUri: 'http://localhost:8901/callback',
        scopes: ['ZohoCRM.modules.ALL'],
      })
      expect(url).toContain('prompt=consent')
    })

    it('builds correct URL for US region', () => {
      const url = buildAuthorizationUrl({
        clientId: '1000.XYZ',
        region: 'us',
        redirectUri: 'http://localhost:8901/callback',
        scopes: ['ZohoCRM.modules.ALL'],
      })
      expect(url).toContain('accounts.zoho.com/oauth/v2/auth')
    })

    it('builds correct URL for EU region', () => {
      const url = buildAuthorizationUrl({
        clientId: '1000.EU',
        region: 'eu',
        redirectUri: 'http://localhost:8901/callback',
        scopes: ['ZohoCRM.modules.ALL'],
      })
      expect(url).toContain('accounts.zoho.eu/oauth/v2/auth')
    })

    it('builds correct URL for AU region', () => {
      const url = buildAuthorizationUrl({
        clientId: '1000.AU',
        region: 'au',
        redirectUri: 'http://localhost:8901/callback',
        scopes: ['ZohoCRM.modules.ALL'],
      })
      expect(url).toContain('accounts.zoho.com.au/oauth/v2/auth')
    })

    it('builds correct URL for JP region', () => {
      const url = buildAuthorizationUrl({
        clientId: '1000.JP',
        region: 'jp',
        redirectUri: 'http://localhost:8901/callback',
        scopes: ['ZohoCRM.modules.ALL'],
      })
      expect(url).toContain('accounts.zoho.jp/oauth/v2/auth')
    })

    it('builds correct URL for CA region', () => {
      const url = buildAuthorizationUrl({
        clientId: '1000.CA',
        region: 'ca',
        redirectUri: 'http://localhost:8901/callback',
        scopes: ['ZohoCRM.modules.ALL'],
      })
      expect(url).toContain('accounts.zoho.ca/oauth/v2/auth')
    })

    it('joins multiple scopes with comma', () => {
      const url = buildAuthorizationUrl({
        clientId: '1000.ABC',
        region: 'in',
        redirectUri: 'http://localhost/callback',
        scopes: ['ZohoCRM.modules.ALL', 'ZohoCRM.settings.ALL', 'ZohoCRM.users.ALL'],
      })
      // URL-encoded comma (%2C)
      expect(url).toContain('ZohoCRM.modules.ALL%2CZohoCRM.settings.ALL%2CZohoCRM.users.ALL')
    })

    it('returns a valid HTTPS URL', () => {
      const url = buildAuthorizationUrl({
        clientId: '1000.ABC',
        region: 'in',
        redirectUri: 'http://localhost:8901/callback',
        scopes: ['ZohoCRM.modules.ALL'],
      })
      expect(() => new URL(url)).not.toThrow()
      expect(url.startsWith('https://')).toBe(true)
    })
  })

  describe('buildTokenRequestBody', () => {
    it('builds correct form data for code exchange', () => {
      const body = buildTokenRequestBody({
        code: 'auth-code-123',
        clientId: '1000.ABC',
        clientSecret: 'secret',
        redirectUri: 'http://localhost:8901/callback',
      })
      expect(body.get('grant_type')).toBe('authorization_code')
      expect(body.get('code')).toBe('auth-code-123')
      expect(body.get('client_id')).toBe('1000.ABC')
      expect(body.get('client_secret')).toBe('secret')
      expect(body.get('redirect_uri')).toBe('http://localhost:8901/callback')
    })

    it('returns URLSearchParams instance', () => {
      const body = buildTokenRequestBody({
        code: 'code',
        clientId: 'id',
        clientSecret: 'secret',
        redirectUri: 'http://localhost/callback',
      })
      expect(body instanceof URLSearchParams).toBe(true)
    })
  })

  describe('buildRefreshRequestBody', () => {
    it('builds correct form data for token refresh', () => {
      const body = buildRefreshRequestBody({
        refreshToken: 'refresh-456',
        clientId: '1000.ABC',
        clientSecret: 'secret',
      })
      expect(body.get('grant_type')).toBe('refresh_token')
      expect(body.get('refresh_token')).toBe('refresh-456')
      expect(body.get('client_id')).toBe('1000.ABC')
      expect(body.get('client_secret')).toBe('secret')
    })

    it('returns URLSearchParams instance', () => {
      const body = buildRefreshRequestBody({
        refreshToken: 'rt',
        clientId: 'id',
        clientSecret: 'secret',
      })
      expect(body instanceof URLSearchParams).toBe(true)
    })
  })

  describe('exchangeCodeForTokens', () => {
    it('exchanges code for tokens and returns TokenData', async () => {
      const mockPost = vi.fn().mockResolvedValueOnce({
        data: {
          access_token: 'new-access',
          refresh_token: 'new-refresh',
          expires_in: 3600,
          scope: 'ZohoCRM.modules.ALL',
          token_type: 'Zoho-oauthtoken',
        },
      })
      vi.mocked(axios.post).mockImplementation(mockPost)

      const tokens = await exchangeCodeForTokens('in', {
        code: 'auth-code',
        clientId: '1000.ABC',
        clientSecret: 'secret',
        redirectUri: 'http://localhost:8901/callback',
      })

      expect(tokens.accessToken).toBe('new-access')
      expect(tokens.refreshToken).toBe('new-refresh')
      expect(tokens.scope).toBe('ZohoCRM.modules.ALL')
      expect(tokens.tokenType).toBe('Zoho-oauthtoken')
      expect(tokens.expiresAt).toBeGreaterThan(Date.now())
    })

    it('posts to the correct region endpoint', async () => {
      const mockPost = vi.fn().mockResolvedValueOnce({
        data: {
          access_token: 'at',
          refresh_token: 'rt',
          expires_in: 3600,
          scope: '',
          token_type: 'Zoho-oauthtoken',
        },
      })
      vi.mocked(axios.post).mockImplementation(mockPost)

      await exchangeCodeForTokens('eu', {
        code: 'code',
        clientId: 'id',
        clientSecret: 'secret',
        redirectUri: 'http://localhost/callback',
      })

      expect(mockPost).toHaveBeenCalledWith(
        'https://accounts.zoho.eu/oauth/v2/token',
        expect.any(String),
        expect.objectContaining({ headers: { 'Content-Type': 'application/x-www-form-urlencoded' } })
      )
    })

    it('defaults scope and tokenType when not returned', async () => {
      vi.mocked(axios.post).mockResolvedValueOnce({
        data: {
          access_token: 'at',
          refresh_token: 'rt',
          expires_in: 3600,
          // scope and token_type omitted
        },
      })

      const tokens = await exchangeCodeForTokens('in', {
        code: 'code',
        clientId: 'id',
        clientSecret: 'secret',
        redirectUri: 'http://localhost/callback',
      })

      expect(tokens.scope).toBe('')
      expect(tokens.tokenType).toBe('Zoho-oauthtoken')
    })
  })

  describe('refreshAccessToken', () => {
    it('returns new access token and expiry', async () => {
      vi.mocked(axios.post).mockResolvedValueOnce({
        data: {
          access_token: 'refreshed-access',
          expires_in: 3600,
        },
      })

      const result = await refreshAccessToken('in', {
        refreshToken: 'old-refresh',
        clientId: '1000.ABC',
        clientSecret: 'secret',
      })

      expect(result.accessToken).toBe('refreshed-access')
      expect(result.expiresAt).toBeGreaterThan(Date.now())
    })

    it('throws when response contains error field', async () => {
      vi.mocked(axios.post).mockResolvedValueOnce({
        data: { error: 'invalid_code' },
      })

      await expect(
        refreshAccessToken('in', {
          refreshToken: 'bad-token',
          clientId: '1000.ABC',
          clientSecret: 'secret',
        })
      ).rejects.toThrow('Token refresh failed: invalid_code')
    })

    it('posts to the correct region endpoint', async () => {
      const mockPost = vi.fn().mockResolvedValueOnce({
        data: { access_token: 'at', expires_in: 3600 },
      })
      vi.mocked(axios.post).mockImplementation(mockPost)

      await refreshAccessToken('us', {
        refreshToken: 'rt',
        clientId: 'id',
        clientSecret: 'secret',
      })

      expect(mockPost).toHaveBeenCalledWith(
        'https://accounts.zoho.com/oauth/v2/token',
        expect.any(String),
        expect.objectContaining({ headers: { 'Content-Type': 'application/x-www-form-urlencoded' } })
      )
    })
  })
})
