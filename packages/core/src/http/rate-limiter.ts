export class RateLimiter {
  private remaining = Infinity
  private resetInSeconds = 60

  updateFromHeaders(headers: Record<string, string | undefined>): void {
    const remaining = headers['x-ratelimit-remaining']
    const reset = headers['x-ratelimit-reset']

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
