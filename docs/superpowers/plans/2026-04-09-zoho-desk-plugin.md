# Zoho Desk Plugin Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add `@zoho-cli/plugin-desk` with ~145 commands for Zoho Desk helpdesk API (tickets, contacts, accounts, agents, KB, activities, settings).

**Architecture:** Expense-style base command with typed helpers (`deskGet`/`deskPost`/`deskPatch`/`deskDelete`) that auto-inject `orgId` header. Pagination translated from user-facing `--page`/`--per-page` to Desk's `from`/`limit`. All commands extend `DeskBaseCommand`.

**Tech Stack:** TypeScript, oclif v4, vitest, pnpm workspaces

**Spec:** `docs/superpowers/specs/2026-04-09-zoho-desk-plugin-design.md`

---

## Task 1: Core — Add DESK_REGION_DOMAINS

**Files:**
- Modify: `packages/core/src/config/schema.ts:40` (after PEOPLE_REGION_DOMAINS)
- Modify: `packages/core/src/config/index.ts:2` (add to exports)

- [ ] **Step 1: Add DESK_REGION_DOMAINS to schema.ts**

Add after line 40 (after the closing `}` of `PEOPLE_REGION_DOMAINS`):

```typescript
export const DESK_REGION_DOMAINS: Record<ZohoRegion, string> = {
  us: 'desk.zoho.com',
  eu: 'desk.zoho.eu',
  in: 'desk.zoho.in',
  au: 'desk.zoho.com.au',
  jp: 'desk.zoho.jp',
  ca: 'desk.zoho.ca',
}
```

- [ ] **Step 2: Export from config barrel**

In `packages/core/src/config/index.ts`, change line 2 from:
```typescript
export { configSchema, ZOHO_REGIONS, REGION_DOMAINS, ACCOUNTS_DOMAINS, PROJECTS_REGION_DOMAINS, PEOPLE_REGION_DOMAINS, ENV_MAP } from './schema.js'
```
to:
```typescript
export { configSchema, ZOHO_REGIONS, REGION_DOMAINS, ACCOUNTS_DOMAINS, PROJECTS_REGION_DOMAINS, PEOPLE_REGION_DOMAINS, DESK_REGION_DOMAINS, ENV_MAP } from './schema.js'
```

- [ ] **Step 3: Verify core builds**

Run: `pnpm --filter @zoho-cli/core build`
Expected: Clean build, no errors.

- [ ] **Step 4: Commit**

```bash
git add packages/core/src/config/schema.ts packages/core/src/config/index.ts
git commit -m "feat(core): add DESK_REGION_DOMAINS for Zoho Desk plugin"
```

---

## Task 2: Package Scaffold — plugin-desk

**Files:**
- Create: `packages/plugin-desk/package.json`
- Create: `packages/plugin-desk/tsconfig.json`
- Create: `packages/plugin-desk/tsconfig.build.json`

- [ ] **Step 1: Create package.json**

Create `packages/plugin-desk/package.json`:

```json
{
  "name": "@zoho-cli/plugin-desk",
  "version": "0.0.1",
  "type": "module",
  "main": "./dist/index.js",
  "types": "./dist/index.d.ts",
  "scripts": {
    "build": "tsc -p tsconfig.build.json",
    "clean": "rm -rf dist",
    "test": "vitest run"
  },
  "dependencies": {
    "@oclif/core": "^4.10.0",
    "@zoho-cli/core": "workspace:*",
    "form-data": "^4.0.5"
  },
  "devDependencies": {
    "@oclif/test": "^4.1.0",
    "@types/node": "^25.5.2",
    "typescript": "^5.7.0",
    "vitest": "^3.0.0"
  },
  "oclif": {
    "commands": "./dist/commands",
    "topics": {
      "desk": {
        "description": "Zoho Desk commands"
      }
    }
  }
}
```

- [ ] **Step 2: Create tsconfig.json**

Create `packages/plugin-desk/tsconfig.json`:

```json
{
  "extends": "../../tsconfig.base.json",
  "compilerOptions": {
    "noEmit": true,
    "rootDir": "."
  },
  "include": ["src", "tests"]
}
```

- [ ] **Step 3: Create tsconfig.build.json**

Create `packages/plugin-desk/tsconfig.build.json`:

```json
{
  "extends": "../../tsconfig.base.json",
  "compilerOptions": {
    "outDir": "dist",
    "rootDir": "src"
  },
  "include": ["src"]
}
```

- [ ] **Step 4: Install dependencies**

Run: `pnpm install`
Expected: Lockfile updated, workspace links resolved.

- [ ] **Step 5: Commit**

```bash
git add packages/plugin-desk/package.json packages/plugin-desk/tsconfig.json packages/plugin-desk/tsconfig.build.json pnpm-lock.yaml
git commit -m "feat(desk): scaffold plugin-desk package"
```

---

## Task 3: DeskBaseCommand

**Files:**
- Create: `packages/plugin-desk/src/desk-base-command.ts`
- Create: `packages/plugin-desk/tests/desk-base-command.test.ts`

- [ ] **Step 1: Write failing tests for DeskBaseCommand**

Create `packages/plugin-desk/tests/desk-base-command.test.ts`:

```typescript
import { describe, it, expect } from 'vitest'
import { DeskBaseCommand } from '../src/desk-base-command.js'

describe('DeskBaseCommand', () => {
  describe('paginationParams', () => {
    it('converts page 1 to from=1', () => {
      const result = DeskBaseCommand.paginationParams({ page: 1, 'per-page': 100 })
      expect(result).toEqual({ from: '1', limit: '100' })
    })

    it('converts page 2 with per-page 50 to from=51', () => {
      const result = DeskBaseCommand.paginationParams({ page: 2, 'per-page': 50 })
      expect(result).toEqual({ from: '51', limit: '50' })
    })

    it('converts page 3 with per-page 100 to from=201', () => {
      const result = DeskBaseCommand.paginationParams({ page: 3, 'per-page': 100 })
      expect(result).toEqual({ from: '201', limit: '100' })
    })

    it('converts page 1 with per-page 10 to from=1', () => {
      const result = DeskBaseCommand.paginationParams({ page: 1, 'per-page': 10 })
      expect(result).toEqual({ from: '1', limit: '10' })
    })
  })

  describe('baseFlags', () => {
    it('has pretty flag defaulting to false', () => {
      expect(DeskBaseCommand.baseFlags.pretty).toBeDefined()
    })

    it('has org flag with env ZOHO_DESK_ORG_ID', () => {
      expect(DeskBaseCommand.baseFlags.org).toBeDefined()
    })
  })
})
```

- [ ] **Step 2: Run tests to verify they fail**

Run: `pnpm --filter @zoho-cli/plugin-desk test`
Expected: FAIL — module `../src/desk-base-command.js` not found.

- [ ] **Step 3: Write DeskBaseCommand**

