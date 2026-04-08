import axios from 'axios'
import { ACCOUNTS_DOMAINS, type ZohoRegion } from '../config/schema.js'
import type { TokenData } from './token-store.js'

export interface AuthorizationUrlParams {
  clientId: string
  region: ZohoRegion
  redirectUri: string
  scopes: string[]
}

export function buildAuthorizationUrl(params: AuthorizationUrlParams): string {
  const domain = ACCOUNTS_DOMAINS[params.region]
  const url = new URL(`https://${domain}/oauth/v2/auth`)
  url.searchParams.set('client_id', params.clientId)
  url.searchParams.set('redirect_uri', params.redirectUri)
  url.searchParams.set('scope', params.scopes.join(','))
  url.searchParams.set('response_type', 'code')
  url.searchParams.set('access_type', 'offline')
  url.searchParams.set('prompt', 'consent')
  return url.toString()
}

export interface TokenRequestParams {
  code: string
  clientId: string
  clientSecret: string
  redirectUri: string
}

export function buildTokenRequestBody(params: TokenRequestParams): URLSearchParams {
  const body = new URLSearchParams()
  body.set('grant_type', 'authorization_code')
  body.set('code', params.code)
  body.set('client_id', params.clientId)
  body.set('client_secret', params.clientSecret)
  body.set('redirect_uri', params.redirectUri)
  return body
}

export interface RefreshRequestParams {
  refreshToken: string
  clientId: string
  clientSecret: string
}

export function buildRefreshRequestBody(params: RefreshRequestParams): URLSearchParams {
  const body = new URLSearchParams()
  body.set('grant_type', 'refresh_token')
  body.set('refresh_token', params.refreshToken)
  body.set('client_id', params.clientId)
  body.set('client_secret', params.clientSecret)
  return body
}

export async function exchangeCodeForTokens(
  region: ZohoRegion,
  params: TokenRequestParams,
): Promise<TokenData> {
  const domain = ACCOUNTS_DOMAINS[region]
  const body = buildTokenRequestBody(params)
  const response = await axios.post(`https://${domain}/oauth/v2/token`, body.toString(), {
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
  })
  const data = response.data
  return {
    accessToken: data.access_token,
    refreshToken: data.refresh_token,
    expiresAt: Date.now() + data.expires_in * 1000,
    scope: data.scope ?? '',
    tokenType: data.token_type ?? 'Zoho-oauthtoken',
  }
}

export async function refreshAccessToken(
  region: ZohoRegion,
  params: RefreshRequestParams,
): Promise<{ accessToken: string; expiresAt: number }> {
  const domain = ACCOUNTS_DOMAINS[region]
  const body = buildRefreshRequestBody(params)
  const response = await axios.post(`https://${domain}/oauth/v2/token`, body.toString(), {
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
  })
  const data = response.data
  if (data.error) {
    throw new Error(`Token refresh failed: ${data.error}`)
  }
  return {
    accessToken: data.access_token,
    expiresAt: Date.now() + data.expires_in * 1000,
  }
}
