import { describe, it, expect, vi, beforeEach } from 'vitest'
import { Config } from '@oclif/core'
import { resolve } from 'node:path'
import { fileURLToPath } from 'node:url'

vi.mock('@zoho-cli/core', async () => {
  const actual = await vi.importActual<any>('@zoho-cli/core')
  return {
    ...actual,
    resolveConfig: vi.fn().mockResolvedValue({
      region: 'in',
      defaultOrg: 'org-123',
      clientId: 'client-id',
      clientSecret: 'client-secret',
    }),
    loadTokens: vi.fn().mockResolvedValue({
      accessToken: 'tok',
      refreshToken: 'rtok',
      expiresAt: Date.now() + 60_000,
    }),
  }
})

import DeskTicketsList from '../src/commands/desk/tickets/list.js'
import DeskTicketsGet from '../src/commands/desk/tickets/get.js'
import DeskTicketsCreate from '../src/commands/desk/tickets/create.js'
import DeskTicketsUpdate from '../src/commands/desk/tickets/update.js'
import DeskTicketsDelete from '../src/commands/desk/tickets/delete.js'
import DeskTicketsMerge from '../src/commands/desk/tickets/merge.js'
import DeskTicketsSplit from '../src/commands/desk/tickets/split.js'
import DeskTicketAttachmentsUpload from '../src/commands/desk/ticket-attachments/upload.js'
import DeskContactsDelete from '../src/commands/desk/contacts/delete.js'
import DeskKbSectionsCreate from '../src/commands/desk/kb-sections/create.js'

const pluginRoot = resolve(fileURLToPath(import.meta.url), '../..')

interface MockClient {
  get: ReturnType<typeof vi.fn>
  post: ReturnType<typeof vi.fn>
  patch: ReturnType<typeof vi.fn>
  delete: ReturnType<typeof vi.fn>
  calls: Array<{ method: string; path: string; body?: unknown; config?: any }>
}

function makeMockClient(overrides: {
  get?: (path: string, config?: any) => any
  post?: (path: string, body?: any, config?: any) => any
  patch?: (path: string, body?: any, config?: any) => any
  delete?: (path: string, config?: any) => any
} = {}): MockClient {
  const calls: MockClient['calls'] = []
  const client: MockClient = {
    calls,
    get: vi.fn(async (path: string, config: any = {}) => {
      calls.push({ method: 'GET', path, config })
      if (overrides.get) return overrides.get(path, config)
      return { data: { data: [] }, headers: {} }
    }),
    post: vi.fn(async (path: string, body: any, config: any = {}) => {
      calls.push({ method: 'POST', path, body, config })
      if (overrides.post) return overrides.post(path, body, config)
      return { data: { id: 'new-id' }, headers: {} }
    }),
    patch: vi.fn(async (path: string, body: any, config: any = {}) => {
      calls.push({ method: 'PATCH', path, body, config })
      if (overrides.patch) return overrides.patch(path, body, config)
      return { data: { id: 'updated-id' }, headers: {} }
    }),
    delete: vi.fn(async (path: string, config: any = {}) => {
      calls.push({ method: 'DELETE', path, config })
      if (overrides.delete) return overrides.delete(path, config)
      return { data: {}, headers: {} }
    }),
  }
  return client
}

let oclifConfig: Config

beforeEach(async () => {
  oclifConfig = await Config.load({ root: pluginRoot })
})

async function runCommand(
  CommandClass: any,
  argv: string[],
  client: MockClient,
): Promise<{ output: string; exitCode: number | null }> {
  const instance = new CommandClass(argv, oclifConfig)
  const lines: string[] = []
  let exitCode: number | null = null
  instance.log = (...args: any[]) => lines.push(args.map(String).join(' '))
  instance.exit = (code = 0) => {
    exitCode = code
    const err: any = new Error(`EEXIT: ${code}`)
    err.oclif = { exit: code }
    throw err
  }
  await instance.init()
  ;(instance as any)._apiClient = client
  try {
    await instance.run()
  } catch (e: any) {
    if (e.oclif?.exit === undefined) throw e
  }
  return { output: lines.join('\n'), exitCode }
}

