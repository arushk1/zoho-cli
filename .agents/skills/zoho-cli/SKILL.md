---
name: zoho-cli
description: Interact with Zoho applications through the globally installed `zoho` CLI or this repository's development CLI. Use when the user asks to query, report on, create, update, or manage Zoho CRM, Books, Expense, People, Projects, Desk, or Bookings data; asks for Zoho command examples; needs JSON output from Zoho; or is developing/testing commands in this zoho-cli repository.
---

# Zoho CLI

Use the `zoho` command for Zoho data work and this repository's dev entry point when validating local source changes. The CLI returns JSON envelopes on stdout; stderr may contain progress or auto-detection messages.

## Quick Start

Run the installed CLI from any directory:

```bash
zoho <product> <module> <action> [args] [flags]
```

Run the local TypeScript CLI from this repository:

```bash
./packages/cli/bin/dev.js --help
./packages/cli/bin/dev.js crm records list Leads --fields "Last_Name,Email"
```

Use `--pretty` for indented JSON. Redirect stderr when another command must parse clean JSON:

```bash
zoho people employees list --pretty
zoho crm records list Leads --fields "Last_Name,Email" 2>/dev/null
```

## Operating Rules

- Treat stdout as the machine-readable contract. Success envelopes use `{ "success": true, "data": ..., "meta": ... }`; errors use `{ "success": false, "error": { "code": "...", "message": "..." } }`.
- Use `--dry-run` before write operations. Destructive or state-changing commands should be previewed before execution unless the user explicitly declines.
- Use `--page` and `--per-page` for list pagination.
- Use Zoho CRM API module names exactly, such as `Leads`, `Contacts`, `Deals`, and `Accounts`.
- Include CRM `--fields` on record and related-list reads unless a nearby command proves it is unnecessary.
- For Zoho People date flags, use `dd-MMM-yyyy`, for example `01-Apr-2026`.
- For Books, Expense, and Desk, set or pass an org ID with `--org`, `ZOHO_DESK_ORG_ID`, or `zoho config set defaultOrg <id>` when auto-detection is not appropriate.
- For Projects, set or pass a portal ID with `--portal`, `ZOHO_PORTAL_ID`, or `zoho config set defaultPortal <id>`.
- For Bookings, set or pass a workspace ID with `--workspace`, `ZOHO_BOOKINGS_WORKSPACE_ID`, or `zoho config set defaultBookingsWorkspace <id>`.

## Auth And Config

```bash
zoho auth setup --client-id <id> --client-secret <secret>
zoho auth login
zoho auth status
zoho auth logout

zoho config list
zoho config get region
zoho config set region in
zoho config set defaultOrg <id>
zoho config set defaultPortal <id>
zoho config set defaultBookingsWorkspace <id>
```

Valid config keys are `region`, `outputFormat`, `clientId`, `clientSecret`, `defaultOrg`, `defaultPortal`, and `defaultBookingsWorkspace`.

## Common Tasks

```bash
zoho people employees list --pretty
zoho people attendance report --from "01-Apr-2026" --to "30-Jun-2026"
zoho crm records list Leads --fields "Last_Name,Email,Company"
zoho crm query --sql "SELECT Last_Name, Email FROM Leads LIMIT 5"
zoho books invoices list --status sent
zoho expense reports list --status submitted
zoho projects tasks list -p <project-id> --status open
zoho desk tickets list --status Open --per-page 50
zoho desk contacts search --query "acme"
zoho bookings appointments list --status UPCOMING
zoho bookings availability slots --service <svc> --staff <stf> --selected-date 2026-05-01
```

For a broader command catalog, product-specific gotchas, and response shapes, read `references/commands.md`.

## Development In This Repository

Use repo commands when changing the CLI implementation:

```bash
pnpm build
pnpm test
pnpm --filter @zoho-cli/core test
pnpm --filter @zoho-cli/plugin-crm test
```

Follow the local package patterns:

- Shared runtime code lives in `packages/core`.
- The oclif entry point lives in `packages/cli`.
- Product commands live in `packages/plugin-*`.
- Command files extend the product base command and use oclif `static id` values with spaces, such as `crm records list`.
- Local ESM imports include `.js` extensions.
- User-visible command changes should preserve strict JSON output.
