# Zoho Desk Plugin Design Spec

## Overview

Add `@zoho-cli/plugin-desk` to the Zoho CLI monorepo — a new oclif plugin providing CLI access to the Zoho Desk helpdesk API. Scope B: ~145 commands covering core entities, ticket sub-resources, activities, knowledge base, and key settings. Single API version (v1).

## API Fundamentals

- **Base URL**: `https://desk.zoho.{tld}/api/v1`
- **Required header**: `orgId` on every request (except `/organizations`)
- **Auth**: OAuth2 via `Zoho-oauthtoken` header (handled by ZohoApiClient)
- **Scopes**: `Desk.tickets.ALL,Desk.contacts.ALL,Desk.basic.ALL,Desk.settings.READ,Desk.search.READ,Desk.activities.ALL,Desk.articles.ALL,Desk.products.ALL`
- **Pagination**: Offset-based — `from` (1-based) + `limit` (max 100)
- **Updates**: `PATCH` method
- **Errors**: `{ errorCode, message }` format
- **Rate limits**: Daily credit pool (4,000–25,000/day/org depending on plan)

### Region Domains

| Region | Domain |
|--------|--------|
| US | `desk.zoho.com` |
| EU | `desk.zoho.eu` |
| India | `desk.zoho.in` |
| Australia | `desk.zoho.com.au` |
| Japan | `desk.zoho.jp` |
| Canada | `desk.zoho.ca` |

## Base Command Architecture

### `DeskBaseCommand`

