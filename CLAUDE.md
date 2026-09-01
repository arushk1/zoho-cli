# Zoho CLI

CLI tool for managing Zoho applications (CRM, Books, Billing, Payments, People, and more). Built with TypeScript, oclif v4, and pnpm workspaces. Designed for LLM/Claude consumption with JSON-only output.

## Architecture

Monorepo with 9 plugin packages plus core and cli:

- **`packages/core`** (`@zoho-cli/core`) — Shared library: config, OAuth2 auth, HTTP client, JSON output envelopes
- **`packages/cli`** (`@zoho-cli/cli`) — oclif CLI entry point with `auth` and `config` commands
- **`packages/plugin-crm`** (`@zoho-cli/plugin-crm`) — oclif plugin with 65 CRM commands
- **`packages/plugin-projects`** (`@zoho-cli/plugin-projects`) — oclif plugin with 87 Projects commands
- **`packages/plugin-people`** (`@zoho-cli/plugin-people`) — oclif plugin with 100 People commands
- **`packages/plugin-desk`** (`@zoho-cli/plugin-desk`) — oclif plugin with 151 Desk commands
- **`packages/plugin-bookings`** (`@zoho-cli/plugin-bookings`) — oclif plugin with 29 Bookings commands
- **`packages/plugin-books`** (`@zoho-cli/plugin-books`) — oclif plugin with 167 Books commands
- **`packages/plugin-expense`** (`@zoho-cli/plugin-expense`) — oclif plugin with 73 Expense commands
- **`packages/plugin-billing`** (`@zoho-cli/plugin-billing`) — oclif plugin with 44 Billing commands
- **`packages/plugin-payments`** (`@zoho-cli/plugin-payments`) — oclif plugin with 18 Payments commands

## Build & Test

```bash
pnpm build          # Build all packages (core -> plugins -> cli)
pnpm test           # Run all tests across all packages
pnpm --filter @zoho-cli/core test            # Test core only
pnpm --filter @zoho-cli/cli test             # Test cli only
pnpm --filter @zoho-cli/plugin-crm test      # Test CRM plugin only
pnpm --filter @zoho-cli/plugin-projects test # Test Projects plugin only
pnpm --filter @zoho-cli/plugin-people test      # Test People plugin only
pnpm --filter @zoho-cli/plugin-bookings test   # Test Bookings plugin only
pnpm --filter @zoho-cli/plugin-billing test    # Test Billing plugin only
pnpm --filter @zoho-cli/plugin-payments test   # Test Payments plugin only
```

Each package has two tsconfigs:
- `tsconfig.json` — IDE (includes `src/` + `tests/`, `noEmit: true`)
- `tsconfig.build.json` — Build (includes `src/` only, emits to `dist/`)

Build scripts use `tsc -p tsconfig.build.json`. Build order matters: core first, then plugins (crm, projects, people in parallel), then cli.

CI runs `pnpm build && pnpm test` on every push and PR, and `.github/workflows/claude-issue.yml` auto-triages every new GitHub issue — fixing and opening a PR when the bug is provable without live Zoho credentials, otherwise commenting its triage and applying `needs-human`. Never add real Zoho credentials to CI; tests use fixtures and mocks only.

## Code Conventions

### Adding a new CRM command

All CRM commands extend `CrmBaseCommand` from `packages/plugin-crm/src/crm-base-command.ts`. Pattern:

```typescript
import { Args, Flags } from '@oclif/core'
import { CrmBaseCommand } from '../../../crm-base-command.js'

export default class CrmExampleList extends CrmBaseCommand<typeof CrmExampleList> {
  static id = 'crm example list'
  static summary = 'Description here'

  static args = {
    module: Args.string({ description: 'CRM module API name', required: true }),
  }

  static flags = {
    page: Flags.integer({ description: 'Page number', default: 1 }),
  }

  async run(): Promise<void> {
    const { args, flags } = this
    try {
      const { data } = await this.apiClient.get(`/${args.module}`, { params: { page: String(flags.page) } })
      this.outputSuccess(data.data ?? [], { module: args.module, action: 'example.list' })
    } catch (error: any) {
      this.handleApiError(error)
    }
  }
}
```

