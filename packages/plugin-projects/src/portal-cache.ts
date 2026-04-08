import { readFile, writeFile, mkdir } from 'node:fs/promises'
import { join } from 'node:path'

interface PortalCacheData {
  portalId: string
  portalName: string
  timestamp: number
}

const CACHE_FILE = 'projects-portal.json'
const DEFAULT_TTL_MS = 24 * 60 * 60 * 1000 // 24 hours

export class PortalCache {
  private cacheDir: string
  private ttlMs: number

  constructor(cacheDir: string, ttlMs = DEFAULT_TTL_MS) {
    this.cacheDir = cacheDir
    this.ttlMs = ttlMs
  }

  async get(): Promise<PortalCacheData | null> {
    try {
      const raw = await readFile(join(this.cacheDir, CACHE_FILE), 'utf-8')
      const data: PortalCacheData = JSON.parse(raw)
      if (Date.now() - data.timestamp > this.ttlMs) return null
      return data
    } catch {
      return null
    }
  }

  async set(portalId: string, portalName: string): Promise<void> {
    await mkdir(this.cacheDir, { recursive: true })
    const data: PortalCacheData = { portalId, portalName, timestamp: Date.now() }
    await writeFile(join(this.cacheDir, CACHE_FILE), JSON.stringify(data))
  }
}