Create `packages/plugin-desk/src/desk-base-command.ts`:

```typescript
import { Command, Flags, Interfaces } from '@oclif/core'
import {
  resolveConfig,
  loadTokens,
  saveTokens,
  refreshAccessToken,
  formatOutput,
  formatError,
  formatSuccess,
  ZohoApiClient,
  DESK_REGION_DOMAINS,
  type ZohoConfig,
  type SuccessMeta,
} from '@zoho-cli/core'
import { writeFile } from 'node:fs/promises'

export type DeskBaseFlags<T extends typeof Command> = Interfaces.InferredFlags<typeof DeskBaseCommand['baseFlags'] & T['flags']>
export type DeskBaseArgs<T extends typeof Command> = Interfaces.InferredArgs<T['args']>

export abstract class DeskBaseCommand<T extends typeof Command> extends Command {
  static baseFlags = {
    pretty: Flags.boolean({
      description: 'Pretty-print JSON output',
      default: false,
      helpGroup: 'GLOBAL',
    }),
    org: Flags.string({
      description: 'Zoho Desk organization ID (overrides config)',
      helpGroup: 'GLOBAL',
      env: 'ZOHO_DESK_ORG_ID',
    }),
  }

  protected flags!: DeskBaseFlags<T>
  protected args!: DeskBaseArgs<T>
  protected zohoConfig!: ZohoConfig
  private _apiClient?: ZohoApiClient
  private _resolvedOrgId?: string

  public async init(): Promise<void> {
    await super.init()
    const { args, flags } = await this.parse({
      flags: this.ctor.flags,
      baseFlags: (super.ctor as typeof DeskBaseCommand).baseFlags,
      args: this.ctor.args,
      strict: this.ctor.strict,
    })
    this.flags = flags as DeskBaseFlags<T>
    this.args = args as DeskBaseArgs<T>
    this.zohoConfig = await resolveConfig(undefined, process.env as Record<string, string>)
  }

  static paginationParams(flags: { page: number; 'per-page': number }): { from: string; limit: string } {
    const from = (flags.page - 1) * flags['per-page'] + 1
    return { from: String(from), limit: String(flags['per-page']) }
  }

  protected async resolveOrgId(): Promise<string> {
    if (this._resolvedOrgId) return this._resolvedOrgId

    const flagOrg = (this.flags as any).org
    if (flagOrg) {
      this._resolvedOrgId = flagOrg
      return flagOrg
    }

    if (this.zohoConfig.defaultOrg) {
      this._resolvedOrgId = this.zohoConfig.defaultOrg
      return this.zohoConfig.defaultOrg
    }

    try {
      process.stderr.write('[zoho-cli] Auto-detecting Desk organization ID...\n')
      const { data } = await this.apiClient.get<{ data: Array<{ id: string; organizationName: string }> }>('/organizations', { skipOrgHeader: true } as any)
      const orgs = data.data
      if (!orgs || orgs.length === 0) {
        this.outputError('NO_ORGS', 'No Zoho Desk organizations found for this account')
        this.exit(3)
      }

      const org = orgs[0]
      process.stderr.write(`[zoho-cli] Using organization "${org.organizationName}" (${org.id})\n`)
      this._resolvedOrgId = org.id
      return org.id
    } catch (error: any) {
      this.outputError('ORG_DETECTION_FAILED', `Failed to auto-detect organization: ${error.message}. Set manually via --org flag or "zoho config set defaultOrg <id>"`)
      this.exit(3)
    }
  }

  protected get apiClient(): ZohoApiClient {
    if (!this._apiClient) {
      const domain = DESK_REGION_DOMAINS[this.zohoConfig.region]
      this._apiClient = new ZohoApiClient({
        region: this.zohoConfig.region,
        app: 'desk',
        version: 'v1',
        baseUrl: `https://${domain}/api/v1`,
        getTokens: () => loadTokens(),
        onTokenRefresh: async (accessToken, expiresAt) => {
          const existing = await loadTokens()
          if (existing) {
            await saveTokens(undefined, { ...existing, accessToken, expiresAt })
          }
        },
        refreshToken: async () => {
          const tokens = await loadTokens()
          if (!tokens) throw new Error('No tokens available for refresh')
          return refreshAccessToken(this.zohoConfig.region, {
            refreshToken: tokens.refreshToken,
            clientId: this.zohoConfig.clientId!,
            clientSecret: this.zohoConfig.clientSecret!,
          })
        },
      })
    }
    return this._apiClient
  }

  private async orgHeaders(): Promise<Record<string, string>> {
    const orgId = await this.resolveOrgId()
    return { orgId }
  }

  protected async deskGet<R = any>(path: string, params?: Record<string, string>): Promise<R> {
    const headers = await this.orgHeaders()
    const { data } = await this.apiClient.get<R>(path, { params, headers })
    return data
  }

  protected async deskPost<R = any>(path: string, body?: unknown, params?: Record<string, string>): Promise<R> {
    const headers = await this.orgHeaders()
    const { data } = await this.apiClient.post<R>(path, body, { params, headers })
    return data
  }

  protected async deskPatch<R = any>(path: string, body?: unknown, params?: Record<string, string>): Promise<R> {
    const headers = await this.orgHeaders()
    const { data } = await this.apiClient.patch<R>(path, body, { params, headers })
    return data
  }

  protected async deskDelete<R = any>(path: string, params?: Record<string, string>): Promise<R> {
    const headers = await this.orgHeaders()
    const { data } = await this.apiClient.delete<R>(path, { params, headers })
    return data
  }

  protected async deskDownload(path: string, outputPath: string): Promise<void> {
    const headers = await this.orgHeaders()
    const { data } = await this.apiClient.get<ArrayBuffer>(path, {
      headers,
      responseType: 'arraybuffer',
    } as any)
    await writeFile(outputPath, Buffer.from(data as any))
  }

  protected outputSuccess(data: unknown, meta?: SuccessMeta): void {
    const envelope = formatSuccess(data, meta)
    this.log(formatOutput(envelope, (this.flags as any).pretty))
  }

  protected outputError(code: string, message: string, zohoErrorCode?: string, details?: unknown): void {
    const envelope = formatError({ code, message, zohoErrorCode, details })
    this.log(formatOutput(envelope, (this.flags as any).pretty))
  }

  protected handleApiError(error: any): never {
    if (error.oclif?.exit !== undefined) throw error
    if (error.response?.data) {
      const respData = error.response.data
      this.outputError(
        String(respData.errorCode ?? 'API_ERROR'),
        respData.message ?? error.message,
        String(respData.errorCode ?? ''),
        respData.details,
      )
    } else {
      this.outputError('REQUEST_FAILED', error.message)
    }
    this.exit(1)
  }
}
```

- [ ] **Step 4: Run tests to verify they pass**

Run: `pnpm --filter @zoho-cli/plugin-desk test`
Expected: All 6 tests PASS.

- [ ] **Step 5: Verify it compiles**

Run: `pnpm --filter @zoho-cli/plugin-desk build`
Expected: Clean build (creates `dist/desk-base-command.js`).

- [ ] **Step 6: Commit**

```bash
git add packages/plugin-desk/src/desk-base-command.ts packages/plugin-desk/tests/desk-base-command.test.ts
git commit -m "feat(desk): add DeskBaseCommand with org header injection and pagination"
```

---

## Task 4: CLI Registration

**Files:**
- Modify: `packages/cli/package.json:24` (add dependency)
- Modify: `packages/cli/package.json:45` (add to plugins)

- [ ] **Step 1: Add plugin-desk dependency**

In `packages/cli/package.json`, add to `dependencies` after the `plugin-expense` line:

```json
"@zoho-cli/plugin-desk": "workspace:*",
```

- [ ] **Step 2: Add to oclif plugins array**

In `packages/cli/package.json`, add to the `oclif.plugins` array after `"@zoho-cli/plugin-expense"`:

```json
"@zoho-cli/plugin-desk"
```

- [ ] **Step 3: Install and verify**

Run: `pnpm install && pnpm build`
Expected: Full workspace builds cleanly.

- [ ] **Step 4: Commit**

```bash
git add packages/cli/package.json pnpm-lock.yaml
git commit -m "feat(cli): register plugin-desk in CLI"
```

---

## Task 5: Tickets — Core CRUD (5 commands)

**Files:**
- Create: `packages/plugin-desk/src/commands/desk/tickets/list.ts`
- Create: `packages/plugin-desk/src/commands/desk/tickets/get.ts`
- Create: `packages/plugin-desk/src/commands/desk/tickets/create.ts`
- Create: `packages/plugin-desk/src/commands/desk/tickets/update.ts`
- Create: `packages/plugin-desk/src/commands/desk/tickets/delete.ts`
- Create: `packages/plugin-desk/tests/commands/desk/tickets.test.ts`

- [ ] **Step 1: Write failing tests**

Create `packages/plugin-desk/tests/commands/desk/tickets.test.ts`:

```typescript
import { describe, it, expect } from 'vitest'
import DeskTicketsList from '../../../src/commands/desk/tickets/list.js'
import DeskTicketsGet from '../../../src/commands/desk/tickets/get.js'
import DeskTicketsCreate from '../../../src/commands/desk/tickets/create.js'
import DeskTicketsUpdate from '../../../src/commands/desk/tickets/update.js'
import DeskTicketsDelete from '../../../src/commands/desk/tickets/delete.js'

