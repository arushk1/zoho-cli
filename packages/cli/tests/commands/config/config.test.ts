import { describe, it, expect, beforeEach, afterEach } from 'vitest'
import { Config } from '@oclif/core'
import { resolve, join } from 'node:path'
import { fileURLToPath } from 'node:url'
import { mkdtempSync } from 'node:fs'
import { tmpdir } from 'node:os'
import ConfigGet from '../../../src/commands/config/get.js'
import ConfigSet from '../../../src/commands/config/set.js'
import ConfigList from '../../../src/commands/config/list.js'

const root = resolve(fileURLToPath(import.meta.url), '../../../..')
const originalHome = process.env.HOME

beforeEach(() => {
  process.env.HOME = mkdtempSync(join(tmpdir(), 'zoho-test-'))
})

afterEach(() => {
  process.env.HOME = originalHome
})

// ---------------------------------------------------------------------------
// Helper: run a CLI command by its colon-separated id, with optional argv
// ---------------------------------------------------------------------------
async function runCmd(cmdId: string, argv: string[] = []): Promise<string> {
  const lines: string[] = []
  const config = await Config.load({ root })
  const found = config.findCommand(cmdId)
  if (!found) throw new Error(`Command "${cmdId}" not found in oclif config`)
  const CommandClass = await found.load()
  const instance = new (CommandClass as any)(argv, config)
  instance.log = (...args: any[]) => lines.push(args.map(String).join(' '))
  await instance.init()
  await instance.run()
  return lines.join('\n')
}

// ---------------------------------------------------------------------------
// config list — static metadata
// ---------------------------------------------------------------------------
describe('config list (static)', () => {
  it('has a summary', () => {
    expect(ConfigList.summary).toBeDefined()
    expect(typeof ConfigList.summary).toBe('string')
  })

  it('defines no command-specific args', () => {
    // oclif always sets args to an object (may be empty {}); ConfigList has none
    const argKeys = Object.keys(ConfigList.args ?? {})
    expect(argKeys).toHaveLength(0)
  })

  it('can be imported and is a valid class', () => {
    expect(typeof ConfigList).toBe('function')
  })
})

// ---------------------------------------------------------------------------
// config get — static metadata
// ---------------------------------------------------------------------------
describe('config get (static)', () => {
  it('has a summary', () => {
    expect(ConfigGet.summary).toBeDefined()
    expect(typeof ConfigGet.summary).toBe('string')
  })

  it('defines a required "key" arg', () => {
    expect(ConfigGet.args).toBeDefined()
    expect(ConfigGet.args.key).toBeDefined()
    expect((ConfigGet.args.key as any).required).toBe(true)
  })

  it('has a description for the key arg', () => {
    expect((ConfigGet.args.key as any).description).toBeDefined()
  })

  it('can be imported and is a valid class', () => {
    expect(typeof ConfigGet).toBe('function')
  })
})

// ---------------------------------------------------------------------------
// config set — static metadata
// ---------------------------------------------------------------------------
describe('config set (static)', () => {
  it('has a summary', () => {
    expect(ConfigSet.summary).toBeDefined()
    expect(typeof ConfigSet.summary).toBe('string')
  })

  it('defines a required "key" arg', () => {
    expect(ConfigSet.args).toBeDefined()
    expect(ConfigSet.args.key).toBeDefined()
    expect((ConfigSet.args.key as any).required).toBe(true)
  })

  it('defines a required "value" arg', () => {
    expect(ConfigSet.args).toBeDefined()
    expect(ConfigSet.args.value).toBeDefined()
    expect((ConfigSet.args.value as any).required).toBe(true)
  })

  it('has descriptions for both args', () => {
    expect((ConfigSet.args.key as any).description).toBeDefined()
    expect((ConfigSet.args.value as any).description).toBeDefined()
  })

  it('can be imported and is a valid class', () => {
    expect(typeof ConfigSet).toBe('function')
  })
})

