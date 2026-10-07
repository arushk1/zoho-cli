---
name: zoho-cli
description: >
  Interact with Zoho applications (CRM, People, Projects, Books, Expense, Desk, Bookings, Billing, Payments,
  Analytics) through the `zoho` CLI, which returns JSON. Use when the user asks about Zoho data, wants to
  create/update/manage Zoho resources, or needs reports from any Zoho product: employees, attendance, leave,
  payroll, timetracker, leads, contacts, deals, invoices, bills, expense reports, projects, tasks, tickets,
  helpdesk, knowledge base articles, appointments, availability slots, subscriptions, plans, payment links,
  refunds, payouts, mandates, analytics workspaces, reports, dashboards, or SQL queries over Analytics tables.
  Also use when developing or testing commands in the zoho-cli repository.
argument-hint: "[product] [action] [resource]"
---

# Zoho CLI

Use the `zoho` command for all Zoho data work. Every command prints one JSON envelope on stdout; stderr carries only progress and auto-detection messages.

```bash
zoho <product> <module> <action> [args] [flags]
```

## Before First Use

Check the CLI is installed with `zoho --version`. If it is missing, install it from source (Node.js >= 20 and pnpm required):

```bash
git clone https://github.com/arushk1/zoho-cli.git && cd zoho-cli
pnpm install && pnpm build
cd packages/cli && npm link          # puts `zoho` on PATH
```

If `zoho auth status` reports no credentials, the user must create a Zoho OAuth client once. Walk them through it; do not invent credentials:

1. In the Zoho API Console for their data center (e.g. `https://api-console.zoho.in`), create a **Server-based Application** with redirect URI `http://localhost:8901/callback`.
2. `zoho auth setup --client-id <id> --client-secret <secret> --region <us|eu|in|au|jp|ca>`
3. `zoho auth login` opens a browser for consent. Re-run it whenever a command fails with a scope error, since new products add new scopes.

## Operating Rules

- **Parse stdout only.** Add `2>/dev/null` when piping into another program. `--pretty` gives indented JSON.
- **Preview writes.** Every write supports `--dry-run`, which prints `{ dryRun: true, method, path, body|config }` without calling Zoho. Run it first for anything destructive unless the user explicitly declines.
- **Paginate** list commands with `--page` / `--per-page` and check `meta.hasMore`.
- **Write payloads** go in `--data` / `-d` as a JSON string; invalid JSON fails with `INVALID_JSON` (exit 3).
- **Find IDs before acting.** Use list/search commands to resolve names to IDs instead of guessing.
- **Org/portal/workspace context** is auto-detected on first call (announced on stderr). Override per product:

| Product | Context | Flag | Config key / env var |
| --- | --- | --- | --- |
| Books, Expense, Desk | Organization | `--org` | `defaultOrg` (Desk also `ZOHO_DESK_ORG_ID`) |
| Billing | Organization (separate from Books) | `--org` | `defaultBillingOrg` / `ZOHO_BILLING_ORG_ID` |
| Analytics | Organization | `--org` | `defaultAnalyticsOrg` / `ZOHO_ANALYTICS_ORG_ID` |
| Payments | Account (**no auto-detect**) | `--account` | `defaultPaymentsAccount` / `ZOHO_PAYMENTS_ACCOUNT_ID` |
| Projects | Portal | `--portal` | `defaultPortal` / `ZOHO_PORTAL_ID` |
| Bookings | Workspace | `--workspace` | `defaultBookingsWorkspace` / `ZOHO_BOOKINGS_WORKSPACE_ID` |

## Product References

Read the reference for the product you are working with before composing commands. Each lists every command group with examples, response shapes, and API gotchas.