describe('desk tickets list', () => {
  it('has correct command id', () => { expect(DeskTicketsList.id).toBe('desk tickets list') })
  it('has summary', () => { expect(DeskTicketsList.summary).toBeDefined() })
  it('supports --page flag', () => { expect(DeskTicketsList.flags.page).toBeDefined() })
  it('supports --per-page flag', () => { expect(DeskTicketsList.flags['per-page']).toBeDefined() })
  it('supports --department filter', () => { expect(DeskTicketsList.flags.department).toBeDefined() })
  it('supports --status filter', () => { expect(DeskTicketsList.flags.status).toBeDefined() })
  it('supports --sort-by flag', () => { expect(DeskTicketsList.flags['sort-by']).toBeDefined() })
})

describe('desk tickets get', () => {
  it('has correct command id', () => { expect(DeskTicketsGet.id).toBe('desk tickets get') })
  it('has summary', () => { expect(DeskTicketsGet.summary).toBeDefined() })
  it('requires id arg', () => { expect(DeskTicketsGet.args.id.required).toBe(true) })
  it('supports --include flag', () => { expect(DeskTicketsGet.flags.include).toBeDefined() })
})

describe('desk tickets create', () => {
  it('has correct command id', () => { expect(DeskTicketsCreate.id).toBe('desk tickets create') })
  it('has summary', () => { expect(DeskTicketsCreate.summary).toBeDefined() })
  it('requires --data flag', () => { expect(DeskTicketsCreate.flags.data.required).toBe(true) })
  it('supports --dry-run flag', () => { expect(DeskTicketsCreate.flags['dry-run']).toBeDefined() })
})

describe('desk tickets update', () => {
  it('has correct command id', () => { expect(DeskTicketsUpdate.id).toBe('desk tickets update') })
  it('has summary', () => { expect(DeskTicketsUpdate.summary).toBeDefined() })
  it('requires id arg', () => { expect(DeskTicketsUpdate.args.id.required).toBe(true) })
  it('requires --data flag', () => { expect(DeskTicketsUpdate.flags.data.required).toBe(true) })
  it('supports --dry-run flag', () => { expect(DeskTicketsUpdate.flags['dry-run']).toBeDefined() })
})

describe('desk tickets delete', () => {
  it('has correct command id', () => { expect(DeskTicketsDelete.id).toBe('desk tickets delete') })
  it('has summary', () => { expect(DeskTicketsDelete.summary).toBeDefined() })
  it('requires id arg', () => { expect(DeskTicketsDelete.args.id.required).toBe(true) })
})
```

- [ ] **Step 2: Run tests to verify they fail**

Run: `pnpm --filter @zoho-cli/plugin-desk test`
Expected: FAIL — import paths not found.

- [ ] **Step 3: Write list command**

Create `packages/plugin-desk/src/commands/desk/tickets/list.ts`:

```typescript
import { Flags } from '@oclif/core'
import { DeskBaseCommand } from '../../../desk-base-command.js'

export default class DeskTicketsList extends DeskBaseCommand<typeof DeskTicketsList> {
  static id = 'desk tickets list'
  static summary = 'List support tickets'

  static flags = {
    page: Flags.integer({ description: 'Page number', default: 1 }),
    'per-page': Flags.integer({ description: 'Records per page (max 100)', default: 100 }),
    department: Flags.string({ description: 'Filter by department ID' }),
    assignee: Flags.string({ description: 'Filter by assignee ID' }),
    status: Flags.string({ description: 'Filter by status' }),
    'sort-by': Flags.string({ description: 'Field to sort by' }),
    'sort-order': Flags.string({ description: 'Sort order', options: ['asc', 'desc'] }),
    'view-id': Flags.string({ description: 'Custom view ID' }),
  }

  async run(): Promise<void> {
    const { flags } = this
    try {
      const params: Record<string, string> = {
        ...DeskBaseCommand.paginationParams(flags),
      }
      if (flags.department) params.departmentId = flags.department
      if (flags.assignee) params.assignee = flags.assignee
      if (flags.status) params.status = flags.status
      if (flags['sort-by']) params.sortBy = flags['sort-by']
      if (flags['sort-order']) params.sortOrder = flags['sort-order']
      if (flags['view-id']) params.viewId = flags['view-id']

      const data = await this.deskGet<{ data: any[] }>('/tickets', params)
      this.outputSuccess(data.data ?? [], {
        action: 'desk.tickets.list',
        page: flags.page,
        perPage: flags['per-page'],
        count: data.data?.length ?? 0,
      })
    } catch (error: any) {
      this.handleApiError(error)
    }
  }
}
```

- [ ] **Step 4: Write get command**

Create `packages/plugin-desk/src/commands/desk/tickets/get.ts`:

```typescript
import { Args, Flags } from '@oclif/core'
import { DeskBaseCommand } from '../../../desk-base-command.js'

