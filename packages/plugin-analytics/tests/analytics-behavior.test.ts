import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { Config } from '@oclif/core'
import { mkdtemp, readFile, rm, writeFile } from 'node:fs/promises'
import { tmpdir } from 'node:os'
import { join, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'

vi.mock('@zoho-cli/core', async () => {
  const actual = await vi.importActual<any>('@zoho-cli/core')
  return {
    ...actual,
    resolveConfig: vi.fn().mockResolvedValue({
      region: 'in',
      defaultAnalyticsOrg: 'org-123',
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

import { resolveConfig } from '@zoho-cli/core'
import AnalyticsOrgsList from '../src/commands/analytics/orgs/list.js'
import AnalyticsWorkspacesList from '../src/commands/analytics/workspaces/list.js'
import AnalyticsWorkspacesCreate from '../src/commands/analytics/workspaces/create.js'
import AnalyticsWorkspacesDelete from '../src/commands/analytics/workspaces/delete.js'
import AnalyticsViewsList from '../src/commands/analytics/views/list.js'
import AnalyticsDashboardsList from '../src/commands/analytics/dashboards/list.js'
import AnalyticsRowsUpdate from '../src/commands/analytics/rows/update.js'
import AnalyticsRowsDelete from '../src/commands/analytics/rows/delete.js'
import AnalyticsDataExport from '../src/commands/analytics/data/export.js'
import AnalyticsDataImport from '../src/commands/analytics/data/import.js'
import AnalyticsQuery from '../src/commands/analytics/query.js'
import AnalyticsFoldersList from '../src/commands/analytics/folders/list.js'

const pluginRoot = resolve(fileURLToPath(import.meta.url), '../..')

type Handler = (path: string, config: any, body?: any) => any

interface MockClient {
  get: ReturnType<typeof vi.fn>
  post: ReturnType<typeof vi.fn>
  put: ReturnType<typeof vi.fn>
  delete: ReturnType<typeof vi.fn>
  calls: Array<{ method: string; path: string; body?: unknown; config?: any }>
}

const ok = (data: unknown) => ({ data: { status: 'success', summary: 'ok', data }, headers: {} })
const raw = (text: string) => ({ data: Buffer.from(text), headers: {} })

function makeMockClient(handlers: { get?: Handler; post?: Handler; put?: Handler; delete?: Handler } = {}): MockClient {
  const calls: MockClient['calls'] = []
  const make = (method: string, handler: Handler | undefined, hasBody: boolean) =>
    vi.fn(async (path: string, ...rest: any[]) => {
      const body = hasBody ? rest[0] : undefined
      const config = (hasBody ? rest[1] : rest[0]) ?? {}
      calls.push({ method, path, body, config })
      return handler ? handler(path, config, body) : ok({})
    })
  return {
    calls,
    get: make('GET', handlers.get, false),
    post: make('POST', handlers.post, true),
    put: make('PUT', handlers.put, true),
    delete: make('DELETE', handlers.delete, false),
  }
}

/** Decode the CONFIG query param a call was made with. */
const configOf = (call: { config?: any }) => JSON.parse(call.config.params.CONFIG)

let oclifConfig: Config

beforeEach(async () => {
  oclifConfig = await Config.load({ root: pluginRoot })
})

async function runCommand(
  CommandClass: any,
  argv: string[],
  client: MockClient,
): Promise<{ output: any; exitCode: number | null }> {
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
  instance.sleep = async () => {}
  await instance.init()
  ;(instance as any)._apiClient = client
  try {
    await instance.run()
  } catch (e: any) {
    if (e.oclif?.exit === undefined) throw e
  }
  return { output: lines.length ? JSON.parse(lines.join('\n')) : undefined, exitCode }
}

describe('AnalyticsBaseCommand request shaping', () => {
  it('sends the ZANALYTICS-ORGID header from config and no CONFIG when there are no params', async () => {
    const client = makeMockClient({ get: () => ok({ folders: [{ folderId: '1' }] }) })
    const { output } = await runCommand(AnalyticsFoldersList, ['-w', 'ws-1'], client)
    expect(client.calls[0].path).toBe('/workspaces/ws-1/folders')
    expect(client.calls[0].config.headers).toEqual({ 'ZANALYTICS-ORGID': 'org-123' })
    expect(client.calls[0].config.params).toBeUndefined()
    expect(output).toMatchObject({ success: true, data: [{ folderId: '1' }], meta: { count: 1 } })
  })

  it('prefers --org over config', async () => {
    const client = makeMockClient({ get: () => ok({ folders: [] }) })
    await runCommand(AnalyticsFoldersList, ['-w', 'ws-1', '--org', 'org-flag'], client)
    expect(client.calls[0].config.headers).toEqual({ 'ZANALYTICS-ORGID': 'org-flag' })
  })

  it('auto-detects the default org from /orgs when none is configured', async () => {
    vi.mocked(resolveConfig).mockResolvedValueOnce({ region: 'in', outputFormat: 'json' } as any)
    const client = makeMockClient({
      get: (path) => path === '/orgs'
        ? ok({ orgs: [{ orgId: 'org-a', orgName: 'A', isDefault: false }, { orgId: 'org-b', orgName: 'B', isDefault: true }] })
        : ok({ folders: [] }),
    })
    await runCommand(AnalyticsFoldersList, ['-w', 'ws-1'], client)
    expect(client.calls[0].path).toBe('/orgs')
    expect(client.calls[0].config.headers).toEqual({})
    expect(client.calls[1].config.headers).toEqual({ 'ZANALYTICS-ORGID': 'org-b' })
  })

  it('does not send the org header to /orgs or /dashboards', async () => {
    const client = makeMockClient({ get: () => ok({ orgs: [], ownedViews: [], sharedViews: [] }) })
    await runCommand(AnalyticsOrgsList, [], client)
    await runCommand(AnalyticsDashboardsList, [], client)
    expect(client.calls.map((c) => c.config.headers)).toEqual([{}, {}])
  })

  it('encodes CONFIG as JSON and passes a null body on POST (not the axios config)', async () => {
    const client = makeMockClient({ post: () => ok({ workspaceId: '1767024000003145002' }) })
    const { output } = await runCommand(AnalyticsWorkspacesCreate, ['--name', 'Sales'], client)
    expect(client.calls[0].body).toBeNull()
    expect(configOf(client.calls[0])).toEqual({ workspaceName: 'Sales' })
    expect(client.calls[0].config.headers).toEqual({ 'ZANALYTICS-ORGID': 'org-123' })
    expect(output.data).toEqual({ workspaceId: '1767024000003145002' })
  })

  it('handles 204 No Content on delete', async () => {
    const client = makeMockClient({ delete: () => ({ data: '', headers: {} }) })
    const { output, exitCode } = await runCommand(AnalyticsWorkspacesDelete, ['ws-9'], client)
    expect(exitCode).toBeNull()
    expect(output).toMatchObject({ success: true, data: { deleted: true, workspaceId: 'ws-9' } })
  })

  it('maps view type names to Zoho viewTypes codes', async () => {
    const client = makeMockClient({ get: () => ok({ views: [] }) })
    await runCommand(AnalyticsViewsList, ['-w', 'ws-1', '--type', 'table', '--type', 'dashboard', '--limit', '10'], client)
    expect(configOf(client.calls[0])).toEqual({ viewTypes: [0, 7], noOfResult: 10 })
  })

  it('flattens owned and shared workspaces', async () => {
    const client = makeMockClient({ get: () => ok({ ownedWorkspaces: [{ workspaceId: '1' }], sharedWorkspaces: [{ workspaceId: '2' }] }) })
    const { output } = await runCommand(AnalyticsWorkspacesList, [], client)
    expect(output.data).toEqual([{ workspaceId: '1', access: 'owned' }, { workspaceId: '2', access: 'shared' }])
  })
})

describe('error handling', () => {
  it('reports Zoho failure envelopes with the symbolic code and errorCode, exit 1', async () => {
    const client = makeMockClient({
      post: () => {
        const err: any = new Error('Request failed with status code 400')
        err.response = { status: 400, data: { status: 'failure', summary: 'META_DBNAME_DUPLICATE', data: { errorCode: 7101, errorMessage: 'Workspace with the same name exists already.' } } }
        throw err
      },
    })
    const { output, exitCode } = await runCommand(AnalyticsWorkspacesCreate, ['--name', 'Sales'], client)
    expect(exitCode).toBe(1)
    expect(output.error).toEqual({ code: 'META_DBNAME_DUPLICATE', message: 'Workspace with the same name exists already.', zohoErrorCode: '7101' })
  })

  it('decodes failure envelopes on binary export responses', async () => {
    const client = makeMockClient({
      get: () => {
        const err: any = new Error('Request failed with status code 404')
        err.response = { status: 404, data: Buffer.from(JSON.stringify({ status: 'failure', summary: 'META_OBJECT_NOT_PRESENT', data: { errorCode: 7103, errorMessage: 'View not found' } })) }
        throw err
      },
    })
    const { output, exitCode } = await runCommand(AnalyticsDataExport, ['-w', 'ws-1', '--view', 'v-1'], client)
    expect(exitCode).toBe(1)
    expect(output.error).toMatchObject({ code: 'META_OBJECT_NOT_PRESENT', zohoErrorCode: '7103' })
  })
})

describe('rows', () => {
  it('requires --criteria or --all before touching the API', async () => {
    const client = makeMockClient()
    const { output, exitCode } = await runCommand(AnalyticsRowsDelete, ['-w', 'ws-1', '--view', 'v-1'], client)
    expect(exitCode).toBe(3)
    expect(output.error.code).toBe('MISSING_CRITERIA')
    expect(client.calls).toHaveLength(0)
  })

  it('sends columns and criteria in CONFIG on update', async () => {
    const client = makeMockClient({ put: () => ok({ updatedRows: 2 }) })
    const { output } = await runCommand(AnalyticsRowsUpdate, ['-w', 'ws-1', '--view', 'v-1', '-d', '{"Status":"Closed"}', '--criteria', `"Region"='East'`], client)
    expect(client.calls[0]).toMatchObject({ method: 'PUT', path: '/workspaces/ws-1/views/v-1/rows', body: null })
    expect(configOf(client.calls[0])).toEqual({ columns: { Status: 'Closed' }, criteria: `"Region"='East'` })
    expect(output.data).toEqual({ updatedRows: 2 })
  })

  it('makes no API call on --dry-run', async () => {
    const client = makeMockClient()
    const { output } = await runCommand(AnalyticsRowsDelete, ['-w', 'ws-1', '--view', 'v-1', '--all', '--dry-run'], client)
    expect(client.calls).toHaveLength(0)
    expect(output.data).toMatchObject({ dryRun: true, method: 'DELETE', config: { deleteAllRows: true } })
  })

  it('rejects invalid JSON in --data with exit 3', async () => {
    const client = makeMockClient()
    const { output, exitCode } = await runCommand(AnalyticsRowsUpdate, ['-w', 'ws-1', '--view', 'v-1', '-d', '{bad', '--all'], client)
    expect(exitCode).toBe(3)
    expect(output.error.code).toBe('INVALID_JSON')
  })
})

describe('data export', () => {
  it('returns JSON exports inline', async () => {
    const client = makeMockClient({ get: () => raw('{"data":[{"Region":"East","Sales":"10"}]}') })
    const { output } = await runCommand(AnalyticsDataExport, ['-w', 'ws-1', '--view', 'v-1', '--columns', 'Region,Sales'], client)
    expect(client.calls[0].path).toBe('/workspaces/ws-1/views/v-1/data')
    expect(client.calls[0].config.responseType).toBe('arraybuffer')
    expect(configOf(client.calls[0])).toEqual({ responseFormat: 'json', selectedColumns: ['Region', 'Sales'] })
    expect(output.data).toEqual([{ Region: 'East', Sales: '10' }])
    expect(output.meta.count).toBe(1)
  })

  it('returns CSV as content', async () => {
    const client = makeMockClient({ get: () => raw('Region,Sales\nEast,10\n') })
    const { output } = await runCommand(AnalyticsDataExport, ['-w', 'ws-1', '--view', 'v-1', '--format', 'csv'], client)
    expect(output.data).toEqual({ format: 'csv', content: 'Region,Sales\nEast,10\n' })
  })

  it('requires --output for binary formats', async () => {
    const client = makeMockClient({ get: () => raw('%PDF-1.4') })
    const { output, exitCode } = await runCommand(AnalyticsDataExport, ['-w', 'ws-1', '--view', 'v-1', '--format', 'pdf'], client)
    expect(exitCode).toBe(3)
    expect(output.error.code).toBe('OUTPUT_REQUIRED')
  })

  it('writes to --output', async () => {
    const dir = await mkdtemp(join(tmpdir(), 'zoho-analytics-'))
    try {
      const file = join(dir, 'out.pdf')
      const client = makeMockClient({ get: () => raw('%PDF-1.4') })
      const { output } = await runCommand(AnalyticsDataExport, ['-w', 'ws-1', '--view', 'v-1', '--format', 'pdf', '-o', file], client)
      expect(await readFile(file, 'utf8')).toBe('%PDF-1.4')
      expect(output.data).toEqual({ file, bytes: 8, format: 'pdf' })
    } finally {
      await rm(dir, { recursive: true, force: true })
    }
  })
})

describe('query (async SQL export)', () => {
  it('creates a job, polls until 1004, then downloads the result', async () => {
    let statusChecks = 0
    const client = makeMockClient({
      get: (path) => {
        if (path === '/bulk/workspaces/ws-1/data') return ok({ jobId: 'job-1' })
        if (path === '/bulk/workspaces/ws-1/exportjobs/job-1') {
          statusChecks++
          return ok({ jobId: 'job-1', jobCode: statusChecks < 3 ? '1002' : '1004', jobStatus: 'x' })
        }
        if (path === '/bulk/workspaces/ws-1/exportjobs/job-1/data') return raw('{"data":[{"n":"3"}]}')
        throw new Error(`unexpected ${path}`)
      },
    })
    const { output } = await runCommand(AnalyticsQuery, ['-w', 'ws-1', '--sql', 'SELECT COUNT(*) AS n FROM "Sales"'], client)
    expect(configOf(client.calls[0])).toEqual({ sqlQuery: 'SELECT COUNT(*) AS n FROM "Sales"', responseFormat: 'json' })
    expect(statusChecks).toBe(3)
    expect(output).toMatchObject({ success: true, data: [{ n: '3' }] })
  })

  it('returns just the job ID with --no-wait', async () => {
    const client = makeMockClient({ get: () => ok({ jobId: 'job-1' }) })
    const { output } = await runCommand(AnalyticsQuery, ['-w', 'ws-1', '--sql', 'SELECT 1', '--no-wait'], client)
    expect(client.calls).toHaveLength(1)
    expect(output.data).toEqual({ jobId: 'job-1', workspaceId: 'ws-1' })
  })

  it('fails with exit 1 when the job errors', async () => {
    const client = makeMockClient({
      get: (path) => path.endsWith('/data') ? ok({ jobId: 'job-1' }) : ok({ jobCode: '1003', jobStatus: 'ERROR OCCURRED' }),
    })
    const { output, exitCode } = await runCommand(AnalyticsQuery, ['-w', 'ws-1', '--sql', 'SELECT 1'], client)
    expect(exitCode).toBe(1)
    expect(output.error).toMatchObject({ code: 'EXPORT_JOB_FAILED', zohoErrorCode: '1003' })
  })

  it('times out with the job ID in details so it can be resumed', async () => {
    const client = makeMockClient({
      get: (path) => path.endsWith('/data') ? ok({ jobId: 'job-1' }) : ok({ jobCode: '1002', jobStatus: 'JOB IN PROGRESS' }),
    })
    const { output, exitCode } = await runCommand(AnalyticsQuery, ['-w', 'ws-1', '--sql', 'SELECT 1', '--timeout', '0'], client)
    expect(exitCode).toBe(1)
    expect(output.error).toMatchObject({ code: 'JOB_TIMEOUT', details: { jobId: 'job-1', workspaceId: 'ws-1' } })
  })
})

describe('data import', () => {
  let dir: string
  afterEach(async () => { if (dir) await rm(dir, { recursive: true, force: true }) })

  it('uploads FILE as multipart with CONFIG in the query string', async () => {
    dir = await mkdtemp(join(tmpdir(), 'zoho-analytics-'))
    const file = join(dir, 'sales.csv')
    await writeFile(file, 'Region,Sales\nEast,10\n')
    const client = makeMockClient({ post: () => ok({ importSummary: { successRowCount: 1 } }) })
    const { output } = await runCommand(AnalyticsDataImport, ['-w', 'ws-1', '--view', 'v-1', '-f', file, '--import-type', 'updateadd', '--matching-columns', 'Region'], client)
    const call = client.calls[0]
    expect(call.path).toBe('/workspaces/ws-1/views/v-1/data')
    expect(call.config.headers['content-type']).toMatch(/^multipart\/form-data; boundary=/)
    expect(call.config.headers['ZANALYTICS-ORGID']).toBe('org-123')
    expect(configOf(call)).toEqual({ importType: 'updateadd', fileType: 'csv', autoIdentify: true, matchingColumns: ['Region'] })
    expect(output.data).toEqual({ importSummary: { successRowCount: 1 } })
  })

  it('creates a new table with --table-name and infers json from the extension', async () => {
    dir = await mkdtemp(join(tmpdir(), 'zoho-analytics-'))
    const file = join(dir, 'sales.json')
    await writeFile(file, '[{"Region":"East"}]')
    const client = makeMockClient()
    const { output } = await runCommand(AnalyticsDataImport, ['-w', 'ws-1', '--table-name', 'Sales', '-f', file, '--dry-run', '--config', '{"onError":"skiprow"}'], client)
    expect(client.calls).toHaveLength(0)
    expect(output.data).toMatchObject({
      path: '/workspaces/ws-1/data',
      config: { onError: 'skiprow', tableName: 'Sales', fileType: 'json', autoIdentify: true },
    })
    expect(output.data.config.importType).toBeUndefined()
  })

  it('requires --matching-columns for updateadd', async () => {
    const client = makeMockClient()
    const { output, exitCode } = await runCommand(AnalyticsDataImport, ['-w', 'ws-1', '--view', 'v-1', '-f', 'x.csv', '--import-type', 'updateadd'], client)
    expect(exitCode).toBe(3)
    expect(output.error.code).toBe('MISSING_MATCHING_COLUMNS')
  })

  it('reports a missing file with exit 3', async () => {
    const client = makeMockClient()
    const { output, exitCode } = await runCommand(AnalyticsDataImport, ['-w', 'ws-1', '--view', 'v-1', '-f', '/nonexistent/x.csv'], client)
    expect(exitCode).toBe(3)
    expect(output.error.code).toBe('FILE_NOT_FOUND')
  })
})
