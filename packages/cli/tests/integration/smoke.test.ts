import { describe, it, expect, beforeEach, afterEach } from 'vitest'
import { Config } from '@oclif/core'
import { resolve, join } from 'node:path'
import { fileURLToPath } from 'node:url'
import { mkdtempSync } from 'node:fs'
import { tmpdir } from 'node:os'

const root = resolve(fileURLToPath(import.meta.url), '../../..')
const originalHome = process.env.HOME

beforeEach(() => {
  process.env.HOME = mkdtempSync(join(tmpdir(), 'zoho-test-'))
})

afterEach(() => {
  process.env.HOME = originalHome
})

async function runCmd(cmdId: string): Promise<string> {
  const lines: string[] = []
  const config = await Config.load({ root })
  const found = config.findCommand(cmdId)
  if (!found) throw new Error(`Command ${cmdId} not found`)
  const CommandClass = await found.load()
  const instance = new (CommandClass as any)([], config)
  instance.log = (...args: any[]) => lines.push(args.map(String).join(' '))
  await instance.init()
  await instance.run()
  return lines.join('\n')
}

describe('CLI smoke tests', () => {
  it('config list returns valid JSON', async () => {
    const output = await runCmd('config:list')
    const parsed = JSON.parse(output)
    expect(parsed.success).toBe(true)
    expect(parsed.data).toHaveProperty('region')
  })

  it('auth status returns valid JSON', async () => {
    const output = await runCmd('auth:status')
    const parsed = JSON.parse(output)
    expect(parsed.success).toBe(true)
    expect(parsed.data.authenticated).toBe(false)
  })
})