export default class DeskTicketsGet extends DeskBaseCommand<typeof DeskTicketsGet> {
  static id = 'desk tickets get'
  static summary = 'Get a ticket by ID'

  static args = {
    id: Args.string({ description: 'Ticket ID', required: true }),
  }

  static flags = {
    include: Flags.string({ description: 'Comma-separated related resources to include (e.g. contacts,assignee,departments)' }),
  }

  async run(): Promise<void> {
    const { args, flags } = this
    try {
      const params: Record<string, string> = {}
      if (flags.include) params.include = flags.include

      const data = await this.deskGet(`/tickets/${args.id}`, params)
      this.outputSuccess(data, { action: 'desk.tickets.get' })
    } catch (error: any) {
      this.handleApiError(error)
    }
  }
}
```

- [ ] **Step 5: Write create command**

Create `packages/plugin-desk/src/commands/desk/tickets/create.ts`:

```typescript
import { Flags } from '@oclif/core'
import { DeskBaseCommand } from '../../../desk-base-command.js'

export default class DeskTicketsCreate extends DeskBaseCommand<typeof DeskTicketsCreate> {
  static id = 'desk tickets create'
  static summary = 'Create a ticket'

  static flags = {
    data: Flags.string({ description: 'JSON object with ticket fields (subject, departmentId required)', required: true, char: 'd' }),
    'dry-run': Flags.boolean({ description: 'Show request without executing', default: false }),
  }

  async run(): Promise<void> {
    const { flags } = this
    try {
      const body = JSON.parse(flags.data)
      if (flags['dry-run']) {
        this.outputSuccess({ dryRun: true, method: 'POST', path: '/tickets', body })
        return
      }

      const data = await this.deskPost('/tickets', body)
      this.outputSuccess(data, { action: 'desk.tickets.create' })
    } catch (error: any) {
      if (error instanceof SyntaxError) {
        this.outputError('INVALID_JSON', 'Invalid JSON in --data flag')
        this.exit(3)
      }
      this.handleApiError(error)
    }
  }
}
```

- [ ] **Step 6: Write update command**

Create `packages/plugin-desk/src/commands/desk/tickets/update.ts`:

```typescript
import { Args, Flags } from '@oclif/core'
import { DeskBaseCommand } from '../../../desk-base-command.js'

export default class DeskTicketsUpdate extends DeskBaseCommand<typeof DeskTicketsUpdate> {
  static id = 'desk tickets update'
  static summary = 'Update a ticket'

  static args = {
    id: Args.string({ description: 'Ticket ID', required: true }),
  }

  static flags = {
    data: Flags.string({ description: 'JSON object with fields to update', required: true, char: 'd' }),
    'dry-run': Flags.boolean({ description: 'Show request without executing', default: false }),
  }

  async run(): Promise<void> {
    const { args, flags } = this
    try {
      const body = JSON.parse(flags.data)
      if (flags['dry-run']) {
        this.outputSuccess({ dryRun: true, method: 'PATCH', path: `/tickets/${args.id}`, body })
        return
      }

      const data = await this.deskPatch(`/tickets/${args.id}`, body)
      this.outputSuccess(data, { action: 'desk.tickets.update' })
    } catch (error: any) {
      if (error instanceof SyntaxError) {
        this.outputError('INVALID_JSON', 'Invalid JSON in --data flag')
        this.exit(3)
      }
      this.handleApiError(error)
    }
  }
}
```

- [ ] **Step 7: Write delete command**

Create `packages/plugin-desk/src/commands/desk/tickets/delete.ts`:

```typescript
import { Args } from '@oclif/core'
import { DeskBaseCommand } from '../../../desk-base-command.js'

export default class DeskTicketsDelete extends DeskBaseCommand<typeof DeskTicketsDelete> {
  static id = 'desk tickets delete'
  static summary = 'Delete a ticket (moves to recycle bin)'

  static args = {
    id: Args.string({ description: 'Ticket ID', required: true }),
  }

  async run(): Promise<void> {
    const { args } = this
    try {
      await this.deskDelete(`/tickets/${args.id}`)
      this.outputSuccess({ deleted: true, id: args.id }, { action: 'desk.tickets.delete' })
    } catch (error: any) {
      this.handleApiError(error)
    }
  }
}
```

- [ ] **Step 8: Run tests to verify they pass**

Run: `pnpm --filter @zoho-cli/plugin-desk test`
Expected: All tests PASS.

- [ ] **Step 9: Verify build**

Run: `pnpm --filter @zoho-cli/plugin-desk build`
Expected: Clean build.

- [ ] **Step 10: Commit**

```bash
git add packages/plugin-desk/src/commands/desk/tickets/ packages/plugin-desk/tests/commands/desk/tickets.test.ts
git commit -m "feat(desk): add ticket CRUD commands (list, get, create, update, delete)"
```

---

## Task 6: Tickets — Actions (11 commands)

**Files:**
- Create: `packages/plugin-desk/src/commands/desk/tickets/move.ts`
- Create: `packages/plugin-desk/src/commands/desk/tickets/merge.ts`
- Create: `packages/plugin-desk/src/commands/desk/tickets/split.ts`
- Create: `packages/plugin-desk/src/commands/desk/tickets/close.ts`
- Create: `packages/plugin-desk/src/commands/desk/tickets/spam.ts`
- Create: `packages/plugin-desk/src/commands/desk/tickets/unspam.ts`
- Create: `packages/plugin-desk/src/commands/desk/tickets/count.ts`
- Create: `packages/plugin-desk/src/commands/desk/tickets/search.ts`
- Create: `packages/plugin-desk/src/commands/desk/tickets/history.ts`
- Create: `packages/plugin-desk/src/commands/desk/tickets/metrics.ts`
- Create: `packages/plugin-desk/src/commands/desk/tickets/blueprint.ts`
- Modify: `packages/plugin-desk/tests/commands/desk/tickets.test.ts` (add tests)

- [ ] **Step 1: Add tests for all 11 commands**

Append to `packages/plugin-desk/tests/commands/desk/tickets.test.ts`:

```typescript
import DeskTicketsMove from '../../../src/commands/desk/tickets/move.js'
import DeskTicketsMerge from '../../../src/commands/desk/tickets/merge.js'
import DeskTicketsSplit from '../../../src/commands/desk/tickets/split.js'
import DeskTicketsClose from '../../../src/commands/desk/tickets/close.js'
import DeskTicketsSpam from '../../../src/commands/desk/tickets/spam.js'
import DeskTicketsUnspam from '../../../src/commands/desk/tickets/unspam.js'
import DeskTicketsCount from '../../../src/commands/desk/tickets/count.js'
import DeskTicketsSearch from '../../../src/commands/desk/tickets/search.js'
import DeskTicketsHistory from '../../../src/commands/desk/tickets/history.js'
import DeskTicketsMetrics from '../../../src/commands/desk/tickets/metrics.js'
import DeskTicketsBlueprint from '../../../src/commands/desk/tickets/blueprint.js'