Key points:
- `static id` must use spaces (oclif topic separator): `'crm records list'`, not `'crm:records:list'`
- Import path to `crm-base-command.js` depends on directory depth (e.g., `../../` for `commands/crm/`, `../../../` for `commands/crm/records/`)
- Always use `.js` extension in imports (ESM)
- Wrap API calls in try/catch with `this.handleApiError(error)`
- Use `this.outputSuccess(data, meta?)` for JSON output
- Use `this.outputError(code, message)` for error output
- Write operations should support `--dry-run` flag
- Read operations should support `--fields` flag where applicable

### Adding a new Projects command

All Projects commands extend `ProjectsBaseCommand` from `packages/plugin-projects/src/projects-base-command.ts`. Pattern:

```typescript
import { Args, Flags } from '@oclif/core'
import { ProjectsBaseCommand } from '../../../projects-base-command.js'

export default class ProjectsExampleList extends ProjectsBaseCommand<typeof ProjectsExampleList> {
  static id = 'projects example list'
  static summary = 'Description here'

  static flags = {
    project: Flags.string({ description: 'Project ID', required: true, char: 'p' }),
    page: Flags.integer({ description: 'Page number', default: 1 }),
  }

  async run(): Promise<void> {
    const { flags } = this
    try {
      const { data } = await this.apiClient.get(this.projectPath(flags.project, '/example'), { params: { page: String(flags.page) } })
      this.outputSuccess(data.example ?? [], { action: 'example.list' })
    } catch (error: any) {
      this.handleApiError(error)
    }
  }
}
```

Key differences from CRM commands:
- Extends `ProjectsBaseCommand` (not `CrmBaseCommand`)
- Uses `this.portalPath('/path')` for portal-scoped endpoints → `/portal/{portalId}/path`
- Uses `this.projectPath(projectId, '/path')` for project-scoped endpoints → `/portal/{portalId}/projects/{projectId}/path`
- Portal ID resolved from `--portal` flag > `config.defaultPortal` > `ZOHO_PORTAL_ID` env var
- API base URL: `https://projectsapi.zoho.{domain}/api/v3` (different from CRM)
- V3 API pagination uses `page_info.has_next_page` (not `info.more_records`)

### Adding a new People command

All People commands extend `PeopleBaseCommand` from `packages/plugin-people/src/people-base-command.ts`. Pattern:

```typescript
import { Args, Flags } from '@oclif/core'
import { PeopleBaseCommand } from '../../../people-base-command.js'

export default class PeopleExampleList extends PeopleBaseCommand<typeof PeopleExampleList> {
  static id = 'people example list'
  static summary = 'Description here'

  static flags = {
    page: Flags.integer({ description: 'Page number', default: 1 }),
  }

  async run(): Promise<void> {
    const { flags } = this
    try {
      const result = await this.formSearch('example', [], { sIndex: flags.page, limit: 200 })
      this.outputSuccess(result, { action: 'example.list' })
    } catch (error: any) {
      this.handleApiError(error)
    }
  }
}
```

Key differences from CRM/Projects:
- Extends `PeopleBaseCommand` — provides form CRUD helpers and response normalization
- Form CRUD: `this.formInsert(form, data)`, `this.formUpdate(form, id, data)`, `this.formGetById(form, id)`, `this.formSearch(form, params)`
- Timetracker: `this.timetrackerRequest(path, params)` handles GET-as-write pattern
- Response unwrapping: `this.extractResult(data)` handles `{ response: { result: ... } }` envelope
- API base URL: `https://people.zoho.{domain}` (paths vary: `/people/api/...`, `/api/v2/...`, `/api/v3/...`)
- No portal ID needed (unlike Projects)
- Many legacy endpoints use form-encoded requests — base command helpers handle this transparently
- Scope format: `ZOHOPEOPLE.{module}.{operation}` (e.g., `ZOHOPEOPLE.forms.ALL`)

### Adding a new Desk command

All Desk commands extend `DeskBaseCommand` from `packages/plugin-desk/src/desk-base-command.ts`. Pattern:

```typescript
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
```

