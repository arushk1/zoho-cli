import { describe, it, expect, vi, beforeEach } from 'vitest'
import { RateLimiter } from '../../src/http/index.js'

describe('RateLimiter', () => {
  beforeEach(() => {
    vi.useFakeTimers()
  })

  it('allows requests when under limit', () => {
    const limiter = new RateLimiter()
    limiter.updateFromHeaders({ 'x-ratelimit-remaining': '100', 'x-ratelimit-limit': '200' })
    expect(limiter.shouldWait()).toBe(false)
  })

  it('signals wait when remaining is low', () => {
    const limiter = new RateLimiter()
    limiter.updateFromHeaders({ 'x-ratelimit-remaining': '0', 'x-ratelimit-limit': '200' })
    expect(limiter.shouldWait()).toBe(true)
  })

  it('calculates backoff delay', () => {
    const limiter = new RateLimiter()
    limiter.updateFromHeaders({ 'x-ratelimit-remaining': '0', 'x-ratelimit-limit': '200', 'x-ratelimit-reset': '5' })
    const delay = limiter.getWaitMs()
    expect(delay).toBeGreaterThan(0)
    expect(delay).toBeLessThanOrEqual(6000)
  })

  it('recognizes standard rate limit headers used by Zoho Projects', () => {
    const limiter = new RateLimiter()
    limiter.updateFromHeaders({ 'RateLimit-Remaining': '0', 'Retry-After': '540' })
    expect(limiter.shouldWait()).toBe(true)
    expect(limiter.getWaitMs()).toBe(541_000)
  })
})