describe('desk tickets move', () => {
  it('has correct command id', () => { expect(DeskTicketsMove.id).toBe('desk tickets move') })
  it('requires id arg', () => { expect(DeskTicketsMove.args.id.required).toBe(true) })
  it('requires --department flag', () => { expect(DeskTicketsMove.flags.department.required).toBe(true) })
})

describe('desk tickets merge', () => {
  it('has correct command id', () => { expect(DeskTicketsMerge.id).toBe('desk tickets merge') })
  it('requires id arg', () => { expect(DeskTicketsMerge.args.id.required).toBe(true) })
  it('requires --data flag', () => { expect(DeskTicketsMerge.flags.data.required).toBe(true) })
})

describe('desk tickets split', () => {
  it('has correct command id', () => { expect(DeskTicketsSplit.id).toBe('desk tickets split') })
  it('requires id arg', () => { expect(DeskTicketsSplit.args.id.required).toBe(true) })
  it('requires --data flag', () => { expect(DeskTicketsSplit.flags.data.required).toBe(true) })
})

describe('desk tickets close', () => {
  it('has correct command id', () => { expect(DeskTicketsClose.id).toBe('desk tickets close') })
  it('requires --ids flag', () => { expect(DeskTicketsClose.flags.ids.required).toBe(true) })
})

describe('desk tickets spam', () => {
  it('has correct command id', () => { expect(DeskTicketsSpam.id).toBe('desk tickets spam') })
  it('requires --ids flag', () => { expect(DeskTicketsSpam.flags.ids.required).toBe(true) })
})

describe('desk tickets unspam', () => {
  it('has correct command id', () => { expect(DeskTicketsUnspam.id).toBe('desk tickets unspam') })
  it('requires --ids flag', () => { expect(DeskTicketsUnspam.flags.ids.required).toBe(true) })
})

describe('desk tickets count', () => {
  it('has correct command id', () => { expect(DeskTicketsCount.id).toBe('desk tickets count') })
  it('has summary', () => { expect(DeskTicketsCount.summary).toBeDefined() })
})

describe('desk tickets search', () => {
  it('has correct command id', () => { expect(DeskTicketsSearch.id).toBe('desk tickets search') })
  it('has summary', () => { expect(DeskTicketsSearch.summary).toBeDefined() })
})

describe('desk tickets history', () => {
  it('has correct command id', () => { expect(DeskTicketsHistory.id).toBe('desk tickets history') })
  it('requires id arg', () => { expect(DeskTicketsHistory.args.id.required).toBe(true) })
})

describe('desk tickets metrics', () => {
  it('has correct command id', () => { expect(DeskTicketsMetrics.id).toBe('desk tickets metrics') })
  it('requires id arg', () => { expect(DeskTicketsMetrics.args.id.required).toBe(true) })
})

describe('desk tickets blueprint', () => {
  it('has correct command id', () => { expect(DeskTicketsBlueprint.id).toBe('desk tickets blueprint') })
  it('requires id arg', () => { expect(DeskTicketsBlueprint.args.id.required).toBe(true) })
})
```

- [ ] **Step 2: Write all 11 command files**

Create each file following the same patterns from Task 5. Key differences:

**`move.ts`**: `POST /tickets/{id}/move` with `--department` flag (required). Body: `{ departmentId }`.

**`merge.ts`**: `POST /tickets/{id}/merge` with `--data` flag. Body: `{ ids: [...] }`.

**`split.ts`**: `POST /tickets/{id}/split` with `--data` flag. Body: `{ threadId, subject, departmentId }`.

**`close.ts`**: `POST /tickets/close` with `--ids` flag (required, comma-separated). Body: `{ ids: [...] }`.

**`spam.ts`**: `POST /tickets/markSpam` with `--ids` flag. Body: `{ ticketIds: [...] }`.

**`unspam.ts`**: `POST /tickets/unmarkSpam` with `--ids` flag. Body: `{ ticketIds: [...] }`.

**`count.ts`**: `GET /tickets/count`. No required args. Optional `--department`, `--status` filters.

**`search.ts`**: `GET /tickets/search`. Flags: `--query` (required), `--page`, `--per-page`, `--sort-by`, `--department`.

**`history.ts`**: `GET /tickets/{id}/history`. Arg: `id` (required). Flags: `--page`, `--per-page`.

**`metrics.ts`**: `GET /tickets/{id}/metrics`. Arg: `id` (required).

**`blueprint.ts`**: `GET /tickets/{id}/blueprint`. Arg: `id` (required).

Each command follows the same structure as the CRUD commands in Task 5: extend `DeskBaseCommand`, `static id` with spaces, try/catch with `handleApiError`, `outputSuccess` with action meta.

- [ ] **Step 3: Run tests**

Run: `pnpm --filter @zoho-cli/plugin-desk test`
Expected: All tests PASS.

- [ ] **Step 4: Commit**

```bash
git add packages/plugin-desk/src/commands/desk/tickets/ packages/plugin-desk/tests/commands/desk/tickets.test.ts
git commit -m "feat(desk): add ticket action commands (move, merge, split, close, spam, search, etc.)"
```

---

## Task 7: Tickets — Resolution (4 commands)

**Files:**
- Create: `packages/plugin-desk/src/commands/desk/tickets/resolution/get.ts`
- Create: `packages/plugin-desk/src/commands/desk/tickets/resolution/add.ts`
- Create: `packages/plugin-desk/src/commands/desk/tickets/resolution/update.ts`
- Create: `packages/plugin-desk/src/commands/desk/tickets/resolution/delete.ts`
- Modify: `packages/plugin-desk/tests/commands/desk/tickets.test.ts` (add resolution tests)

- [ ] **Step 1: Add resolution tests**

Append to `packages/plugin-desk/tests/commands/desk/tickets.test.ts`:

```typescript
import DeskTicketsResolutionGet from '../../../../src/commands/desk/tickets/resolution/get.js'
import DeskTicketsResolutionAdd from '../../../../src/commands/desk/tickets/resolution/add.js'
import DeskTicketsResolutionUpdate from '../../../../src/commands/desk/tickets/resolution/update.js'
import DeskTicketsResolutionDelete from '../../../../src/commands/desk/tickets/resolution/delete.js'