Key differences from other plugins:
- Extends `DeskBaseCommand` — provides typed helpers `deskGet`, `deskPost`, `deskPatch`, `deskDelete` that auto-inject `orgId` header
- Uses `DeskBaseCommand.paginationParams(flags)` to convert `--page`/`--per-page` to Desk's `from`/`limit` offset pagination
- Org ID resolved from `--org` flag > `config.defaultOrg` > `ZOHO_DESK_ORG_ID` env var > API auto-detect
- API base URL: `https://desk.zoho.{domain}/api/v1` (different from CRM/Projects/People)
- Single API version (v1) — no version flag
- Updates use `PATCH` method (via `deskPatch`)
- Error format uses `errorCode` field (not `code`)

### Adding a new Bookings command

All Bookings commands extend `BookingsBaseCommand` from `packages/plugin-bookings/src/bookings-base-command.ts`. Pattern:

```typescript
import { Flags } from '@oclif/core'
import { BookingsBaseCommand } from '../../../bookings-base-command.js'

export default class BookingsExampleList extends BookingsBaseCommand<typeof BookingsExampleList> {
  static id = 'bookings example list'
  static summary = 'Description here'

  static flags = {
    staff: Flags.string({ description: 'Filter by staff ID' }),
  }

  async run(): Promise<void> {
    try {
      const workspace = await this.resolveWorkspaceId()
      const params: Record<string, string | undefined> = { workspace_id: workspace }
      if (this.flags.staff) params.staff_id = this.flags.staff
      const result = await this.bookingsGet<any>('example', params)
      const data = Array.isArray(result) ? result : (result?.data ?? result)
      this.outputSuccess(data, { action: 'example.list' })
    } catch (error: any) {
      this.handleApiError(error)
    }
  }
}
```

Key differences from other plugins:

- Extends `BookingsBaseCommand` — provides `bookingsGet(action, params)` and `bookingsPostForm(action, fields)`. Both auto-prefix the path with `/json/` and unwrap the `{ response: { returnvalue, logMessage, status } }` envelope.
- Workspace ID resolved from `--workspace` flag > `config.defaultBookingsWorkspace` > `ZOHO_BOOKINGS_WORKSPACE_ID` env var > API auto-detect.
- Complex fields on POST (e.g. `customer_details`, `dataMap`, `staffMap`) are passed as plain JS objects/arrays in the `fields` argument — the base command serializes them as JSON strings inside `application/x-www-form-urlencoded`.
- Use `bookingsDateTimeFlag` from `./date-format.js` for any date/time flag. It accepts ISO 8601 from users and sends `dd-MMM-yyyy HH:mm:ss` to Zoho. Pass `dateOnly: true` for date-only fields like `selected_date` or staff `dob`.
- `[EXPERIMENTAL]`-prefixed commands target undocumented endpoints (service/staff update+delete, resource create/update/delete). These may break; document in summary text.
- Appointment state transitions are split into three verbs (`complete`, `cancel`, `noshow`) all hitting `/updateappointment` with different `action` values.

### Adding a new Books / Expense / Billing command

These three plugins share the same shape: a base command with typed HTTP helpers that inject the org context, `{ code, message }` error envelopes, and `page`/`per_page` + `page_context.has_more_page` pagination.

- **Books** commands extend `BooksBaseCommand` (`packages/plugin-books/src/books-base-command.ts`): helpers `booksGet/Post/Put/Delete` append the org as the `organization_id` **query param**. Org resolved from `--org` flag > `config.defaultOrg` > `ZOHO_ORG_ID` env > auto-detect via `GET /organizations`.
- **Expense** commands extend `ExpenseBaseCommand` (`packages/plugin-expense/src/expense-base-command.ts`) with the same pattern.
- **Billing** commands extend `BillingBaseCommand` (`packages/plugin-billing/src/billing-base-command.ts`): helpers `billingGet/Post/Put/Delete` send the org as the `X-com-zoho-subscriptions-organizationid` **header** (legacy Subscriptions name). Org resolved from `--org` flag > `config.defaultBillingOrg` > `ZOHO_BILLING_ORG_ID` env > auto-detect via `GET /organizations`. Plans/addons/coupons are keyed by `plan_code`/`addon_code`/`coupon_code` (not numeric IDs). `billing raw get` is a read-only passthrough for unwrapped endpoints.

Write operations take `--data`/`-d` (JSON string) and support `--dry-run`. Success payloads unwrap the resource key (e.g. `data.invoice ?? data`).

### Adding a new Payments command

All Payments commands extend `PaymentsBaseCommand` from `packages/plugin-payments/src/payments-base-command.ts`.