Extends oclif `Command` directly (consistent with all other plugins — they do not extend cli's BaseCommand).

**Template**: `expense-base-command.ts` (closest match — also requires org ID header per request).

**Global base flags**:
- `--pretty` (boolean, default false) — pretty-print JSON output
- `--org` (string, env: `ZOHO_DESK_ORG_ID`) — organization ID

**Org resolution** (3-tier):
1. `--org` flag value
2. `config.defaultOrg` from `~/.zoho-cli/config.json`
3. Auto-detect via `GET /api/v1/organizations` (no orgId header needed)

**API client**:
- Uses `DESK_REGION_DOMAINS` (new, added to core)
- `baseUrl: https://${DESK_REGION_DOMAINS[region]}/api/v1`
- `app: 'desk'`, `version: 'v1'`
- Standard token callbacks for refresh

**Typed request helpers** (auto-inject `orgId` header):
- `deskGet<R>(path, params?)` — GET with org header
- `deskPost<R>(path, body?, params?)` — POST with org header
- `deskPatch<R>(path, body?, params?)` — PATCH with org header
- `deskDelete<R>(path, params?)` — DELETE with org header
- `deskDownload(path, outputPath)` — GET with `responseType: 'arraybuffer'`, writes to file

All helpers call `orgHeaders()` which returns `{ orgId: resolvedOrgId }`.

**Pagination helper**:
```
paginationParams(flags: { page: number, 'per-page': number }): { from: string, limit: string }
```
Converts `--page 2 --per-page 50` → `{ from: '51', limit: '50' }` (Desk `from` is 1-based offset).

**Error handling**:
```
handleApiError(error): never
  → extracts error.response.data.errorCode + message
  → calls outputError('API_ERROR', message, errorCode)
  → this.exit(1)
  → re-throws oclif exit signals (error.oclif?.exit)
```

**Output**:
- `outputSuccess(data, meta?)` — standard JSON envelope to stdout
- `outputError(code, message, zohoErrorCode?, details?)` — standard error envelope to stdout

## Command Inventory (~145 commands)

### Tickets (20 commands)

| Command | Method | Endpoint |
|---------|--------|----------|
| `desk tickets list` | GET | `/tickets` |
| `desk tickets get` | GET | `/tickets/{id}` |
| `desk tickets create` | POST | `/tickets` |
| `desk tickets update` | PATCH | `/tickets/{id}` |
| `desk tickets delete` | DELETE | `/tickets/{id}` |
| `desk tickets move` | POST | `/tickets/{id}/move` |
| `desk tickets merge` | POST | `/tickets/{id}/merge` |
| `desk tickets split` | POST | `/tickets/{id}/split` |
| `desk tickets close` | POST | `/tickets/close` |
| `desk tickets spam` | POST | `/tickets/markSpam` |
| `desk tickets unspam` | POST | `/tickets/unmarkSpam` |
| `desk tickets count` | GET | `/tickets/count` |
| `desk tickets search` | GET | `/tickets/search` |
| `desk tickets history` | GET | `/tickets/{id}/history` |
| `desk tickets metrics` | GET | `/tickets/{id}/metrics` |
| `desk tickets resolution get` | GET | `/tickets/{id}/resolution` |
| `desk tickets resolution add` | POST | `/tickets/{id}/resolution` |
| `desk tickets resolution update` | PATCH | `/tickets/{id}/resolution` |
| `desk tickets resolution delete` | DELETE | `/tickets/{id}/resolution` |
| `desk tickets blueprint` | GET | `/tickets/{id}/blueprint` |

### Ticket Threads (4 commands)

| Command | Method | Endpoint |
|---------|--------|----------|
| `desk threads list` | GET | `/tickets/{id}/threads` |
| `desk threads get` | GET | `/tickets/{id}/threads/{threadId}` |
| `desk threads reply` | POST | `/tickets/{id}/sendReply` |
| `desk threads draft` | POST | `/tickets/{id}/draftReply` |

### Ticket Comments (5 commands)

| Command | Method | Endpoint |
|---------|--------|----------|
| `desk ticket-comments list` | GET | `/tickets/{id}/comments` |
| `desk ticket-comments get` | GET | `/tickets/{id}/comments/{commentId}` |
| `desk ticket-comments add` | POST | `/tickets/{id}/comments` |
| `desk ticket-comments update` | PATCH | `/tickets/{id}/comments/{commentId}` |
| `desk ticket-comments delete` | DELETE | `/tickets/{id}/comments/{commentId}` |

### Ticket Attachments (5 commands)

| Command | Method | Endpoint |
|---------|--------|----------|
| `desk ticket-attachments list` | GET | `/tickets/{id}/attachments` |
| `desk ticket-attachments get` | GET | `/tickets/{id}/attachments/{attachmentId}` |
| `desk ticket-attachments upload` | POST | `/tickets/{id}/attachments` |
| `desk ticket-attachments download` | GET | `/tickets/{id}/attachments/{attachmentId}/content` |
| `desk ticket-attachments delete` | DELETE | `/tickets/{id}/attachments/{attachmentId}` |

### Ticket Tags (3 commands)

| Command | Method | Endpoint |
|---------|--------|----------|
| `desk ticket-tags list` | GET | `/tickets/{id}/tags` |
| `desk ticket-tags add` | POST | `/tickets/{id}/tags` |
| `desk ticket-tags remove` | DELETE | `/tickets/{id}/tags/{tagId}` |

### Ticket Time Entries (5 commands)

| Command | Method | Endpoint |
|---------|--------|----------|
| `desk ticket-time-entries list` | GET | `/tickets/{id}/timeEntry` |
| `desk ticket-time-entries create` | POST | `/tickets/{id}/timeEntry` |
| `desk ticket-time-entries get` | GET | `/tickets/{id}/timeEntry/{timeEntryId}` |
| `desk ticket-time-entries update` | PATCH | `/tickets/{id}/timeEntry/{timeEntryId}` |
| `desk ticket-time-entries delete` | DELETE | `/tickets/{id}/timeEntry/{timeEntryId}` |

### Ticket Timers (5 commands)

| Command | Method | Endpoint |
|---------|--------|----------|
| `desk ticket-timers start` | POST | `/tickets/{id}/timer/start` |
| `desk ticket-timers pause` | POST | `/tickets/{id}/timer/pause` |
| `desk ticket-timers resume` | POST | `/tickets/{id}/timer/resume` |
| `desk ticket-timers stop` | POST | `/tickets/{id}/timer/stop` |
| `desk ticket-timers status` | GET | `/tickets/{id}/timer` |

### Contacts (8 commands)

| Command | Method | Endpoint |
|---------|--------|----------|
| `desk contacts list` | GET | `/contacts` |
| `desk contacts get` | GET | `/contacts/{id}` |
| `desk contacts create` | POST | `/contacts` |
| `desk contacts update` | PATCH | `/contacts/{id}` |
| `desk contacts delete` | DELETE | `/contacts/{id}` |
| `desk contacts search` | GET | `/contacts/search` |
| `desk contacts count` | GET | `/contacts/count` |
| `desk contacts tickets` | GET | `/contacts/{id}/tickets` |

### Accounts (8 commands)

| Command | Method | Endpoint |
|---------|--------|----------|
| `desk accounts list` | GET | `/accounts` |
| `desk accounts get` | GET | `/accounts/{id}` |
| `desk accounts create` | POST | `/accounts` |
| `desk accounts update` | PATCH | `/accounts/{id}` |
| `desk accounts delete` | DELETE | `/accounts/{id}` |
| `desk accounts search` | GET | `/accounts/search` |
| `desk accounts count` | GET | `/accounts/count` |
| `desk accounts tickets` | GET | `/accounts/{id}/tickets` |

### Agents (8 commands)

| Command | Method | Endpoint |
|---------|--------|----------|
| `desk agents list` | GET | `/agents` |
| `desk agents get` | GET | `/agents/{id}` |
| `desk agents create` | POST | `/agents` |
| `desk agents update` | PATCH | `/agents/{id}` |
| `desk agents delete` | DELETE | `/agents/{id}` |
| `desk agents me` | GET | `/myinfo` |
| `desk agents count` | GET | `/agents/count` |
| `desk agents activate` | POST | `/agents/{id}/activate` |

### Departments (5 commands)

| Command | Method | Endpoint |
|---------|--------|----------|
| `desk departments list` | GET | `/departments` |
| `desk departments get` | GET | `/departments/{id}` |
| `desk departments create` | POST | `/departments` |
| `desk departments update` | PATCH | `/departments/{id}` |
| `desk departments delete` | DELETE | `/departments/{id}` |

### Tasks (7 commands)

| Command | Method | Endpoint |
|---------|--------|----------|
| `desk tasks list` | GET | `/tasks` |
| `desk tasks get` | GET | `/tasks/{id}` |
| `desk tasks create` | POST | `/tasks` |
| `desk tasks update` | PATCH | `/tasks/{id}` |
| `desk tasks delete` | DELETE | `/tasks/{id}` |
| `desk tasks count` | GET | `/tasks/count` |
| `desk tasks search` | GET | `/tasks/search` |

### Time Entries — Global (5 commands)

| Command | Method | Endpoint |
|---------|--------|----------|
| `desk time-entries list` | GET | `/timeEntries` |
| `desk time-entries get` | GET | `/timeEntries/{id}` |
| `desk time-entries create` | POST | `/timeEntries` |
| `desk time-entries update` | PATCH | `/timeEntries/{id}` |
| `desk time-entries delete` | DELETE | `/timeEntries/{id}` |

### Activities (2 commands)

| Command | Method | Endpoint |
|---------|--------|----------|
| `desk activities list` | GET | `/activities` |
| `desk activities count` | GET | `/activities/count` |

### Calls (6 commands)

| Command | Method | Endpoint |
|---------|--------|----------|
| `desk calls list` | GET | `/calls` |
| `desk calls get` | GET | `/calls/{id}` |
| `desk calls create` | POST | `/calls` |
| `desk calls update` | PATCH | `/calls/{id}` |
| `desk calls delete` | DELETE | `/calls/{id}` |
| `desk calls count` | GET | `/calls/count` |

### Events (6 commands)

| Command | Method | Endpoint |
|---------|--------|----------|
| `desk events list` | GET | `/events` |
| `desk events get` | GET | `/events/{id}` |
| `desk events create` | POST | `/events` |
| `desk events update` | PATCH | `/events/{id}` |
| `desk events delete` | DELETE | `/events/{id}` |
| `desk events count` | GET | `/events/count` |

### Knowledge Base — Articles (7 commands)

| Command | Method | Endpoint |
|---------|--------|----------|
| `desk articles list` | GET | `/articles` |
| `desk articles get` | GET | `/articles/{id}` |
| `desk articles create` | POST | `/articles` |
| `desk articles update` | PATCH | `/articles/{id}` |
| `desk articles delete` | DELETE | `/articles/{id}` |
| `desk articles search` | GET | `/articles/search` |
| `desk articles count` | GET | `/articles/count` |

### Knowledge Base — Categories (5 commands)

| Command | Method | Endpoint |
|---------|--------|----------|
| `desk kb-categories list` | GET | `/kbCategories` |
| `desk kb-categories get` | GET | `/kbCategories/{id}` |
| `desk kb-categories create` | POST | `/kbCategories` |
| `desk kb-categories update` | PATCH | `/kbCategories/{id}` |
| `desk kb-categories delete` | DELETE | `/kbCategories/{id}` |

### Knowledge Base — Sections (3 commands)

| Command | Method | Endpoint |
|---------|--------|----------|
| `desk kb-sections list` | GET | `/kbSections` |
| `desk kb-sections get` | GET | `/kbSections/{id}` |
| `desk kb-sections create` | POST | `/kbSections` |

### Products (6 commands)

| Command | Method | Endpoint |
|---------|--------|----------|
| `desk products list` | GET | `/products` |
| `desk products get` | GET | `/products/{id}` |
| `desk products create` | POST | `/products` |
| `desk products update` | PATCH | `/products/{id}` |
| `desk products delete` | DELETE | `/products/{id}` |
| `desk products count` | GET | `/products/count` |

### Tags (6 commands)

| Command | Method | Endpoint |
|---------|--------|----------|
| `desk tags list` | GET | `/ticketTags` |
| `desk tags get` | GET | `/ticketTags/{id}` |
| `desk tags create` | POST | `/ticketTags` |
| `desk tags update` | PATCH | `/ticketTags/{id}` |
| `desk tags delete` | DELETE | `/ticketTags/{id}` |
| `desk tags count` | GET | `/ticketTags/count` |

### Custom Views (5 commands)

| Command | Method | Endpoint |
|---------|--------|----------|
| `desk views list` | GET | `/views` |
| `desk views get` | GET | `/views/{id}` |
| `desk views create` | POST | `/views` |
| `desk views update` | PATCH | `/views/{id}` |
| `desk views delete` | DELETE | `/views/{id}` |

### Search (1 command)

| Command | Method | Endpoint |
|---------|--------|----------|
| `desk search` | GET | `/search` |

### Settings — Read-Only (16 commands)

| Command | Method | Endpoint |
|---------|--------|----------|
| `desk organizations list` | GET | `/organizations` |
| `desk organizations get` | GET | `/organizations/{id}` |
| `desk roles list` | GET | `/roles` |
| `desk roles get` | GET | `/roles/{id}` |
| `desk profiles list` | GET | `/profiles` |
| `desk profiles get` | GET | `/profiles/{id}` |
| `desk teams list` | GET | `/teams` |
| `desk teams get` | GET | `/teams/{id}` |
| `desk sla list` | GET | `/slaRules` |
| `desk sla get` | GET | `/slaRules/{id}` |
| `desk business-hours list` | GET | `/businessHours` |
| `desk business-hours get` | GET | `/businessHours/{id}` |
| `desk fields list` | GET | `/ticketFields` (+ `--module` flag for contactFields, accountFields, etc.) |
| `desk layouts list` | GET | `/layouts` |
| `desk layouts get` | GET | `/layouts/{id}` |
| `desk blueprints list` | GET | `/blueprints` |

## Common Flag Patterns

### List commands

All GET collection endpoints share:
- `--page` (integer, default 1) — user-facing page number
- `--per-page` (integer, default 100) — records per page, max 100
- `--sort-by` (string) — field to sort by
- `--sort-order` (string, options: `asc`/`desc`)
- `--department` (string) — department ID filter (where applicable, per-command not global)

Base command `paginationParams()` converts `--page`/`--per-page` to Desk's `from`/`limit`.

### Get commands

- Positional arg: resource ID (required)
- `--include` (string) — comma-separated related resources to embed

### Create/Update commands

- `--data` / `-d` (string, required) — JSON string of the resource body
- `--dry-run` (boolean) — preview request without executing (create/update only)

### Delete commands

- Positional arg: resource ID (required)
- No `--dry-run` — Desk deletes move to recycle bin (recoverable)

### Ticket-scoped sub-resource commands

All threads, comments, attachments, time entries, timers, and tag commands:
- `--ticket` / `-t` (string, required) — parent ticket ID

## Directory Structure

```
packages/plugin-desk/
  src/
    desk-base-command.ts
    index.ts
    commands/
      desk/
        search.ts
        tickets/
          list.ts, get.ts, create.ts, update.ts, delete.ts
          move.ts, merge.ts, split.ts, close.ts
          spam.ts, unspam.ts, count.ts, search.ts
          history.ts, metrics.ts, blueprint.ts
          resolution/
            get.ts, add.ts, update.ts, delete.ts
        threads/
          list.ts, get.ts, reply.ts, draft.ts
        ticket-comments/
          list.ts, get.ts, add.ts, update.ts, delete.ts
        ticket-attachments/
          list.ts, get.ts, upload.ts, download.ts, delete.ts
        ticket-tags/
          list.ts, add.ts, remove.ts
        ticket-time-entries/
          list.ts, get.ts, create.ts, update.ts, delete.ts
        ticket-timers/
          start.ts, pause.ts, resume.ts, stop.ts, status.ts
        contacts/
          list.ts, get.ts, create.ts, update.ts, delete.ts, search.ts, count.ts, tickets.ts
        accounts/
          list.ts, get.ts, create.ts, update.ts, delete.ts, search.ts, count.ts, tickets.ts
        agents/
          list.ts, get.ts, create.ts, update.ts, delete.ts, me.ts, count.ts, activate.ts
        departments/
          list.ts, get.ts, create.ts, update.ts, delete.ts
        tasks/
          list.ts, get.ts, create.ts, update.ts, delete.ts, count.ts, search.ts
        time-entries/
          list.ts, get.ts, create.ts, update.ts, delete.ts
        activities/
          list.ts, count.ts
        calls/
          list.ts, get.ts, create.ts, update.ts, delete.ts, count.ts
        events/
          list.ts, get.ts, create.ts, update.ts, delete.ts, count.ts
        articles/
          list.ts, get.ts, create.ts, update.ts, delete.ts, search.ts, count.ts
        kb-categories/
          list.ts, get.ts, create.ts, update.ts, delete.ts
        kb-sections/
          list.ts, get.ts, create.ts
        products/
          list.ts, get.ts, create.ts, update.ts, delete.ts, count.ts
        tags/
          list.ts, get.ts, create.ts, update.ts, delete.ts, count.ts
        views/
          list.ts, get.ts, create.ts, update.ts, delete.ts
        organizations/
          list.ts, get.ts
        roles/
          list.ts, get.ts
        profiles/
          list.ts, get.ts
        teams/
          list.ts, get.ts
        sla/
          list.ts, get.ts
        business-hours/
          list.ts, get.ts
        fields/
          list.ts
        layouts/
          list.ts, get.ts
        blueprints/
          list.ts
  tests/
    desk-base-command.test.ts
    commands/desk/
      tickets.test.ts
      threads.test.ts
      ticket-comments.test.ts
      ticket-attachments.test.ts
      ticket-tags.test.ts
      ticket-time-entries.test.ts
      ticket-timers.test.ts
      contacts.test.ts
      accounts.test.ts
      agents.test.ts
      departments.test.ts
      tasks.test.ts
      time-entries.test.ts
      activities.test.ts
      calls.test.ts
      events.test.ts
      articles.test.ts
      kb-categories.test.ts
      kb-sections.test.ts
      products.test.ts
      tags.test.ts
      views.test.ts
      search.test.ts
      settings.test.ts
  package.json
  tsconfig.json
  tsconfig.build.json
```

## Testing Strategy

### Approach

Static metadata tests for every command (matching CRM/Projects/People pattern). API calls require live auth, so tests validate command structure only.

### What each test validates

- `static id` matches expected command ID
- Required args are declared
- Required flags are declared with correct types
- Flag defaults are correct
- `static summary` exists

### Base command tests

- `paginationParams()` conversion: page 1/perPage 50 → from=1/limit=50; page 2/perPage 50 → from=51/limit=50
- Org resolution priority: flag → config → API
- Error handling: maps `{ errorCode, message }` to standard envelope
- Oclif exit signal re-throw

### Test grouping

One test file per command module (not per command). Settings commands grouped in a single `settings.test.ts`.

### Estimated count

~145 commands x ~3 assertions + ~15 base command tests = **~450 tests**

## Core Package Changes

### New export in `packages/core/src/config/schema.ts`

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

Export from `packages/core/src/index.ts` barrel.

### CLI plugin registration (`packages/cli/package.json`)

1. Add `"@zoho-cli/plugin-desk": "workspace:*"` to `dependencies`
2. Add `"@zoho-cli/plugin-desk"` to `oclif.plugins` array

### Build order

No changes — `pnpm build` workspace dependency resolution handles it. Desk builds in parallel with other plugins after core.

### CLAUDE.md

Add plugin-desk to architecture list and add "Adding a new Desk command" convention section.

## Future Scope (Not in This Spec)

Modules deferred to future releases:
- Community / Forums
- Contracts
- Webhooks CRUD
- Guided Conversations
- Badges / Gamification
- Bug Integrations
- Bulk Import / Backup
- Recycle Bin
- Help Center / Multi-brand
- Sharing Rules / Approval Rules
- Automation Rules / Workflow Rules
- Round Robin Rules
- Article translations / feedback
- Agent signatures / presence
- Notification rules
- Holiday lists
