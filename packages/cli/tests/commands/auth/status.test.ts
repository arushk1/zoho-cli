import { describe, it, expect, beforeEach, afterEach } from 'vitest'
import { Config } from '@oclif/core'
import { resolve, join } from 'node:path'
import { fileURLToPath } from 'node:url'
import { mkdtempSync } from 'node:fs'
import { tmpdir } from 'node:os'

const root = resolve(fileURLToPath(import.meta.url), '../../../..')
const originalHome = process.env.HOME

beforeEach(() => {
  process.env.HOME = mkdtempSync(join(tmpdir(), 'zoho-test-'))
})

afterEach(() => {
  process.env.HOME = originalHome
})

describe('auth status', () => {
  it('reports not authenticated when no tokens', async () => {
    const lines: string[] = []
    const config = await Config.load({ root })
    const found = config.findCommand('auth:status')
    const CommandClass = await found!.load()

    const instance = new (CommandClass as any)([], config)
    instance.log = (...args: any[]) => {
      lines.push(args.map(String).join(' '))
    }

    await instance.init()
    await instance.run()

    const output = lines.join('\n')
    const parsed = JSON.parse(output)
    expect(parsed.success).toBe(true)
    expect(parsed.data.authenticated).toBe(false)
  })
})