```typescript
import { Flags } from '@oclif/core'
import { PaymentsBaseCommand } from '../../payments-base-command.js'

export default class PayExampleList extends PaymentsBaseCommand<typeof PayExampleList> {
  static id = 'payments example list'
  static summary = 'Description here'

  static flags = {
    page: Flags.integer({ description: 'Page number', default: 1 }),
    'per-page': Flags.integer({ description: 'Results per page (max 200)', default: 25 }),
  }

  async run(): Promise<void> {
    const { flags } = this
    try {
      const data = await this.paymentsGet('/example', { page: String(flags.page), per_page: String(flags['per-page']) })
      this.outputSuccess(data.examples ?? [], { action: 'payments.example.list' })
    } catch (error: any) {
      this.handleApiError(error)
    }
  }
}
```

Key differences from other plugins:
- Helpers `paymentsGet/Post/Put` inject the mandatory `account_id` query param on every request
- Account ID resolved from `--account` flag > `config.defaultPaymentsAccount` > `ZOHO_PAYMENTS_ACCOUNT_ID` env var — **no auto-detect exists**; commands hard-fail with `ACCOUNT_MISSING` (exit 3) if unset
- Region-limited: hosts come from `PAYMENTS_REGION_DOMAINS` (only `in` → `payments.zoho.in`, `us` → `payments.zoho.com`); other regions fail with `REGION_UNSUPPORTED` (exit 3)
- Zoho documents no list endpoints for refunds, payment links, customers, or mandates — `payments raw get` covers those gaps
- Payment-link cancel/update use `PUT` (not POST); refund create is nested (`POST /payments/{payment_id}/refunds`) while refund get is top-level (`GET /refunds/{refund_id}`)

### Adding a new CLI command

CLI commands extend `BaseCommand` from `packages/cli/src/base-command.ts`. Same pattern but without CRM-specific features (no `apiClient`, no `moduleCache`).

### Output format

All output is strict JSON to stdout. Stderr for progress/warnings only.

Success: `{ "success": true, "data": ..., "meta": { "module", "action", "page", "perPage", "hasMore", "count" } }`

Error: `{ "success": false, "error": { "code", "message", "zohoErrorCode?", "details?" } }`

Exit codes: `0` success, `1` API error, `2` auth error, `3` config/usage error.

### Testing

- Framework: vitest
- Tests live in `packages/*/tests/` mirroring the `src/` structure
- CRM command tests validate static metadata (id, required args/flags) since API calls require live auth
- CLI tests use oclif's `Config.load()` pattern to instantiate and run commands with mocked `log()`
- Run with `pnpm --filter <package> test`

## Project Structure