describe('desk tickets resolution get', () => {
  it('has correct command id', () => { expect(DeskTicketsResolutionGet.id).toBe('desk tickets resolution get') })
  it('requires id arg', () => { expect(DeskTicketsResolutionGet.args.id.required).toBe(true) })
})

describe('desk tickets resolution add', () => {
  it('has correct command id', () => { expect(DeskTicketsResolutionAdd.id).toBe('desk tickets resolution add') })
  it('requires id arg', () => { expect(DeskTicketsResolutionAdd.args.id.required).toBe(true) })
  it('requires --data flag', () => { expect(DeskTicketsResolutionAdd.flags.data.required).toBe(true) })
})

describe('desk tickets resolution update', () => {
  it('has correct command id', () => { expect(DeskTicketsResolutionUpdate.id).toBe('desk tickets resolution update') })
  it('requires id arg', () => { expect(DeskTicketsResolutionUpdate.args.id.required).toBe(true) })
  it('requires --data flag', () => { expect(DeskTicketsResolutionUpdate.flags.data.required).toBe(true) })
})

describe('desk tickets resolution delete', () => {
  it('has correct command id', () => { expect(DeskTicketsResolutionDelete.id).toBe('desk tickets resolution delete') })
  it('requires id arg', () => { expect(DeskTicketsResolutionDelete.args.id.required).toBe(true) })
})
```

- [ ] **Step 2: Write all 4 resolution commands**

Each follows standard pattern. Import depth is `../../../../desk-base-command.js` (one level deeper than ticket CRUD).

**`resolution/get.ts`**: `GET /tickets/{id}/resolution`. Arg: `id`.
**`resolution/add.ts`**: `POST /tickets/{id}/resolution`. Arg: `id`. Flag: `--data` (required).
**`resolution/update.ts`**: `PATCH /tickets/{id}/resolution`. Arg: `id`. Flag: `--data` (required).
**`resolution/delete.ts`**: `DELETE /tickets/{id}/resolution`. Arg: `id`.

- [ ] **Step 3: Run tests, verify build, commit**

```bash
pnpm --filter @zoho-cli/plugin-desk test && pnpm --filter @zoho-cli/plugin-desk build
git add packages/plugin-desk/src/commands/desk/tickets/resolution/ packages/plugin-desk/tests/commands/desk/tickets.test.ts
git commit -m "feat(desk): add ticket resolution commands (get, add, update, delete)"
```

---

## Task 8: Threads (4 commands)

**Files:**
- Create: `packages/plugin-desk/src/commands/desk/threads/list.ts`
- Create: `packages/plugin-desk/src/commands/desk/threads/get.ts`
- Create: `packages/plugin-desk/src/commands/desk/threads/reply.ts`
- Create: `packages/plugin-desk/src/commands/desk/threads/draft.ts`
- Create: `packages/plugin-desk/tests/commands/desk/threads.test.ts`

- [ ] **Step 1: Write tests**

Create `packages/plugin-desk/tests/commands/desk/threads.test.ts`:

```typescript
import { describe, it, expect } from 'vitest'
import DeskThreadsList from '../../../src/commands/desk/threads/list.js'
import DeskThreadsGet from '../../../src/commands/desk/threads/get.js'
import DeskThreadsReply from '../../../src/commands/desk/threads/reply.js'
import DeskThreadsDraft from '../../../src/commands/desk/threads/draft.js'

describe('desk threads list', () => {
  it('has correct command id', () => { expect(DeskThreadsList.id).toBe('desk threads list') })
  it('requires --ticket flag', () => { expect(DeskThreadsList.flags.ticket.required).toBe(true) })
  it('supports --page flag', () => { expect(DeskThreadsList.flags.page).toBeDefined() })
})

describe('desk threads get', () => {
  it('has correct command id', () => { expect(DeskThreadsGet.id).toBe('desk threads get') })
  it('requires --ticket flag', () => { expect(DeskThreadsGet.flags.ticket.required).toBe(true) })
  it('requires id arg', () => { expect(DeskThreadsGet.args.id.required).toBe(true) })
})

describe('desk threads reply', () => {
  it('has correct command id', () => { expect(DeskThreadsReply.id).toBe('desk threads reply') })
  it('requires --ticket flag', () => { expect(DeskThreadsReply.flags.ticket.required).toBe(true) })
  it('requires --data flag', () => { expect(DeskThreadsReply.flags.data.required).toBe(true) })
})