// ---------------------------------------------------------------------------
// config list — integration
// ---------------------------------------------------------------------------
describe('config list (integration)', () => {
  it('outputs valid JSON with success=true', async () => {
    const output = await runCmd('config:list')
    const parsed = JSON.parse(output)
    expect(parsed.success).toBe(true)
  })

  it('returns a data object with a region field', async () => {
    const output = await runCmd('config:list')
    const parsed = JSON.parse(output)
    expect(parsed.data).toHaveProperty('region')
  })

  it('defaults region to "in" when no config file exists', async () => {
    const output = await runCmd('config:list')
    const parsed = JSON.parse(output)
    expect(parsed.data.region).toBe('in')
  })

  it('includes outputFormat in the returned config', async () => {
    const output = await runCmd('config:list')
    const parsed = JSON.parse(output)
    expect(parsed.data).toHaveProperty('outputFormat')
  })
})

// ---------------------------------------------------------------------------
// config set — integration
// ---------------------------------------------------------------------------
describe('config set (integration)', () => {
  it('sets a valid key and returns success', async () => {
    const output = await runCmd('config:set', ['region', 'us'])
    const parsed = JSON.parse(output)
    expect(parsed.success).toBe(true)
  })

  it('returns a message confirming the set operation', async () => {
    const output = await runCmd('config:set', ['region', 'eu'])
    const parsed = JSON.parse(output)
    expect(parsed.data.message).toContain('region')
    expect(parsed.data.message).toContain('eu')
  })

  it('persists the value so config list reflects it', async () => {
    await runCmd('config:set', ['region', 'au'])
    const listOutput = await runCmd('config:list')
    const parsed = JSON.parse(listOutput)
    expect(parsed.data.region).toBe('au')
  })

  it('returns the full updated config in the response', async () => {
    const output = await runCmd('config:set', ['region', 'jp'])
    const parsed = JSON.parse(output)
    expect(parsed.data.config).toBeDefined()
    expect(parsed.data.config.region).toBe('jp')
  })

  it('rejects an unknown key with success=false', async () => {
    // config:set with an unknown key exits with code 3 — oclif throws,
    // so we expect the promise to reject or output an error envelope
    let output: string | undefined
    try {
      output = await runCmd('config:set', ['nonExistentKey', 'someValue'])
    } catch {
      // Command threw (e.g. process.exit) — that is also acceptable
      return
    }
    if (output !== undefined) {
      const parsed = JSON.parse(output)
      expect(parsed.success).toBe(false)
      expect(parsed.error.code).toBe('INVALID_KEY')
    }
  })

  it('can set optional string fields like defaultPortal', async () => {
    const output = await runCmd('config:set', ['defaultPortal', '12345'])
    const parsed = JSON.parse(output)
    expect(parsed.success).toBe(true)
    expect(parsed.data.config.defaultPortal).toBe('12345')
  })
})

// ---------------------------------------------------------------------------
// config get — integration
// ---------------------------------------------------------------------------
describe('config get (integration)', () => {
  it('returns success=true for a known key', async () => {
    const output = await runCmd('config:get', ['region'])
    const parsed = JSON.parse(output)
    expect(parsed.success).toBe(true)
  })

  it('returns the key name in the data', async () => {
    const output = await runCmd('config:get', ['region'])
    const parsed = JSON.parse(output)
    expect(parsed.data.key).toBe('region')
  })

  it('returns the default region value when no config is set', async () => {
    const output = await runCmd('config:get', ['region'])
    const parsed = JSON.parse(output)
    expect(parsed.data.value).toBe('in')
  })

  it('returns null for an optional key that is not set', async () => {
    const output = await runCmd('config:get', ['clientId'])
    const parsed = JSON.parse(output)
    expect(parsed.success).toBe(true)
    // clientId is not set so value should be null or undefined
    expect(parsed.data.value == null).toBe(true)
  })

  it('reflects a previously set value', async () => {
    await runCmd('config:set', ['region', 'ca'])
    const output = await runCmd('config:get', ['region'])
    const parsed = JSON.parse(output)
    expect(parsed.data.value).toBe('ca')
  })

  it('returns null for an unknown key rather than throwing', async () => {
    // config:get passes key directly to getConfigValue which returns undefined
    // for keys that exist in ZohoConfig but have no value. For truly unknown
    // keys, the Zod schema won't include them and the result will be null/undefined.
    const output = await runCmd('config:get', ['defaultOrg'])
    const parsed = JSON.parse(output)
    expect(parsed.success).toBe(true)
    expect(parsed.data.value == null).toBe(true)
  })
})