```
packages/
  core/src/
    config/    — Config schema (zod), read/write ~/.zoho-cli/config.json, env var overrides
    auth/      — OAuth2 URL builders, token exchange/refresh, token store, callback server
    http/      — ZohoApiClient (axios wrapper), rate limiter, paginator
    output/    — JSON envelope formatters (formatSuccess, formatError, formatOutput)
  cli/src/
    base-command.ts           — Shared base with --pretty flag, config loading, output helpers
    commands/auth/            — setup, login, status, logout
    commands/config/          — set, get, list
  plugin-crm/src/
    crm-base-command.ts       — CRM base with --api-version flag, lazy apiClient, moduleCache
    module-cache.ts           — Caches CRM module names to ~/.zoho-cli/cache/
    commands/crm/
      records/                — CRUD + upsert, search, clone, count, deleted, timeline, blueprint, change-owner, merge, share, lock, mass-update, mass-delete
      notes/                  — list, get, create, update, delete
      attachments/            — list, upload, download, delete
      tags/                   — list, create, update, delete, add, remove
      leads/                  — convert
      bulk-read/              — create, status, download
      bulk-write/             — upload, create, status, download
      email/                  — list, send
      notifications/          — list, enable, disable
      related/                — list
      modules/                — list, get
      fields/                 — list, get
      layouts/                — list
      pipelines/              — list
      custom-views/           — list
      org/                    — info
      users/                  — list, get
      roles/                  — list
      profiles/               — list
      territories/            — list
      variables/              — list
      currencies/             — list
      scoring-rules/          — list
      query.ts                — COQL queries
      composite.ts            — Composite API (up to 5 sub-requests)
  plugin-projects/src/
    projects-base-command.ts  — Projects base with --portal flag, lazy apiClient, portalPath/projectPath helpers
    commands/projects/
      list, get, create, update, delete — Project CRUD
      search.ts               — Portal-wide and project-scoped search
      portals/                — list, get
      tasks/                  — list, my, get, create, update, delete, move, count
      tasklists/              — list, get, create, update, delete
      phases/                 — list, get, create, update, delete
      issues/                 — list, get, create, update, delete, move, clone
      timelogs/               — list, get, create, update, delete
      timers/                 — list, start, pause, resume, stop
      users/                  — list, get, add, update, activate, deactivate
      teams/                  — list, get, create, update, delete
      tags/                   — list, create, update, delete, associate, dissociate
      forums/                 — list, get, create, update, delete
      events/                 — list, get, create, update, delete
      comments/               — list, create, update, delete (generic, entity-scoped)
      attachments/            — list, upload, delete
      dashboards/             — list, get, create, update, delete
      blueprints/             — list, transitions, execute
      feed/                   — list, create
  plugin-desk/src/
    desk-base-command.ts       — Desk base with --org flag, lazy apiClient, deskGet/Post/Patch/Delete helpers, paginationParams
    commands/desk/
      search.ts                — Cross-module search
      tickets/                 — CRUD + move, merge, split, close, spam, unspam, count, search, history, metrics, blueprint
        resolution/            — get, add, update, delete
      threads/                 — list, get, reply, draft
      ticket-comments/         — list, get, add, update, delete
      ticket-attachments/      — list, get, upload, download, delete
      ticket-tags/             — list, add, remove
      ticket-time-entries/     — list, get, create, update, delete
      ticket-timers/           — start, pause, resume, stop, status
      contacts/                — CRUD + search, count, tickets
      accounts/                — CRUD + search, count, tickets
      agents/                  — CRUD + me, count, activate
      departments/             — CRUD
      tasks/                   — CRUD + count, search
      time-entries/            — CRUD (global)
      activities/              — list, count
      calls/                   — CRUD + count
      events/                  — CRUD + count
      articles/                — CRUD + search, count
      kb-categories/           — CRUD
      kb-sections/             — list, get, create
      products/                — CRUD + count
      tags/                    — CRUD + count
      views/                   — CRUD
      organizations/           — list, get
      roles/                   — list, get
      profiles/                — list, get
      teams/                   — list, get
      sla/                     — list, get
      business-hours/          — list, get
      fields/                  — list (with --module flag)
      layouts/                 — list, get
      blueprints/              — list
  plugin-people/src/
    people-base-command.ts    — People base with form CRUD helpers, timetracker helper, response normalization
    commands/people/
      forms/                  — list, fields, insert, update, get, search (generic form CRUD)
      employees/              — list, get, add, update, search
      leave/                  — types, apply, get, list, cancel, balance, holidays, user-report, booked-report, compensatory, encashment-report, lop-report, customize-balance
      attendance/             — checkin, checkout, entries, report, bulk-import, shift-config, shift-update, regularization, latest
      timetracker/
        clients/              — list, get, add, update, delete
        projects/             — list, get, add, update, delete, status
        jobs/                 — list, get, add, update, delete, status
        timelogs/             — list, get, add, update, delete, bulk
        timer/                — start, pause, current, comments
        timesheets/           — list, get, create, update, delete, approve
        payroll-report.ts     — Payroll report with direct-subs-only filter
      cases/                  — list, my, view, add, categories
      announcements/          — get, add, update, delete, toggle
      files/                  — list, upload, download, delete, add-folder
      organization/           — info, entities, units, divisions
      onboarding/             — add-candidate, update-candidate, trigger
      lms/                    — enroll, unenroll, categories
        courses/              — list, my, get, create, update, delete
      separation/             — add, list
  plugin-bookings/src/
    bookings-base-command.ts   — Bookings base with --workspace flag, bookingsGet/bookingsPostForm helpers, envelope unwrap, workspace resolution
    date-format.ts             — ISO 8601 <-> dd-MMM-yyyy HH:mm:ss + bookingsDateTimeFlag builder
    envelope.ts                — extractBookingsResult + BookingsApiError
    form-encode.ts             — serializeBookingsForm (URLSearchParams, JSON-stringifies nested)
    commands/bookings/
      workspaces/              — list, get, create, update, delete
      services/                — list, get, create, update*, delete*    (* experimental)
      staff/                   — list, get, search, add, update*, delete*
      resources/               — list, get, create*, update*, delete*
      availability/            — slots
      appointments/            — list, get, book, reschedule, complete, cancel, noshow
  plugin-books/src/
    books-base-command.ts      — Books base with --org flag, booksGet/Post/Put/Delete helpers (org as organization_id query param), org auto-detect
    commands/books/            — organizations, contacts, contact-persons, invoices, estimates, sales-orders, purchase-orders, bills, credit-notes, vendor-credits, customer-payments, vendor-payments, expenses, items, chart-of-accounts, bank-accounts, journals, currencies, taxes, projects, time-entries, users, recurring-invoices, recurring-bills, raw
  plugin-expense/src/
    expense-base-command.ts    — Expense base, same shape as Books
    commands/expense/          — reports, expenses, trips, advances, users, ...
  plugin-billing/src/
    billing-base-command.ts    — Billing base with --org flag, billingGet/Post/Put/Delete helpers (org as X-com-zoho-subscriptions-organizationid header), org auto-detect
    commands/billing/
      organizations/           — list
      customers/               — list, get, create, update, delete
      plans/                   — list, get, create, update, delete (keyed by plan_code)
      addons/                  — list, get, create, update, delete (keyed by addon_code)
      coupons/                 — list, get, create, update, delete (keyed by coupon_code)
      subscriptions/           — list, get, create, update, cancel (--at-end), reactivate
      invoices/                — list, get, void, send, write-off
      payments/                — list, get, create, update, delete
      credit-notes/            — get, create, void, apply (no list endpoint documented)
      hosted-pages/            — list, get
      raw/                     — get (read-only passthrough)
  plugin-payments/src/
    payments-base-command.ts   — Payments base with --account flag, paymentsGet/Post/Put helpers (mandatory account_id param), in/us-only host map
    commands/payments/
      list.ts, get.ts          — payments list/get (top-level)
      refunds/                 — create (nested under payment), get
      payment-links/           — create, get, update, cancel
      customers/               — create, get
      payouts/                 — list, get
      mandates/                — get, notify, execute
      sessions/                — create, get
      raw/                     — get (read-only passthrough)
```

