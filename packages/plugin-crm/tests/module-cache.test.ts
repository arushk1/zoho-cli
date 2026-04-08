import { describe, it, expect, beforeEach, afterEach } from 'vitest'
import { mkdir, rm } from 'node:fs/promises'
import { join } from 'node:path'
import { tmpdir } from 'node:os'
import { ModuleCache } from '../src/module-cache.js'

describe('ModuleCache', () => {
  let cacheDir: string

  beforeEach(async () => {
    cacheDir = join(tmpdir(), `zoho-cli-cache-${Date.now()}`)
    await mkdir(cacheDir, { recursive: true })
  })

  afterEach(async () => {
    await rm(cacheDir, { recursive: true, force: true })
  })

  it('stores and retrieves modules', async () => {
    const cache = new ModuleCache(cacheDir)
    await cache.set(['Leads', 'Contacts', 'Deals'])
    const modules = await cache.get()
    expect(modules).toEqual(['Leads', 'Contacts', 'Deals'])
  })

  it('returns null when cache is empty', async () => {
    const cache = new ModuleCache(cacheDir)
    const modules = await cache.get()
    expect(modules).toBeNull()
  })

  it('returns null when cache is expired', async () => {
    const cache = new ModuleCache(cacheDir, 1) // 1ms TTL = expires almost immediately
    await cache.set(['Leads'])
    await new Promise((resolve) => setTimeout(resolve, 10))
    const modules = await cache.get()
    expect(modules).toBeNull()
  })

  it('validates module name exists', async () => {
    const cache = new ModuleCache(cacheDir)
    await cache.set(['Leads', 'Contacts', 'Deals'])
    expect(await cache.isValidModule('Leads')).toBe(true)
    expect(await cache.isValidModule('Invalid')).toBe(false)
  })
})
