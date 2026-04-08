# Zoho CLI

A comprehensive command-line interface for managing Zoho applications. Built with TypeScript and [oclif](https://oclif.io), designed for automation, scripting, and LLM consumption with strict JSON output.

**498 commands** across 6 Zoho products:

| Plugin | Commands | Zoho Product |
|--------|----------|--------------|
| `@zoho-cli/plugin-crm` | 65 | Zoho CRM |
| `@zoho-cli/plugin-books` | 166 | Zoho Books |
| `@zoho-cli/plugin-projects` | 87 | Zoho Projects |
| `@zoho-cli/plugin-people` | 100 | Zoho People |
| `@zoho-cli/plugin-expense` | 73 | Zoho Expense |
| `@zoho-cli/cli` | 7 | Auth & Config |

## Installation

Requires Node.js >= 20 and [pnpm](https://pnpm.io).

```bash
git clone https://github.com/your-username/zoho-cli.git
cd zoho-cli
pnpm install
pnpm build
```

Then either link globally or run directly:

```bash
# Option 1: Link globally
cd packages/cli && pnpm link --global

# Option 2: Run directly
./packages/cli/bin/run.js --help
```

## Setup

### 1. Create a Zoho OAuth Client

1. Go to [Zoho API Console](https://api-console.zoho.com/) (or `.in`, `.eu`, etc. for your region)
2. Create a **Server-based Application**
3. Set the redirect URI to `http://localhost:8899/callback`
4. Note your **Client ID** and **Client Secret**

### 2. Configure the CLI

```bash
zoho config set clientId YOUR_CLIENT_ID
zoho config set clientSecret YOUR_CLIENT_SECRET
zoho config set region in          # in, com, eu, com.au, com.cn, jp
```

### 3. Authenticate

```bash
zoho auth login
```

This opens your browser for OAuth consent. Tokens are stored locally at `~/.zoho-cli/tokens.json`.

Check your auth status:

```bash
zoho auth status
```

## Usage

All commands output strict JSON to stdout. Errors go to stderr.

```bash
# CRM
zoho crm records list Leads --per-page 5
zoho crm records get Contacts 1234567890
zoho crm records create Deals --data '{"Deal_Name":"New Deal","Stage":"Qualification"}'
zoho crm records search Leads --criteria '((Email:equals:john@example.com))'

# Books
zoho books invoices list --organization 12345
zoho books contacts get 9876543210 --organization 12345
zoho books bills create --organization 12345 --data '{"vendor_id":"...","bill_number":"BILL-001"}'

# Projects
zoho projects list --portal 12345
zoho projects tasks list --portal 12345 --project 67890
zoho projects timelogs list --portal 12345 --project 67890

# People
zoho people employees list
zoho people attendance entries --from 2025-01-01 --to 2025-01-31
zoho people leave apply --employee 12345 --type CL --from 2025-02-01 --to 2025-02-01

# Expense
zoho expense reports list --organization 12345
zoho expense expenses list --organization 12345
zoho expense trips list --organization 12345
```

### Output Format

Every command returns a JSON envelope:

```json
// Success
{
  "success": true,
  "data": [ ... ],
  "meta": {
    "action": "records.list",
    "module": "Leads",
    "count": 5,
    "hasMore": true
  }
}

// Error
{
  "success": false,
  "error": {
    "code": "API_ERROR",
    "message": "Invalid module",
    "zohoErrorCode": "INVALID_MODULE"
  }
}
```

Exit codes: `0` success, `1` API error, `2` auth error, `3` config/usage error.

### Flags

Common flags available across commands:

| Flag | Description |
|------|-------------|
| `--pretty` | Pretty-print JSON output |
| `--fields` | Comma-separated list of fields to return (read operations) |
| `--dry-run` | Preview the request without executing (write operations) |
| `--per-page` | Results per page |
| `--page` | Page number |

### Configuration

```bash
zoho config set region com       # Zoho region (in, com, eu, com.au, com.cn, jp)
zoho config set defaultPortal ID # Default portal for Projects commands
zoho config list                 # Show all config
zoho config get region           # Get a specific value
```

Environment variables override config file values:

| Variable | Overrides |
|----------|-----------|
| `ZOHO_CLIENT_ID` | `clientId` |
| `ZOHO_CLIENT_SECRET` | `clientSecret` |
| `ZOHO_REFRESH_TOKEN` | Stored refresh token |
| `ZOHO_REGION` | `region` |
| `ZOHO_PORTAL_ID` | `defaultPortal` |

## Architecture

```
packages/
  core/          Shared library: config, OAuth2, HTTP client, JSON output
  cli/           oclif entry point with auth & config commands
  plugin-crm/    Zoho CRM commands
  plugin-books/  Zoho Books commands
  plugin-projects/ Zoho Projects commands
  plugin-people/ Zoho People commands
  plugin-expense/  Zoho Expense commands
```

Each plugin is a standalone oclif plugin that registers its commands with the CLI. The `@zoho-cli/core` package provides:

- **OAuth2 authentication** with browser-based consent flow and automatic token refresh
- **HTTP client** (axios-based) with rate limiting and retry logic
- **Config management** with zod schema validation
- **JSON output formatters** for consistent success/error envelopes

## Development

```bash
pnpm build          # Build all packages (core -> plugins -> cli)
pnpm test           # Run all tests (~2300 tests)
pnpm clean          # Remove all dist/ directories

# Test a specific package
pnpm --filter @zoho-cli/core test
pnpm --filter @zoho-cli/plugin-crm test

# Dev mode (no build needed, uses ts-node)
./packages/cli/bin/dev.js crm records list Leads
```

Build order matters: `core` first (shared dependency), then plugins in parallel, then `cli`.

### Adding a New Command

Commands follow a consistent pattern. Each plugin has a base command class:

- CRM: extend `CrmBaseCommand` — provides `this.apiClient`, `this.moduleCache`
- Projects: extend `ProjectsBaseCommand` — provides `this.portalPath()`, `this.projectPath()`
- People: extend `PeopleBaseCommand` — provides `this.formSearch()`, `this.formInsert()`
- Books: extend `BooksBaseCommand` — provides `this.apiClient` with organization scoping
- Expense: extend `ExpenseBaseCommand` — provides `this.apiClient` with organization scoping

See [`CLAUDE.md`](./CLAUDE.md) for detailed code conventions and examples.

## Zoho API Coverage

### CRM (v7/v8)
Records CRUD, search, upsert, bulk operations, COQL queries, email, attachments, notes, tags, modules metadata, org info, users/roles/profiles, territories, variables, currencies, scoring rules, composite API

### Books
Invoices, bills, contacts, items, expenses, bank accounts, chart of accounts, credit notes, customer/vendor payments, purchase orders, sales orders, estimates, journals, projects, taxes, currencies, organizations, bank rules, recurring invoices/bills/expenses

### Projects (v3)
Projects CRUD, tasks, tasklists, phases, issues, timelogs, timers, users, teams, tags, forums, events, comments, attachments, dashboards, blueprints, feed/activities, search

### People
Employees, leave management (20+ operations), attendance, timetracker (clients, projects, jobs, timelogs, timesheets, timers), cases, announcements, files, organization structure, onboarding, LMS courses, separation

### Expense
Expenses, reports, trips, advances, organizations, categories, currencies, taxes, users, customers, projects, policies, per diem rates

## License

[MIT](./LICENSE)