## Zoho API Details

### CRM API
- Base URL: `https://www.zohoapis.{domain}/crm/{version}`
- API version: v7 default, `--api-version v8` for v8-only features
- Rate limiting: Client reads `X-RATELIMIT-REMAINING` headers and backs off automatically

### Projects API (V3)
- Base URL: `https://projectsapi.zoho.{domain}/api/v3/portal/{portalId}/...`
- Portal ID required for all endpoints (set via `--portal` flag, `ZOHO_PORTAL_ID` env, or `zoho config set defaultPortal <id>`)
- Pagination: `page`/`per_page` params, response includes `page_info.has_next_page`
- Rate limiting: 100 requests per 2 minutes per user (no response headers, client-side aware)
- Scope format: `ZohoProjects.{module}.{operation}` (e.g., `ZohoProjects.tasks.ALL`)

### People API
- Base URL: `https://people.zoho.{domain}` (paths vary by API generation)
- Legacy endpoints: `/people/api/...` (forms, attendance, timetracker, announcements, files)
- V2 endpoints: `/api/v2/leavetracker/...` (leave management)
- V3 endpoints: `/api/v3/organization`, `/people/api/v3/orgstructure/...`
- LMS endpoints: `/api/v1/courses/...`
- Form-based architecture: all modules are "forms" with generic CRUD via `formLinkName`
- Rate limiting: varies by endpoint (30-400 req/5min), no response headers, 5-min lock on exceed
- Scope format: `ZOHOPEOPLE.{module}.{operation}` (e.g., `ZOHOPEOPLE.forms.ALL`)
- Team management: `--data-select` flag (MINE/SUBS/DIRSUBS/ALL) on leave list, compensatory

