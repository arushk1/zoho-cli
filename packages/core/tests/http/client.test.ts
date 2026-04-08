import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import axios from 'axios'
import { ZohoApiClient } from '../../src/http/index.js'
import type { TokenData } from '../../src/auth/index.js'

vi.mock('axios')

describe('ZohoApiClient', () => {
  const mockTokens: TokenData = {
    accessToken: 'access-123',
    refreshToken: 'refresh-456',
    expiresAt: Date.now() + 3600_000,
    scope: 'ZohoCRM.modules.ALL',
    tokenType: 'Zoho-oauthtoken',
  }

  let mockAxiosInstance: any

  beforeEach(() => {
    mockAxiosInstance = {
      get: vi.fn(),
      post: vi.fn(),
      put: vi.fn(),
      delete: vi.fn(),
      patch: vi.fn(),
      interceptors: {
        response: { use: vi.fn() },
        request: { use: vi.fn() },
      },
    }
    vi.mocked(axios.create).mockReturnValue(mockAxiosInstance as any)
  })

  afterEach(() => {
    vi.restoreAllMocks()
  })

  it('creates client with correct base URL', () => {
    new ZohoApiClient({
      region: 'in',
      app: 'crm',
      version: 'v7',
      getTokens: async () => mockTokens,
      onTokenRefresh: async () => {},
    })
    expect(axios.create).toHaveBeenCalledWith(
      expect.objectContaining({
        baseURL: 'https://www.zohoapis.in/crm/v7',
      })
    )
  })

  it('makes GET requests', async () => {
    mockAxiosInstance.get.mockResolvedValueOnce({
      data: { data: [{ id: '123' }] },
      headers: {},
    })
    const client = new ZohoApiClient({
      region: 'in',
      app: 'crm',
      version: 'v7',
      getTokens: async () => mockTokens,
      onTokenRefresh: async () => {},
    })
    const result = await client.get('/Leads')
    expect(result.data).toEqual({ data: [{ id: '123' }] })
  })

  it('makes POST requests with data', async () => {
    mockAxiosInstance.post.mockResolvedValueOnce({
      data: { data: [{ status: 'success' }] },
      headers: {},
    })
    const client = new ZohoApiClient({
      region: 'in',
      app: 'crm',
      version: 'v7',
      getTokens: async () => mockTokens,
      onTokenRefresh: async () => {},
    })
    const result = await client.post('/Leads', { data: [{ Last_Name: 'Test' }] })
    expect(result.data).toEqual({ data: [{ status: 'success' }] })
  })
})
