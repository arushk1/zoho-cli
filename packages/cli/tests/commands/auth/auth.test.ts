import { describe, it, expect, beforeEach, afterEach } from 'vitest'
import { Config } from '@oclif/core'
import { resolve, join } from 'node:path'
import { fileURLToPath } from 'node:url'
import { mkdtempSync, writeFileSync, mkdirSync } from 'node:fs'
import { tmpdir } from 'node:os'
import AuthLogin from '../../../src/commands/auth/login.js'
import AuthLogout from '../../../src/commands/auth/logout.js'
import AuthSetup from '../../../src/commands/auth/setup.js'
import AuthStatus from '../../../src/commands/auth/status.js'

const root = resolve(fileURLToPath(import.meta.url), '../../../..')
const originalHome = process.env.HOME

beforeEach(() => {
  process.env.HOME = mkdtempSync(join(tmpdir(), 'zoho-test-'))
})

afterEach(() => {
  process.env.HOME = originalHome
})

// ---------------------------------------------------------------------------
// auth login
// ---------------------------------------------------------------------------
describe('auth login', () => {
  it('has a summary', () => {
    expect(AuthLogin.summary).toBeDefined()
    expect(typeof AuthLogin.summary).toBe('string')
  })

  it('defines a port flag with a default', () => {
    expect(AuthLogin.flags.port).toBeDefined()
    expect((AuthLogin.flags.port as any).default).toBe(8901)
  })

  it('defines a scopes flag with a non-empty default', () => {
    expect(AuthLogin.flags.scopes).toBeDefined()
    const defaultVal = (AuthLogin.flags.scopes as any).default as string
    expect(typeof defaultVal).toBe('string')
    expect(defaultVal.length).toBeGreaterThan(0)
  })

  it('default scopes include CRM, Projects, and People', () => {
    const defaultScopes = (AuthLogin.flags.scopes as any).default as string
    expect(defaultScopes).toContain('ZohoCRM')
    expect(defaultScopes).toContain('ZohoProjects')
    expect(defaultScopes).toContain('ZOHOPEOPLE')
  })

  it('has a description for the port flag', () => {
    expect((AuthLogin.flags.port as any).description).toBeDefined()
  })

  it('has a description for the scopes flag', () => {
    expect((AuthLogin.flags.scopes as any).description).toBeDefined()
  })
})

// ---------------------------------------------------------------------------
// auth logout
// ---------------------------------------------------------------------------
describe('auth logout', () => {
  it('has a summary', () => {
    expect(AuthLogout.summary).toBeDefined()
    expect(typeof AuthLogout.summary).toBe('string')
  })

  it('defines no custom flags (beyond base flags)', () => {
    // AuthLogout should not define any command-specific flags
    const ownFlags = Object.keys(AuthLogout.flags ?? {})
    // Only the inherited base flag 'pretty' is expected
    expect(ownFlags).not.toContain('port')
    expect(ownFlags).not.toContain('scopes')
  })

  it('can be imported and is a valid Command subclass', () => {
    expect(typeof AuthLogout).toBe('function')
    expect(AuthLogout.prototype).toBeDefined()
  })

  it('runs successfully and outputs JSON with cleared tokens', async () => {
    const lines: string[] = []
    const config = await Config.load({ root })
    const found = config.findCommand('auth:logout')
    expect(found).toBeDefined()
    const CommandClass = await found!.load()
    const instance = new (CommandClass as any)([], config)
    instance.log = (...args: any[]) => lines.push(args.map(String).join(' '))
    await instance.init()
    await instance.run()
    const parsed = JSON.parse(lines.join('\n'))
    expect(parsed.success).toBe(true)
    expect(parsed.data.message).toMatch(/[Ll]ogged out/i)
  })
})