describe('DeskBaseCommand behavior', () => {
  it('injects orgId header on GET requests', async () => {
    const client = makeMockClient()
    await runCommand(DeskTicketsList, ['--page=1', '--per-page=50'], client)
    expect(client.get).toHaveBeenCalledTimes(1)
    const call = client.calls[0]
    expect(call.config.headers).toEqual({ orgId: 'org-123' })
    expect(call.path).toBe('/tickets')
    expect(call.config.params).toMatchObject({ from: '1', limit: '50' })
  })

  it('injects orgId header on POST requests', async () => {
    const client = makeMockClient()
    await runCommand(
      DeskTicketsCreate,
      ['-d', JSON.stringify({ subject: 'Test', departmentId: 'd1' })],
      client,
    )
    expect(client.post).toHaveBeenCalledTimes(1)
    expect(client.calls[0].config.headers).toEqual({ orgId: 'org-123' })
  })

  it('injects orgId header on PATCH requests', async () => {
    const client = makeMockClient()
    await runCommand(
      DeskTicketsUpdate,
      ['123', '-d', JSON.stringify({ subject: 'New' })],
      client,
    )
    expect(client.patch).toHaveBeenCalledTimes(1)
    expect(client.calls[0].config.headers).toEqual({ orgId: 'org-123' })
    expect(client.calls[0].path).toBe('/tickets/123')
  })

  it('injects orgId header on DELETE requests', async () => {
    const client = makeMockClient()
    await runCommand(DeskTicketsDelete, ['456'], client)
    expect(client.delete).toHaveBeenCalledTimes(1)
    expect(client.calls[0].config.headers).toEqual({ orgId: 'org-123' })
    expect(client.calls[0].path).toBe('/tickets/456')
  })

  it('fields flag is forwarded to params on list', async () => {
    const client = makeMockClient()
    await runCommand(DeskTicketsList, ['--fields=id,subject,status'], client)
    expect(client.calls[0].config.params.fields).toBe('id,subject,status')
  })

  it('fields flag is forwarded to params on get', async () => {
    const client = makeMockClient()
    await runCommand(DeskTicketsGet, ['abc', '--fields=id,subject'], client)
    expect(client.calls[0].config.params.fields).toBe('id,subject')
  })
})

describe('Dry-run short-circuits API calls', () => {
  it('tickets create --dry-run does not call the API', async () => {
    const client = makeMockClient()
    const { output } = await runCommand(
      DeskTicketsCreate,
      ['-d', JSON.stringify({ subject: 'Hello' }), '--dry-run'],
      client,
    )
    expect(client.post).not.toHaveBeenCalled()
    const parsed = JSON.parse(output)
    expect(parsed.success).toBe(true)
    expect(parsed.data).toEqual({ subject: 'Hello' })
    expect(parsed.meta.action).toBe('desk.tickets.create.dry-run')
  })

  it('tickets delete --dry-run does not call the API', async () => {
    const client = makeMockClient()
    const { output } = await runCommand(DeskTicketsDelete, ['999', '--dry-run'], client)
    expect(client.delete).not.toHaveBeenCalled()
    const parsed = JSON.parse(output)
    expect(parsed.success).toBe(true)
    expect(parsed.data.deleted).toBe(false)
    expect(parsed.data.dryRun).toBe(true)
    expect(parsed.data.id).toBe('999')
  })

  it('contacts delete --dry-run does not call the API', async () => {
    const client = makeMockClient()
    const { output } = await runCommand(DeskContactsDelete, ['c-1', '--dry-run'], client)
    expect(client.delete).not.toHaveBeenCalled()
    const parsed = JSON.parse(output)
    expect(parsed.success).toBe(true)
    expect(parsed.data.dryRun).toBe(true)
  })
})