| Product | Reference | Key facts |
| --- | --- | --- |
| CRM (78) | [references/crm.md](references/crm.md) | Case-sensitive module API names (`Leads`, `Deals`); always pass `--fields`; COQL via `crm query` |
| People (100) | [references/people.md](references/people.md) | Dates are `dd-MMM-yyyy` (`01-Apr-2026`); attendance reports max ~3 months per call |
| Projects (87) | [references/projects.md](references/projects.md) | Most commands need `-p <projectId>`; phases = milestones |
| Books (167) | [references/books.md](references/books.md) | `books raw get` for reports and bank transactions |
| Expense (73) | [references/expense.md](references/expense.md) | Error 6041 = wrong org |
| Desk (151) | [references/desk.md](references/desk.md) | Ticket sub-resources need `--ticket <id>`; deletes go to recycle bin |
| Bookings (29) | [references/bookings.md](references/bookings.md) | ISO 8601 dates, workspace-local time; `[EXPERIMENTAL]` commands hit undocumented endpoints |
| Billing (44) | [references/billing.md](references/billing.md) | Plans/addons/coupons keyed by code, not ID |
| Payments (18) | [references/payments.md](references/payments.md) | India/US only; login with `zoho auth login --payments-account <id>` |
| Analytics (26) | [references/analytics.md](references/analytics.md) | SQL via `analytics query` (async job); criteria quote names with `"` and values with `'` |

## Auth And Config

```bash
zoho auth setup --client-id <id> --client-secret <secret> [--region in]
zoho auth login                                   # Browser OAuth consent; default scopes cover every product except Payments
zoho auth login --payments-account <account-id>   # Also grants ZohoPay.* via Zoho's org-scoped consent
zoho auth status                                  # Auth state, scopes, expiry
zoho auth logout

zoho config list
zoho config get region
zoho config set region in                         # us | eu | in | au | jp | ca
zoho config set defaultOrg <id>
```

Valid config keys: `region`, `outputFormat`, `clientId`, `clientSecret`, `defaultOrg`, `defaultPortal`, `defaultBookingsWorkspace`, `defaultBillingOrg`, `defaultPaymentsAccount`, `defaultAnalyticsOrg`. Unknown keys fail with `INVALID_KEY`. Tokens refresh automatically and live in `~/.zoho-cli/`.

## Output And Errors

```json
{ "success": true, "data": [], "meta": { "action": "records.list", "page": 1, "hasMore": false, "count": 0 } }
{ "success": false, "error": { "code": "RECORD_NOT_FOUND", "message": "...", "zohoErrorCode": "..." } }
```

| Exit | Meaning | What to do |
| --- | --- | --- |
| 0 | Success | |
| 1 | API error (not found, validation, rate limit, missing scope) | Read `error.code` / `error.message`; scope errors mean re-run `zoho auth login` |
| 2 | Auth error (no token, refresh failed) | `zoho auth login` |
| 3 | Config/usage error (bad flag, bad JSON, missing org/account) | Fix the command or config |

Common codes: `RECORD_NOT_FOUND` / `MODULE_NOT_FOUND` / `USER_NOT_FOUND` (CRM), `INVALID_JSON`, `INVALID_KEY`, `INVALID_VALUE`, `OAUTH_SCOPE_MISMATCH` / `INVALID_OAUTHSCOPE` (re-login), `7049` People record not found, `7022` People invalid params, `7218` People missing scope, `6500` Projects module not in plan, `1002` Books not found, `6041` Expense wrong org.

## Patterns

```bash
# Count results without the envelope
zoho people employees list 2>/dev/null | node -e "const d=JSON.parse(require('fs').readFileSync(0,'utf8'));console.log(d.data.length)"

# Long ranges: People attendance is capped at ~3 months per call; split by quarter and merge
zoho people attendance report --from "01-Apr-2026" --to "30-Jun-2026" 2>/dev/null > /tmp/q1.json

# Always preview destructive operations
zoho crm records delete Leads <id> --dry-run
zoho analytics rows delete -w <ws> --view <tableId> --criteria "\"Year\"<2020" --dry-run
```

## Developing This Repository

When changing the CLI itself (inside a zoho-cli checkout), read `CLAUDE.md` first. After `pnpm build`, run the local checkout without installing via `./packages/cli/bin/run.js <command>`. Verify with `pnpm build && pnpm test` or `pnpm --filter @zoho-cli/plugin-<product> test`. Commands extend each product's base command, use space-separated `static id` values (`crm records list`), and import local files with `.js` extensions.
