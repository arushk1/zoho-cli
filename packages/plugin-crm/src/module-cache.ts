import { readFile, writeFile, mkdir } from 'node:fs/promises'
import { join } from 'node:path'

interface CacheData {
  modules: string[]
  timestamp: number
}

const CACHE_FILE = 'crm-modules.json'
const DEFAULT_TTL_MS = 24 * 60 * 60 * 1000 // 24 hours

export class ModuleCache {
  private cacheDir: string
  private ttlMs: number

  constructor(cacheDir: string, ttlMs = DEFAULT_TTL_MS) {
    this.cacheDir = cacheDir
    this.ttlMs = ttlMs
  }

  async get(): Promise<string[] | null> {
    try {
      const raw = await readFile(join(this.cacheDir, CACHE_FILE), 'utf-8')
      const data: CacheData = JSON.parse(raw)
      if (Date.now() - data.timestamp > this.ttlMs) return null
      return data.modules
    } catch {
      return null
    }
  }

  async set(modules: string[]): Promise<void> {
    await mkdir(this.cacheDir, { recursive: true })
    const data: CacheData = { modules, timestamp: Date.now() }
    await writeFile(join(this.cacheDir, CACHE_FILE), JSON.stringify(data))
  }

  async isValidModule(name: string): Promise<boolean> {
    const modules = await this.get()
    if (!modules) return true // If cache empty, allow and let API validate
    return modules.includes(name)
  }
}