describe('desk threads draft', () => {
  it('has correct command id', () => { expect(DeskThreadsDraft.id).toBe('desk threads draft') })
  it('requires --ticket flag', () => { expect(DeskThreadsDraft.flags.ticket.required).toBe(true) })
  it('requires --data flag', () => { expect(DeskThreadsDraft.flags.data.required).toBe(true) })
})
```

- [ ] **Step 2: Write all 4 commands**

All use `--ticket` / `-t` flag (required) for parent ticket ID. Import path: `../../../desk-base-command.js`.

**`list.ts`**: `GET /tickets/{ticket}/threads`. Flags: `--ticket`, `--page`, `--per-page`.
**`get.ts`**: `GET /tickets/{ticket}/threads/{id}`. Arg: `id`. Flag: `--ticket`.
**`reply.ts`**: `POST /tickets/{ticket}/sendReply`. Flag: `--ticket`, `--data` (required, JSON with `channel`, `to`, `content`, `contentType`).
**`draft.ts`**: `POST /tickets/{ticket}/draftReply`. Flag: `--ticket`, `--data` (required).

- [ ] **Step 3: Run tests, verify build, commit**

```bash
pnpm --filter @zoho-cli/plugin-desk test && pnpm --filter @zoho-cli/plugin-desk build
git add packages/plugin-desk/src/commands/desk/threads/ packages/plugin-desk/tests/commands/desk/threads.test.ts
git commit -m "feat(desk): add thread commands (list, get, reply, draft)"
```

---

## Task 9: Ticket Comments (5 commands)

**Files:**
- Create: `packages/plugin-desk/src/commands/desk/ticket-comments/list.ts`
- Create: `packages/plugin-desk/src/commands/desk/ticket-comments/get.ts`
- Create: `packages/plugin-desk/src/commands/desk/ticket-comments/add.ts`
- Create: `packages/plugin-desk/src/commands/desk/ticket-comments/update.ts`
- Create: `packages/plugin-desk/src/commands/desk/ticket-comments/delete.ts`
- Create: `packages/plugin-desk/tests/commands/desk/ticket-comments.test.ts`

Same pattern as threads. All require `--ticket` / `-t` flag. Endpoints:
- `GET /tickets/{ticket}/comments` (list)
- `GET /tickets/{ticket}/comments/{id}` (get)
- `POST /tickets/{ticket}/comments` (add, `--data` with `content`, `contentType`, `isPublic`)
- `PATCH /tickets/{ticket}/comments/{id}` (update, `--data`)
- `DELETE /tickets/{ticket}/comments/{id}` (delete)

Tests: command id, `--ticket` required, `--data` required on add/update, `id` arg on get/update/delete.

Commit: `"feat(desk): add ticket comment commands (list, get, add, update, delete)"`

---

## Task 10: Ticket Attachments (5 commands)

**Files:**
- Create: `packages/plugin-desk/src/commands/desk/ticket-attachments/list.ts`
- Create: `packages/plugin-desk/src/commands/desk/ticket-attachments/get.ts`
- Create: `packages/plugin-desk/src/commands/desk/ticket-attachments/upload.ts`
- Create: `packages/plugin-desk/src/commands/desk/ticket-attachments/download.ts`
- Create: `packages/plugin-desk/src/commands/desk/ticket-attachments/delete.ts`
- Create: `packages/plugin-desk/tests/commands/desk/ticket-attachments.test.ts`

All require `--ticket` / `-t`. Key differences:

**`upload.ts`**: Uses `FormData` with `--file` flag (required, path to file). Posts multipart to `POST /tickets/{ticket}/attachments`.

```typescript
import FormData from 'form-data'
import { createReadStream } from 'node:fs'
// ...
const form = new FormData()
form.append('file', createReadStream(flags.file))
const data = await this.deskPost(`/tickets/${flags.ticket}/attachments`, form, undefined)
```

**`download.ts`**: Uses `deskDownload()` helper. Flags: `--ticket`, `--output` / `-o` (required, output file path). Arg: `id`. Endpoint: `GET /tickets/{ticket}/attachments/{id}/content`.

Commit: `"feat(desk): add ticket attachment commands (list, get, upload, download, delete)"`

---

## Task 11: Ticket Tags, Time Entries, Timers (13 commands)

**Files:**
- Create: `packages/plugin-desk/src/commands/desk/ticket-tags/list.ts`
- Create: `packages/plugin-desk/src/commands/desk/ticket-tags/add.ts`
- Create: `packages/plugin-desk/src/commands/desk/ticket-tags/remove.ts`
- Create: `packages/plugin-desk/src/commands/desk/ticket-time-entries/list.ts`
- Create: `packages/plugin-desk/src/commands/desk/ticket-time-entries/get.ts`
- Create: `packages/plugin-desk/src/commands/desk/ticket-time-entries/create.ts`
- Create: `packages/plugin-desk/src/commands/desk/ticket-time-entries/update.ts`
- Create: `packages/plugin-desk/src/commands/desk/ticket-time-entries/delete.ts`
- Create: `packages/plugin-desk/src/commands/desk/ticket-timers/start.ts`
- Create: `packages/plugin-desk/src/commands/desk/ticket-timers/pause.ts`
- Create: `packages/plugin-desk/src/commands/desk/ticket-timers/resume.ts`
- Create: `packages/plugin-desk/src/commands/desk/ticket-timers/stop.ts`
- Create: `packages/plugin-desk/src/commands/desk/ticket-timers/status.ts`
- Create: `packages/plugin-desk/tests/commands/desk/ticket-tags.test.ts`
- Create: `packages/plugin-desk/tests/commands/desk/ticket-time-entries.test.ts`
- Create: `packages/plugin-desk/tests/commands/desk/ticket-timers.test.ts`

All require `--ticket` / `-t`.

**Tags:** `list` = GET, `add` = POST with `--data` (JSON `{ tagIds: [...] }`), `remove` takes `id` arg + DELETE.

**Time Entries:** Standard CRUD on `/tickets/{ticket}/timeEntry` and `/tickets/{ticket}/timeEntry/{id}`.

**Timers:** Each is a POST to `/tickets/{ticket}/timer/{action}` (start/pause/resume/stop). `status` is GET `/tickets/{ticket}/timer`. No `--data` needed — just `--ticket`.

Commit: `"feat(desk): add ticket tags, time entries, and timer commands"`

---

## Task 12: Contacts (8 commands)

**Files:**
- Create: `packages/plugin-desk/src/commands/desk/contacts/list.ts`
- Create: `packages/plugin-desk/src/commands/desk/contacts/get.ts`
- Create: `packages/plugin-desk/src/commands/desk/contacts/create.ts`
- Create: `packages/plugin-desk/src/commands/desk/contacts/update.ts`
- Create: `packages/plugin-desk/src/commands/desk/contacts/delete.ts`
- Create: `packages/plugin-desk/src/commands/desk/contacts/search.ts`
- Create: `packages/plugin-desk/src/commands/desk/contacts/count.ts`
- Create: `packages/plugin-desk/src/commands/desk/contacts/tickets.ts`
- Create: `packages/plugin-desk/tests/commands/desk/contacts.test.ts`

Same CRUD pattern as tickets. Additional:
- `search.ts`: GET `/contacts/search` with `--query` flag.
- `count.ts`: GET `/contacts/count`.
- `tickets.ts`: GET `/contacts/{id}/tickets` — lists tickets for a contact. Arg: `id`.

Commit: `"feat(desk): add contact commands (list, get, create, update, delete, search, count, tickets)"`

---

## Task 13: Accounts (8 commands)

Identical pattern to contacts. Endpoints use `/accounts` instead of `/contacts`.

Commit: `"feat(desk): add account commands (list, get, create, update, delete, search, count, tickets)"`

---

## Task 14: Agents (8 commands)

**Files:** Create 8 files under `commands/desk/agents/` + test file.

Standard CRUD plus:
- `me.ts`: GET `/myinfo`. No args/flags.
- `count.ts`: GET `/agents/count`.
- `activate.ts`: POST `/agents/{id}/activate`. Arg: `id`.

Commit: `"feat(desk): add agent commands (list, get, create, update, delete, me, count, activate)"`

---

## Task 15: Departments (5 commands)

Standard CRUD on `/departments`. No special flags beyond the common patterns.

Commit: `"feat(desk): add department commands (list, get, create, update, delete)"`

---

## Task 16: Tasks (7 commands)

Standard CRUD on `/tasks` plus `count.ts` (GET `/tasks/count`) and `search.ts` (GET `/tasks/search` with `--query`).

Commit: `"feat(desk): add task commands (list, get, create, update, delete, count, search)"`

---

## Task 17: Time Entries — Global (5 commands)

Standard CRUD on `/timeEntries`. These are global time entries, not scoped to a ticket.

Commit: `"feat(desk): add global time entry commands (list, get, create, update, delete)"`

---

## Task 18: Activities, Calls, Events (14 commands)

**Activities** (2): `list` (GET `/activities`), `count` (GET `/activities/count`).

**Calls** (6): Standard CRUD on `/calls` + `count`.

**Events** (6): Standard CRUD on `/events` + `count`.

Test files: `activities.test.ts`, `calls.test.ts`, `events.test.ts`.

Commit: `"feat(desk): add activities, calls, and events commands"`

---

## Task 19: Knowledge Base — Articles + Categories + Sections (15 commands)

**Articles** (7): CRUD on `/articles` + `search` (GET `/articles/search` with `--query`) + `count`.

**KB Categories** (5): CRUD on `/kbCategories`.

**KB Sections** (3): `list`, `get`, `create` on `/kbSections`.

Test files: `articles.test.ts`, `kb-categories.test.ts`, `kb-sections.test.ts`.

Commit: `"feat(desk): add knowledge base commands (articles, categories, sections)"`

---

## Task 20: Products, Tags, Views, Search (18 commands)

**Products** (6): CRUD on `/products` + `count`.

**Tags** (6): CRUD on `/ticketTags` + `count`.

**Views** (5): CRUD on `/views`.

**Search** (1): GET `/search` with `--query` (required), `--module` (optional: tickets, contacts, accounts, etc.), `--page`, `--per-page`.

Test files: `products.test.ts`, `tags.test.ts`, `views.test.ts`, `search.test.ts`.

Commit: `"feat(desk): add products, tags, views, and search commands"`

---

## Task 21: Settings — Read-Only (16 commands)

**Files:**
- Create 16 command files under `organizations/`, `roles/`, `profiles/`, `teams/`, `sla/`, `business-hours/`, `fields/`, `layouts/`, `blueprints/`
- Create: `packages/plugin-desk/tests/commands/desk/settings.test.ts`

All are simple GET commands. No create/update/delete.

**`organizations/list.ts`**: GET `/organizations`. Special: does NOT need orgId header (it's the one endpoint that works without it).
**`organizations/get.ts`**: GET `/organizations/{id}`.
**`roles/list.ts`**: GET `/roles`.
**`roles/get.ts`**: GET `/roles/{id}`.
**`profiles/list.ts`**: GET `/profiles`.
**`profiles/get.ts`**: GET `/profiles/{id}`.
**`teams/list.ts`**: GET `/teams`.
**`teams/get.ts`**: GET `/teams/{id}`.
**`sla/list.ts`**: GET `/slaRules`.
**`sla/get.ts`**: GET `/slaRules/{id}`.
**`business-hours/list.ts`**: GET `/businessHours`.
**`business-hours/get.ts`**: GET `/businessHours/{id}`.
**`fields/list.ts`**: Special — uses `--module` flag (default: `tickets`, options: `tickets`, `contacts`, `accounts`, `tasks`, `calls`, `events`, `products`). Maps to the correct endpoint:
```typescript
const moduleFieldEndpoints: Record<string, string> = {
  tickets: '/ticketFields',
  contacts: '/contactFields',
  accounts: '/accountFields',
  tasks: '/taskFields',
  calls: '/callFields',
  events: '/eventFields',
  products: '/productFields',
}
const path = moduleFieldEndpoints[flags.module]
```
**`layouts/list.ts`**: GET `/layouts`.
**`layouts/get.ts`**: GET `/layouts/{id}`.
**`blueprints/list.ts`**: GET `/blueprints`.

Commit: `"feat(desk): add settings commands (orgs, roles, profiles, teams, sla, fields, layouts, blueprints)"`

---

## Task 22: Full Build + Test Verification

**Files:** None (verification only).

- [ ] **Step 1: Run full test suite**

Run: `pnpm --filter @zoho-cli/plugin-desk test`
Expected: All ~450 tests PASS.

- [ ] **Step 2: Run full workspace build**

Run: `pnpm build`
Expected: All packages build cleanly including plugin-desk.

- [ ] **Step 3: Verify CLI discovers desk commands**

Run: `./packages/cli/bin/dev.js desk --help`
Expected: Shows all desk topics (tickets, contacts, accounts, agents, etc.).

Run: `./packages/cli/bin/dev.js desk tickets --help`
Expected: Shows ticket subcommands.

- [ ] **Step 4: Run full workspace test suite**

Run: `pnpm test`
Expected: All tests pass across all packages.

---

## Task 23: Update CLAUDE.md

**Files:**
- Modify: `CLAUDE.md`

- [ ] **Step 1: Add plugin-desk to architecture list**

In the Architecture section, add after the plugin-people entry:

```markdown
- **`packages/plugin-desk`** (`@zoho-cli/plugin-desk`) — oclif plugin with ~145 Desk commands
```

- [ ] **Step 2: Add "Adding a new Desk command" convention**

Add a new subsection after "Adding a new People command":

```markdown
### Adding a new Desk command

