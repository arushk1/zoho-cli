import axios, { type AxiosInstance, type AxiosRequestConfig, type AxiosResponse } from 'axios'
import { REGION_DOMAINS, type ZohoRegion } from '../config/schema.js'
import type { TokenData } from '../auth/token-store.js'
import { RateLimiter } from './rate-limiter.js'

export interface ZohoApiClientConfig {
  region: ZohoRegion
  app: string
  version: string
  baseUrl?: string
  getTokens: () => Promise<TokenData | null>
  onTokenRefresh: (newAccessToken: string, expiresAt: number) => Promise<void>
  refreshToken?: () => Promise<{ accessToken: string; expiresAt: number }>
}

export class ZohoApiClient {
  private axios: AxiosInstance
  private rateLimiter = new RateLimiter()
  private config: ZohoApiClientConfig

  constructor(config: ZohoApiClientConfig) {
    this.config = config
    const domain = REGION_DOMAINS[config.region]
    const baseURL = config.baseUrl ?? `https://www.${domain}/${config.app}/${config.version}`
    this.axios = axios.create({
      baseURL,
      headers: { 'Content-Type': 'application/json' },
    })

    this.axios.interceptors.request.use(async (reqConfig) => {
      const tokens = await config.getTokens()
      if (tokens) {
        reqConfig.headers.Authorization = `Zoho-oauthtoken ${tokens.accessToken}`
      }
      return reqConfig
    })
  }

  private extractHeaders(response: AxiosResponse): void {
    this.rateLimiter.updateFromHeaders({
      'x-ratelimit-remaining': response.headers['x-ratelimit-remaining'],
      'x-ratelimit-limit': response.headers['x-ratelimit-limit'],
      'x-ratelimit-reset': response.headers['x-ratelimit-reset'],
    })
  }

  private async request<T>(method: string, path: string, data?: unknown, config?: AxiosRequestConfig): Promise<{ data: T; headers: Record<string, string> }> {
    await this.rateLimiter.waitIfNeeded()

    try {
      const response = await (this.axios as any)[method](path, ...(data !== undefined ? [data, config] : [config]))
      this.extractHeaders(response)
      return { data: response.data, headers: response.headers }
    } catch (error: any) {
      if (error.response?.status === 401 && this.config.refreshToken) {
        const newToken = await this.config.refreshToken()
        await this.config.onTokenRefresh(newToken.accessToken, newToken.expiresAt)
        const retryResponse = await (this.axios as any)[method](path, ...(data !== undefined ? [data, config] : [config]))
        this.extractHeaders(retryResponse)
        return { data: retryResponse.data, headers: retryResponse.headers }
      }
      throw error
    }
  }

  async get<T = any>(path: string, config?: AxiosRequestConfig): Promise<{ data: T; headers: Record<string, string> }> {
    return this.request<T>('get', path, undefined, config)
  }

  async post<T = any>(path: string, data?: unknown, config?: AxiosRequestConfig): Promise<{ data: T; headers: Record<string, string> }> {
    return this.request<T>('post', path, data, config)
  }

  async put<T = any>(path: string, data?: unknown, config?: AxiosRequestConfig): Promise<{ data: T; headers: Record<string, string> }> {
    return this.request<T>('put', path, data, config)
  }

  async delete<T = any>(path: string, config?: AxiosRequestConfig): Promise<{ data: T; headers: Record<string, string> }> {
    return this.request<T>('delete', path, undefined, config)
  }

  async patch<T = any>(path: string, data?: unknown, config?: AxiosRequestConfig): Promise<{ data: T; headers: Record<string, string> }> {
    return this.request<T>('patch', path, data, config)
  }
}