// ---------------------------------------------------------------------------
// auth setup
// ---------------------------------------------------------------------------
describe('auth setup', () => {
  it('has a summary', () => {
    expect(AuthSetup.summary).toBeDefined()
    expect(typeof AuthSetup.summary).toBe('string')
  })

  it('defines a client-id flag that is required', () => {
    expect(AuthSetup.flags['client-id']).toBeDefined()
    expect((AuthSetup.flags['client-id'] as any).required).toBe(true)
  })

  it('defines a client-secret flag that is required', () => {
    expect(AuthSetup.flags['client-secret']).toBeDefined()
    expect((AuthSetup.flags['client-secret'] as any).required).toBe(true)
  })

  it('defines a region flag with a default of "in"', () => {
    expect(AuthSetup.flags.region).toBeDefined()
    expect((AuthSetup.flags.region as any).default).toBe('in')
  })

  it('region flag has valid options (known Zoho regions)', () => {
    const options = (AuthSetup.flags.region as any).options as string[]
    expect(Array.isArray(options)).toBe(true)
    expect(options).toContain('us')
    expect(options).toContain('eu')
    expect(options).toContain('in')
    expect(options).toContain('au')
    expect(options).toContain('jp')
    expect(options).toContain('ca')
  })

  it('has descriptions for all flags', () => {
    expect((AuthSetup.flags['client-id'] as any).description).toBeDefined()
    expect((AuthSetup.flags['client-secret'] as any).description).toBeDefined()
    expect((AuthSetup.flags.region as any).description).toBeDefined()
  })

  it('saves config and outputs success when run with valid flags', async () => {
    const lines: string[] = []
    const config = await Config.load({ root })
    const found = config.findCommand('auth:setup')
    expect(found).toBeDefined()
    const CommandClass = await found!.load()
    const instance = new (CommandClass as any)(
      ['--client-id', 'test-client-id', '--client-secret', 'test-client-secret', '--region', 'us'],
      config,
    )
    instance.log = (...args: any[]) => lines.push(args.map(String).join(' '))
    await instance.init()
    await instance.run()
    const parsed = JSON.parse(lines.join('\n'))
    expect(parsed.success).toBe(true)
    expect(parsed.data.clientId).toBe('test-client-id')
    expect(parsed.data.region).toBe('us')
  })
})

// ---------------------------------------------------------------------------
// auth status
// ---------------------------------------------------------------------------
describe('auth status', () => {
  it('has a summary', () => {
    expect(AuthStatus.summary).toBeDefined()
    expect(typeof AuthStatus.summary).toBe('string')
  })

  it('defines no custom flags beyond the base', () => {
    const ownFlags = Object.keys(AuthStatus.flags ?? {})
    expect(ownFlags).not.toContain('port')
    expect(ownFlags).not.toContain('scopes')
    expect(ownFlags).not.toContain('region')
  })

  it('can be imported and is a valid Command subclass', () => {
    expect(typeof AuthStatus).toBe('function')
  })

  it('reports not authenticated when no tokens exist', async () => {
    const lines: string[] = []
    const config = await Config.load({ root })
    const found = config.findCommand('auth:status')
    expect(found).toBeDefined()
    const CommandClass = await found!.load()
    const instance = new (CommandClass as any)([], config)
    instance.log = (...args: any[]) => lines.push(args.map(String).join(' '))
    await instance.init()
    await instance.run()
    const parsed = JSON.parse(lines.join('\n'))
    expect(parsed.success).toBe(true)
    expect(parsed.data.authenticated).toBe(false)
  })

  it('reports authenticated=true when valid tokens exist', async () => {
    // Write a fake token file to the temp HOME
    const zohoDir = join(process.env.HOME!, '.zoho-cli')
    mkdirSync(zohoDir, { recursive: true })
    const tokens = {
      accessToken: 'fake-access-token',
      refreshToken: 'fake-refresh-token',
      expiresAt: Date.now() + 3_600_000, // 1 hour from now
      scope: 'ZohoCRM.modules.ALL',
      tokenType: 'Zoho-oauthtoken',
    }
    writeFileSync(join(zohoDir, 'tokens.json'), JSON.stringify(tokens, null, 2))

    const lines: string[] = []
    const config = await Config.load({ root })
    const found = config.findCommand('auth:status')
    const CommandClass = await found!.load()
    const instance = new (CommandClass as any)([], config)
    instance.log = (...args: any[]) => lines.push(args.map(String).join(' '))
    await instance.init()
    await instance.run()
    const parsed = JSON.parse(lines.join('\n'))
    expect(parsed.success).toBe(true)
    expect(parsed.data.authenticated).toBe(true)
    expect(parsed.data.tokenExpired).toBe(false)
    expect(parsed.data.scope).toBe('ZohoCRM.modules.ALL')
  })

  it('reports tokenExpired=true when tokens are expired', async () => {
    const zohoDir = join(process.env.HOME!, '.zoho-cli')
    mkdirSync(zohoDir, { recursive: true })
    const tokens = {
      accessToken: 'old-access-token',
      refreshToken: 'fake-refresh-token',
      expiresAt: Date.now() - 3_600_000, // 1 hour ago
      scope: 'ZohoCRM.modules.ALL',
      tokenType: 'Zoho-oauthtoken',
    }
    writeFileSync(join(zohoDir, 'tokens.json'), JSON.stringify(tokens, null, 2))

    const lines: string[] = []
    const config = await Config.load({ root })
    const found = config.findCommand('auth:status')
    const CommandClass = await found!.load()
    const instance = new (CommandClass as any)([], config)
    instance.log = (...args: any[]) => lines.push(args.map(String).join(' '))
    await instance.init()
    await instance.run()
    const parsed = JSON.parse(lines.join('\n'))
    expect(parsed.success).toBe(true)
    expect(parsed.data.authenticated).toBe(true)
    expect(parsed.data.tokenExpired).toBe(true)
  })
})