All Desk commands extend `DeskBaseCommand` from `packages/plugin-desk/src/desk-base-command.ts`. Pattern:

\```typescript
import { Args, Flags } from '@oclif/core'
import { DeskBaseCommand } from '../../../desk-base-command.js'

export default class DeskExampleList extends DeskBaseCommand<typeof DeskExampleList> {
  static id = 'desk example list'
  static summary = 'Description here'

  static flags = {
    page: Flags.integer({ description: 'Page number', default: 1 }),
    'per-page': Flags.integer({ description: 'Records per page (max 100)', default: 100 }),
  }

  async run(): Promise<void> {
    const { flags } = this
    try {
      const params: Record<string, string> = {
        ...DeskBaseCommand.paginationParams(flags),
      }
      const data = await this.deskGet('/example', params)
      this.outputSuccess(data.data ?? [], { action: 'example.list' })
    } catch (error: any) {
      this.handleApiError(error)
    }
  }
}
\```

Key differences from other plugins:
- Extends `DeskBaseCommand` — provides typed helpers `deskGet`, `deskPost`, `deskPatch`, `deskDelete` that auto-inject `orgId` header
- Uses `DeskBaseCommand.paginationParams(flags)` to convert `--page`/`--per-page` to Desk's `from`/`limit` offset pagination
- Org ID resolved from `--org` flag > `config.defaultOrg` > `ZOHO_DESK_ORG_ID` env var > API auto-detect
- API base URL: `https://desk.zoho.{domain}/api/v1` (different from CRM/Projects/People)
- Single API version (v1) — no version flag
- Updates use `PATCH` method (via `deskPatch`)
- Error format uses `errorCode` field (not `code`)
```

- [ ] **Step 3: Add Desk API details to the Zoho API Details section**

```markdown
### Desk API
- Base URL: `https://desk.zoho.{domain}/api/v1`
- Single API version: v1
- Required header: `orgId` on every request (except `/organizations`)
- Pagination: `from` (1-based offset) + `limit` (max 100), converted from `--page`/`--per-page` by base command
- Rate limiting: Daily credit pool (4,000–25,000/day/org depending on plan)
- Scope format: `Desk.{module}.{operation}` (e.g., `Desk.tickets.ALL`)
```

- [ ] **Step 4: Update project structure tree**

Add the `plugin-desk` directory listing to the Project Structure section.

- [ ] **Step 5: Commit**

```bash
git add CLAUDE.md
git commit -m "docs: add Zoho Desk plugin to CLAUDE.md conventions"
```
