# @zoho-cli/plugin-bookings

Zoho Bookings plugin for the Zoho CLI. Provides 29 commands across workspaces, services, staff, resources, availability, and appointments.

## Commands

### Workspaces
- `zoho bookings workspaces list`
- `zoho bookings workspaces get <id>`
- `zoho bookings workspaces create --name "<name>"`
- `zoho bookings workspaces update <id> --data '<json>'`
- `zoho bookings workspaces delete <id> [--ignore-past-appointments]`

### Services
- `zoho bookings services list [--staff <id>]`
- `zoho bookings services get <id>`
- `zoho bookings services create --name <name> [--duration ...] [--meeting-mode online|offline] ...`
- `zoho bookings services update <id> --data '<json>'` — **[EXPERIMENTAL]**
- `zoho bookings services delete <id>` — **[EXPERIMENTAL]**

### Staff
- `zoho bookings staff list [--service <id>]`
- `zoho bookings staff get <id>`
- `zoho bookings staff search <email-substring>`
- `zoho bookings staff add --name <n> --email <e> [--role Admin|Manager|Staff] ...`  (or `--file staff.json` for bulk up to 50)
- `zoho bookings staff update <id> --data '<json>'` — **[EXPERIMENTAL]**
- `zoho bookings staff delete <id>` — **[EXPERIMENTAL]**

### Resources
- `zoho bookings resources list [--service <id>]`
- `zoho bookings resources get <id>`
- `zoho bookings resources create --data '<json>'` — **[EXPERIMENTAL]**
- `zoho bookings resources update <id> --data '<json>'` — **[EXPERIMENTAL]**
- `zoho bookings resources delete <id>` — **[EXPERIMENTAL]**

### Availability
- `zoho bookings availability slots --service <id> (--staff <id>|--group <id>|--resource <id>) --selected-date YYYY-MM-DD`

### Appointments
- `zoho bookings appointments list [--status UPCOMING|CANCEL|...] [--page 1 --per-page 50] ...`
- `zoho bookings appointments get <id>`
- `zoho bookings appointments book --service <id> (--staff|--group|--resource <id>) --from-time <iso> (--customer-details '<json>' | --customer-name ... --customer-email ... --customer-phone-number ...)`
- `zoho bookings appointments reschedule <id> [--staff <id>] [--group <id>] [--start-time <iso>]`
- `zoho bookings appointments complete <id>`
- `zoho bookings appointments cancel <id>`
- `zoho bookings appointments noshow <id>`

## Global flags

- `--workspace <id>` — Bookings workspace ID. Also read from `ZOHO_BOOKINGS_WORKSPACE_ID` env var or `config.defaultBookingsWorkspace`. Auto-detected if all three are empty.
- `--pretty` — pretty-print JSON output.
- `--dry-run` (write commands only) — print the request that would be sent, without executing.

## Date/time format

All date/time flags (`--from-time`, `--to-time`, `--start-time`, `--selected-date`, `--dob`, `--appointment-created-from`, `--appointment-created-till`) accept ISO 8601:

- Date-time: `2026-04-30T14:30:00` or `2026-04-30 14:30:00`
- Date-only: `2026-04-30`

Any timezone suffix (`Z`, `+05:30`, `-0800`) is **stripped** — Zoho Bookings treats every value as workspace-local time (per Settings → General → Basic Information).

## OAuth scope

Single scope: `zohobookings.data.CREATE` — covers every command in this plugin. Added automatically by `zoho auth login`.

## Experimental commands

Endpoints marked `[EXPERIMENTAL]` are not documented by Zoho; the plugin uses guessed paths that follow Zoho's naming convention (`updateservice`, `deleteservice`, `updatestaff`, `deletestaff`, `createresource`, `updateresource`, `deleteresource`). They may:

- Return errors because the endpoint doesn't exist.
- Return errors because the payload shape is wrong.
- Silently succeed with different semantics than expected.

Use `--dry-run` first and verify the response. If you discover the correct shape, please file an issue or PR against this plugin.

## Gaps in Zoho's public API

Not implemented because Zoho does not expose them:

- Customer / contact CRUD (customer data is only available via appointment responses).
- Group create/update/delete (groups are addressable via `--group` but not manageable).
- Webhooks (use Zoho Flow instead).
- Bulk operations beyond `staff add` (50/call).
- Reactive rate-limit backoff (no headers returned).