describe('JSON parse error handling', () => {
  it('tickets create with invalid JSON exits 3 with INVALID_JSON', async () => {
    const client = makeMockClient()
    const { output, exitCode } = await runCommand(
      DeskTicketsCreate,
      ['-d', '{not json'],
      client,
    )
    expect(exitCode).toBe(3)
    expect(client.post).not.toHaveBeenCalled()
    const parsed = JSON.parse(output)
    expect(parsed.success).toBe(false)
    expect(parsed.error.code).toBe('INVALID_JSON')
  })

  it('tickets merge with invalid JSON exits 3 with INVALID_JSON', async () => {
    const client = makeMockClient()
    const { output, exitCode } = await runCommand(
      DeskTicketsMerge,
      ['t-1', '-d', 'garbage'],
      client,
    )
    expect(exitCode).toBe(3)
    expect(client.post).not.toHaveBeenCalled()
    const parsed = JSON.parse(output)
    expect(parsed.error.code).toBe('INVALID_JSON')
  })

  it('tickets split with invalid JSON exits 3 with INVALID_JSON', async () => {
    const client = makeMockClient()
    const { output, exitCode } = await runCommand(
      DeskTicketsSplit,
      ['t-2', '-d', 'nope'],
      client,
    )
    expect(exitCode).toBe(3)
    expect(client.post).not.toHaveBeenCalled()
    const parsed = JSON.parse(output)
    expect(parsed.error.code).toBe('INVALID_JSON')
  })

  it('kb-sections create with invalid JSON exits 3 with INVALID_JSON', async () => {
    const client = makeMockClient()
    const { output, exitCode } = await runCommand(
      DeskKbSectionsCreate,
      ['-d', '{oops'],
      client,
    )
    expect(exitCode).toBe(3)
    expect(client.post).not.toHaveBeenCalled()
    const parsed = JSON.parse(output)
    expect(parsed.error.code).toBe('INVALID_JSON')
  })
})

describe('handleApiError maps Desk errorCode payloads', () => {
  it('maps errorCode to error.code on API failure', async () => {
    const client = makeMockClient({
      get: () => {
        const err: any = new Error('Request failed')
        err.response = {
          data: {
            errorCode: 'INVALID_DATA',
            message: 'Invalid request parameters',
          },
        }
        throw err
      },
    })
    const { output, exitCode } = await runCommand(DeskTicketsList, [], client)
    expect(exitCode).toBe(1)
    const parsed = JSON.parse(output)
    expect(parsed.success).toBe(false)
    expect(parsed.error.code).toBe('INVALID_DATA')
    expect(parsed.error.message).toBe('Invalid request parameters')
    expect(parsed.error.zohoErrorCode).toBe('INVALID_DATA')
  })

  it('falls back to REQUEST_FAILED when no response data', async () => {
    const client = makeMockClient({
      get: () => {
        throw new Error('ECONNREFUSED')
      },
    })
    const { output, exitCode } = await runCommand(DeskTicketsList, [], client)
    expect(exitCode).toBe(1)
    const parsed = JSON.parse(output)
    expect(parsed.success).toBe(false)
    expect(parsed.error.code).toBe('REQUEST_FAILED')
    expect(parsed.error.message).toBe('ECONNREFUSED')
  })
})

describe('deskUpload forwards multipart headers', () => {
  it('merges form.getHeaders() with orgId on upload', async () => {
    const client = makeMockClient()
    const tmpFile = fileURLToPath(import.meta.url)
    await runCommand(
      DeskTicketAttachmentsUpload,
      ['--ticket=t-999', `--file=${tmpFile}`],
      client,
    )
    expect(client.post).toHaveBeenCalledTimes(1)
    const call = client.calls[0]
    expect(call.path).toBe('/tickets/t-999/attachments')
    expect(call.config.headers.orgId).toBe('org-123')
    const contentType = call.config.headers['content-type'] ?? call.config.headers['Content-Type']
    expect(contentType).toBeDefined()
    expect(String(contentType)).toMatch(/multipart\/form-data; boundary=/)
  })
})
