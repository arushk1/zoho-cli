export class RateLimiter {
  private remaining = Infinity
  private resetInSeconds = 60

  updateFromHeaders(headers: Record<string, string | number | string[] | undefined>): void {
    const normalized = new Map<string, string>()
    for (const [key, value] of Object.entries(headers)) {
      if (value === undefined) continue
      normalized.set(key.toLowerCase(), Array.isArray(value) ? String(value[0]) : String(value))
    }

    const getHeader = (...names: string[]): string | undefined => {
      for (const name of names) {
        const value = normalized.get(name)
        if (value !== undefined) return value
      }
      return undefined
    }

    const remaining = getHeader('x-ratelimit-remaining', 'ratelimit-remaining')
    const reset = getHeader('x-ratelimit-reset', 'ratelimit-reset', 'retry-after')

    if (remaining !== undefined) {
      this.remaining = parseInt(remaining, 10)
    }
    if (reset !== undefined) {
      this.resetInSeconds = parseInt(reset, 10)
    }
  }

  shouldWait(): boolean {
    return this.remaining <= 0
  }

  getWaitMs(): number {
    if (!this.shouldWait()) return 0
    return (this.resetInSeconds + 1) * 1000
  }

  async waitIfNeeded(): Promise<void> {
    if (this.shouldWait()) {
      const ms = this.getWaitMs()
      process.stderr.write(`[zoho-cli] Rate limit hit. Waiting ${Math.ceil(ms / 1000)}s...\n`)
      await new Promise((resolve) => setTimeout(resolve, ms))
    }
  }
}
