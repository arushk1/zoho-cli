# Zoho Bookings (29 commands)

**Appointment scheduling / booking management.** Single API version v1, single OAuth scope (`zohobookings.data.CREATE`). Endpoints are action-style (`/json/{action}`), not REST. POST bodies are `application/x-www-form-urlencoded` with complex fields JSON-stringified. Workspace ID auto-detected; override with `--workspace <id>`, `ZOHO_BOOKINGS_WORKSPACE_ID`, or `zoho config set defaultBookingsWorkspace <id>`.

## Workspaces
```bash
zoho bookings workspaces list                                      # List all workspaces
zoho bookings workspaces get <workspaceId>
zoho bookings workspaces create --name "Sales Team" --dry-run
zoho bookings workspaces update <id> --data '{"description":"..."}' --dry-run
zoho bookings workspaces delete <id> [--ignore-past-appointments] --dry-run
```

## Services
```bash
zoho bookings services list                                        # List services in workspace
zoho bookings services list --staff <staffId>                      # Filter by staff
zoho bookings services get <serviceId>
zoho bookings services create --name "30-min Consult" --duration 30 \
  --meeting-mode online --meeting-type zoom --cost 50 --dry-run
zoho bookings services update <id> --data '{...}' --dry-run        # [EXPERIMENTAL] undocumented endpoint
zoho bookings services delete <id> --dry-run                       # [EXPERIMENTAL]
```

## Staff
```bash
zoho bookings staff list                                           # List staff in workspace
zoho bookings staff list --service <serviceId>                     # Filter by service
zoho bookings staff get <staffId>
zoho bookings staff search <email-substring>                       # Search by email substring
zoho bookings staff add --name "Alice" --email alice@acme.com --role Staff \
  --dob 1990-05-15 --phone "+1234567890" --designation "Consultant" \
  --assigned-services "svc1,svc2" --dry-run
zoho bookings staff add --file staff.json --dry-run                # Bulk (up to 50)
zoho bookings staff update <id> --data '{...}' --dry-run           # [EXPERIMENTAL]
zoho bookings staff delete <id> --dry-run                          # [EXPERIMENTAL]
```

## Resources
```bash
zoho bookings resources list [--service <serviceId>]
zoho bookings resources get <resourceId>
zoho bookings resources create --data '{...}' --dry-run            # [EXPERIMENTAL]
zoho bookings resources update <id> --data '{...}' --dry-run       # [EXPERIMENTAL]
zoho bookings resources delete <id> --dry-run                      # [EXPERIMENTAL]
```

## Availability
```bash
zoho bookings availability slots --service <svcId> --staff <stfId> --selected-date 2026-05-01
zoho bookings availability slots --service <svcId> --group <grpId> --selected-date 2026-05-01
zoho bookings availability slots --service <svcId> --resource <resId> --selected-date 2026-05-01
# Exactly one of --staff / --group / --resource is required
```

## Appointments
```bash
zoho bookings appointments list                                    # All appointments (paginated)
zoho bookings appointments list --status UPCOMING --per-page 100
zoho bookings appointments list --customer-email alice@acme.com
zoho bookings appointments list --from-time 2026-05-01T00:00 --to-time 2026-05-31T23:59
zoho bookings appointments list --need-customer-more-info --per-page 60
zoho bookings appointments get <bookingId>
zoho bookings appointments book --service <svcId> --staff <stfId> \
  --from-time 2026-05-01T10:00 \
  --customer-name "Alice" --customer-email "alice@x.com" --customer-phone-number "555-1234" \
  --notes "First visit" --timezone "Asia/Kolkata" --dry-run
zoho bookings appointments book --service <svcId> --resource <resId> \
  --from-time 2026-05-01T10:00 --to-time 2026-05-01T11:00 \
  --customer-details '{"name":"Alice","email":"alice@x.com","phone_number":"555-1234"}' --dry-run
zoho bookings appointments reschedule <id> --start-time 2026-05-02T14:00 --dry-run
zoho bookings appointments reschedule <id> --staff <newStaffId> --dry-run
zoho bookings appointments complete <id> --dry-run                 # /updateappointment action=completed
zoho bookings appointments cancel <id> --dry-run                   # /updateappointment action=cancel
zoho bookings appointments noshow <id> --dry-run                   # /updateappointment action=noshow
```

**Appointment statuses:** `UPCOMING`, `CANCEL`, `ONGOING`, `PENDING`, `COMPLETED`, `NO_SHOW`, `PENDING_PAYMENT`, `PAYMENT_FAILURE`

## Date/Time Format
All date/time flags (`--from-time`, `--to-time`, `--start-time`, `--selected-date`, `--dob`, `--appointment-created-from`, `--appointment-created-till`) accept **ISO 8601**:
- Date-time: `2026-04-30T14:30:00` or `2026-04-30 14:30:00`
- Date-only: `2026-04-30` (for `--selected-date`, `--dob`)

Timezone suffixes (`Z`, `+05:30`, `-0800`) are **stripped** — Bookings treats every value as workspace-local time.

## Bookings API Gotchas
- **Single scope** `zohobookings.data.CREATE` covers every operation regardless of verb or resource. Added automatically by `zoho auth login`.
- **Workspace auto-detect** picks the first workspace returned by `/workspaces` if none set. For multi-workspace users, set one explicitly: `zoho config set defaultBookingsWorkspace <id>`.
- **Pagination** only applies to `appointments list` (`/fetchappointment`). Cap is 100 per page, or 60 if `--need-customer-more-info` is set.
- **Response envelope:** `{ response: { returnvalue: ..., logMessage: [], status: "success" } }`. CLI unwraps to `returnvalue` in the `data` field.
- **Error shape is informal:** failures have `status !== "success"` and messages in `logMessage[]`. Mapped to `{code: "API_ERROR", message: ...}`.
- **`[EXPERIMENTAL]` commands** target undocumented endpoints with guessed paths (`updateservice`, `deleteservice`, `updatestaff`, `deletestaff`, `createresource`, `updateresource`, `deleteresource`). Always `--dry-run` first; responses may indicate the endpoint doesn't exist.
- **No webhooks** — use Zoho Flow for event-driven integrations.
- **No customer CRUD** — customer data is only accessible via appointment responses.
- **Rate limits:** daily per-user quota (250 / 1,000 / 3,000 by plan). No rate-limit response headers — no reactive backoff possible.
- **Appointment state verbs are split** into `complete`/`cancel`/`noshow` (all hit `/updateappointment` under the hood).
- **`book` requires** exactly one of `--staff` / `--group` / `--resource`, plus either `--customer-details <json>` or all three of `--customer-name`/`--customer-email`/`--customer-phone-number`.