### Desk API
- Base URL: `https://desk.zoho.{domain}/api/v1`
- Single API version: v1
- Required header: `orgId` on every request (except `/organizations`)
- Pagination: `from` (1-based offset) + `limit` (max 100), converted from `--page`/`--per-page` by base command
- Rate limiting: Daily credit pool (4,000–25,000/day/org depending on plan)
- Scope format: `Desk.{module}.{operation}` (e.g., `Desk.tickets.ALL`)

### Bookings API
- Base URL: `https://www.zohoapis.{domain}/bookings/v1/json/{action}` (action-style, not REST)
- Single API version: v1
- Single OAuth scope: `zohobookings.data.CREATE` (covers every operation)
- All POST bodies: `application/x-www-form-urlencoded`; complex fields are JSON-stringified as single form values
- Date-time format: `dd-MMM-yyyy HH:mm:ss` (e.g. `30-Apr-2026 14:30:00`); treated as workspace-local per Settings → General
- Pagination: only `/fetchappointment` paginates (`page`, `per_page` ≤ 100; ≤ 60 with `need_customer_more_info=true`); `next_page_available` in response
- Rate limits: daily per-user quota (250/1000/3000 by plan); no rate-limit response headers
- Error envelope: `{ response: { logMessage: [...], status: !== "success" } }` — no formal error codes
- No webhooks (Zoho Flow is the official integration path)
- Workspace ID resolved from `--workspace` flag > `config.defaultBookingsWorkspace` > `ZOHO_BOOKINGS_WORKSPACE_ID` env > auto-detect first workspace

### Billing API
- Base URL: `https://www.zohoapis.{domain}/billing/v1` (formerly Zoho Subscriptions; docs migrated from `subscriptions/v1`)
- Single API version: v1
- Required header: `X-com-zoho-subscriptions-organizationid` on every request (legacy name retained; header, unlike Books' query param)
- Pagination: `page`/`per_page` params, response includes `page_context.has_more_page`
- Rate limiting: 100 req/min/org, plan-based daily cap (~1k–5k/day), no rate-limit response headers
- Scope format: `ZohoSubscriptions.{resource}.{operation}` — the prefix is still `ZohoSubscriptions`, not `ZohoBilling`; default login uses `ZohoSubscriptions.fullaccess.all`
- Error envelope: `{ code, message }` with `code: 0` = success

### Payments API
- Base URL: `https://payments.zoho.{in|com}/api/v1` — dedicated host, NOT on `zohoapis.*`; only India and US regions exist
- Single API version: v1
- Mandatory `account_id` query param on every request (from Payments dashboard → Settings → Account Details); no auto-detect endpoint
- OAuth divergence: consent uses the org-scoped endpoint `accounts.zoho.{dc}/oauth/v2/org/auth` with `soid=zohopay.{account_id}` — run `zoho auth login --payments-account <id>` to mint tokens that include `ZohoPay.*` scopes (token/refresh endpoints are standard)
- Scope format: `ZohoPay.{module}.{operation}` (e.g. `ZohoPay.payments.READ`); sandbox uses `ZohoPaySandbox.*` + `soid=zohopaysandbox.{account_id}` (not yet wired into the CLI)
- Pagination: `page`/`per_page` (default 25, max 200); no `has_more_page` indicator documented
- Rate limiting: 600 req/min (payments/customers), 60 req/min (refunds); no rate-limit response headers
- Card capture is a browser-widget flow — the CLI surface is payments, refunds, payment links, customers, payouts, mandates, sessions

### Common
- Region: India (.in) default, configurable via `zoho config set region <region>`
- Auth: OAuth2 with browser-based consent flow, tokens at `~/.zoho-cli/tokens.json`
- Config: `~/.zoho-cli/config.json`
- Env var overrides: `ZOHO_CLIENT_ID`, `ZOHO_CLIENT_SECRET`, `ZOHO_REFRESH_TOKEN`, `ZOHO_REGION`, `ZOHO_PORTAL_ID`, `ZOHO_BILLING_ORG_ID`, `ZOHO_PAYMENTS_ACCOUNT_ID`
- Token refresh: 401 responses trigger automatic refresh + retry

## Future Scope

- MCP server layer (share API client with CLI)
- Zoho Payroll plugin
- Zoho Payments sandbox mode (`ZohoPaySandbox.*` scopes + sandbox soid/host)
- Auto-generation from Zoho OpenAPI specs (`github.com/zoho/crm-oas`)
