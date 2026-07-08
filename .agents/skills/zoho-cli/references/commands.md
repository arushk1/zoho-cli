# Zoho CLI Command Reference

Load this reference when a task needs product-specific command examples, response shapes, or API gotchas.

## Global Patterns

```bash
zoho <product> <module> <action> [args] [flags]
```

Common flags:

- `--pretty`: indented JSON
- `--dry-run`: preview write/action operations without changing Zoho
- `--page N` and `--per-page N`: paginate list commands
- `--org <id>`: Books, Expense, and Desk organization override
- `--portal <id>`: Projects portal override
- `--workspace <id>`: Bookings workspace override

Success:

```json
{ "success": true, "data": [], "meta": { "action": "records.list", "count": 0 } }
```

Error:

```json
{ "success": false, "error": { "code": "RECORD_NOT_FOUND", "message": "No record found with the given ID" } }
```

Dry run:

```json
{ "success": true, "data": { "dryRun": true, "method": "POST", "path": "/Leads", "body": {} } }
```

Exit codes:

| Code | Meaning |
| --- | --- |
| 0 | Success |
| 1 | API error |
| 2 | Auth error |
| 3 | Config or usage error |

## CRM

Use case-sensitive API module names: `Leads`, `Contacts`, `Deals`, `Accounts`, and other module API names returned by metadata commands.

```bash
zoho crm records list Leads --fields "Last_Name,Email,Company"
zoho crm records get Leads <id>
zoho crm records create Leads -d '{"Last_Name":"Smith","Email":"smith@example.com"}' --dry-run
zoho crm records update Leads <id> -d '{"Company":"Updated"}' --dry-run
zoho crm records delete Leads <id> --dry-run
zoho crm records upsert Leads -d '{"Last_Name":"Smith","Email":"smith@example.com"}' --dry-run
zoho crm records search Leads --criteria "((Last_Name:equals:Smith))"
zoho crm records count Leads
zoho crm records deleted Leads
zoho crm records timeline Leads <id>
zoho crm records mass-update Leads -d '{"data":[...]}' --ids "id1,id2" --dry-run
zoho crm records mass-delete Leads --ids "id1,id2" --dry-run
zoho crm records change-owner Leads <id> --owner <userId> --dry-run

zoho crm leads create --json '{"Last_Name":"Smith","Company":"Acme"}' --dry-run
zoho crm contacts update --id <id> --json '{"Phone":"+1..."}' --dry-run
zoho crm deals create --json '{"Deal_Name":"Acme Q2","Stage":"Qualification"}' --dry-run
zoho crm accounts delete --id <id> --dry-run

zoho crm query --sql "SELECT Last_Name, Email FROM Leads WHERE City = 'New York' LIMIT 5"

zoho crm notes list <Module> <recordId>
zoho crm notes create <Module> <recordId> -d '{"Note_Content":"Hello"}' --dry-run
zoho crm attachments list <Module> <recordId>
zoho crm attachments upload <Module> <recordId> --file <path> --dry-run
zoho crm related list <Module> <recordId> --related-list <RelatedModule> --fields "field1,field2"

zoho crm tags list --module Leads
zoho crm tags add Leads <recordId> --tag-names "tag1,tag2" --dry-run
zoho crm modules list
zoho crm fields list --module Leads
zoho crm layouts list --module Leads
zoho crm custom-views list --module Leads
zoho crm org info
zoho crm users list
zoho crm leads convert <id> --dry-run
zoho crm notifications list
zoho crm bulk-read create --module Leads --dry-run
zoho crm bulk-write upload --file <path.zip> --dry-run
zoho crm composite -d '[{"method":"GET","url":"/crm/v7/Leads?per_page=1"}]' --dry-run
```

CRM gotchas:

- `records list` may require `--fields`.
- Non-existent IDs return `success: false` with `RECORD_NOT_FOUND`.
- Invalid JSON in `--data` returns `INVALID_JSON` with exit code 3.
- Bulk write uploads need Zoho Files scope in addition to CRM bulk scopes.

## People

Use `dd-MMM-yyyy` dates for People APIs, for example `01-Apr-2026`.

```bash
zoho people employees list
zoho people employees get <recordId>
zoho people employees search --search-params '[{"searchField":"EmployeeID","searchOperator":"Contains","searchText":"E"}]'
zoho people employees add --data '{"FirstName":"Jane","LastName":"Doe","EmailID":"jane@co.com"}' --dry-run
zoho people employees update <id> --data '{"FirstName":"Updated"}' --dry-run

zoho people attendance report --from "01-Apr-2026" --to "30-Jun-2026"
zoho people attendance report --from "01-Apr-2026" --to "30-Jun-2026" --employee "email@example.com"
zoho people attendance entries --date "07-Apr-2026"
zoho people attendance checkin --data '{"empId":"<id>","checkIn":"07-Apr-2026 09:00:00"}' --dry-run
zoho people attendance checkout --data '{"empId":"<id>","checkOut":"07-Apr-2026 18:00:00"}' --dry-run
zoho people attendance latest

zoho people leave types
zoho people leave holidays
zoho people leave list --from "01-Apr-2026" --to "30-Apr-2026"
zoho people leave apply --data '{"Leavetype":"Casual Leave","From":"25-Dec-2026","To":"25-Dec-2026"}' --dry-run
zoho people leave user-report --employee <empId> --from "01-Apr-2026" --to "30-Apr-2026"

zoho people forms list
zoho people forms fields --form Employee
zoho people forms search --form Employee
zoho people forms get --form Employee --id <recordId>
zoho people forms insert --form Employee --data '{"FirstName":"Test"}' --dry-run
zoho people forms update --form Employee --id <id> --data '{"FirstName":"Updated"}' --dry-run

zoho people timetracker clients list
zoho people timetracker projects list
zoho people timetracker jobs list
zoho people timetracker timelogs list --from "01-Apr-2026" --to "07-Apr-2026"
zoho people timetracker payroll-report --from "01-Apr-2026" --to "30-Apr-2026"
```

People gotchas:

- Attendance report calls are limited to roughly three months; split annual reports into quarters.
- Error responses may arrive as HTTP 200 with error details in the body.
- `leave balance` is a write operation that adds balance; it is not a balance query.
- Timetracker, LMS, Cases, and Organization commands may need plan support or extra OAuth scopes.

## Projects

Most entity commands require `--project <id>` or `-p <id>`.

```bash
zoho projects portals list
zoho projects portals get
zoho projects list
zoho projects get <projectId>
zoho projects create -d '{"name":"New Project"}' --dry-run
zoho projects update <projectId> -d '{"name":"Updated"}' --dry-run
zoho projects search --query "keyword" --module projects

zoho projects tasks list -p <projectId>
zoho projects tasks my
zoho projects tasks get <taskId> -p <projectId>
zoho projects tasks create -p <projectId> -d '{"name":"New Task"}' --dry-run
zoho projects tasks update <taskId> -p <projectId> -d '{"name":"Updated"}' --dry-run
zoho projects tasks delete <taskId> -p <projectId> --dry-run

zoho projects tasklists list -p <projectId>
zoho projects phases list -p <projectId>
zoho projects issues list -p <projectId>
zoho projects comments list -p <projectId> --entity-type tasks --entity-id <taskId>
zoho projects attachments upload -p <projectId> --entity-type tasks --entity-id <taskId> --file <path> --dry-run
zoho projects timelogs list -p <projectId>
zoho projects users list -p <projectId>
```

Projects gotchas:

- The API is v3 and returns arrays directly for many endpoints.
- `forums` and `issues` may be unavailable on some plans.
- Phases are called milestones in the Zoho UI.
- Portal ID resolves from `--portal`, config, env var, or auto-detection.

## Books

Books requires an organization ID unless one is auto-detected or configured.

```bash
zoho books organizations list
zoho books contacts list --status active
zoho books contacts get <contactId>
zoho books contacts create -d '{"contact_name":"Acme Corp","contact_type":"vendor"}' --dry-run
zoho books contact-persons list <contactId>

zoho books items list
zoho books items create -d '{"name":"Widget","rate":100}' --dry-run

zoho books invoices list --status sent
zoho books invoices get <invoiceId>
zoho books invoices create -d '{"customer_id":"<id>","line_items":[{"item_id":"<id>","quantity":1}]}' --dry-run
zoho books invoices send <invoiceId> --dry-run
zoho books invoices approve <invoiceId> --dry-run
zoho books invoices void <invoiceId> --dry-run

zoho books estimates list
zoho books sales-orders list
zoho books purchase-orders list
zoho books bills list
zoho books expenses list
zoho books customer-payments list
zoho books vendor-payments list
zoho books bank-accounts list
zoho books chart-of-accounts list
zoho books journals list
zoho books taxes list
zoho books users list
zoho books projects list
zoho books time-entries list
```

## Expense

Expense uses the organization ID header internally.

```bash
zoho expense organizations list
zoho expense expenses list
zoho expense expenses create -d '{"date":"2026-04-01","amount":25}' --dry-run
zoho expense receipts upload --file <path> --dry-run
zoho expense reports list --status submitted
zoho expense reports get <reportId>
zoho expense reports approve <reportId> --dry-run
zoho expense reports reject <reportId> --dry-run
zoho expense trips list
zoho expense trips approve <tripId> --dry-run
zoho expense users list
zoho expense categories list
zoho expense projects list
zoho expense tags list
```

Expense gotchas:

- Status-changing commands support `--dry-run`.
- Bad org IDs commonly return error code `6041`.

## Desk

Desk uses a required org ID header on almost every endpoint. Pagination uses Desk's `from`/`limit` internally but the CLI exposes `--page` and `--per-page`.

```bash
zoho desk organizations list
zoho desk tickets list --status Open --department <deptId>
zoho desk tickets get <ticketId>
zoho desk tickets create -d '{"subject":"Login issue","departmentId":"<id>","contactId":"<id>","description":"..."}' --dry-run
zoho desk tickets update <ticketId> -d '{"status":"On Hold","priority":"High"}' --dry-run
zoho desk tickets move <ticketId> --department <deptId> --dry-run
zoho desk tickets merge <ticketId> -d '{"ids":["<id2>","<id3>"]}' --dry-run
zoho desk tickets close --ids "id1,id2,id3" --dry-run
zoho desk tickets search --query "login error"
zoho desk tickets history <ticketId>
zoho desk tickets metrics <ticketId>

zoho desk threads list --ticket <ticketId>
zoho desk threads reply --ticket <ticketId> -d '{"channel":"EMAIL","to":"user@example.com","content":"Hi","contentType":"html"}' --dry-run
zoho desk ticket-comments add --ticket <ticketId> -d '{"content":"Internal note","contentType":"html","isPublic":false}' --dry-run
zoho desk ticket-attachments upload --ticket <ticketId> --file /path/file.pdf --dry-run
zoho desk ticket-tags add --ticket <ticketId> -d '{"tagIds":["<id1>"]}' --dry-run
zoho desk ticket-time-entries create --ticket <ticketId> -d '{"executedTime":"01:30","agentId":"<id>"}' --dry-run
zoho desk ticket-timers start --ticket <ticketId>

zoho desk contacts list
zoho desk contacts search --query "acme"
zoho desk accounts list
zoho desk agents list --department <deptId> --status ACTIVE
zoho desk departments list
zoho desk tasks list --department <deptId> --status Open
zoho desk articles search --query "login"
zoho desk kb-categories list
zoho desk kb-sections list --category-id <id>
zoho desk views list --module tickets
zoho desk search --query "acme" --module tickets
zoho desk fields list --module tickets
zoho desk blueprints list --department <deptId>
```

Desk gotchas:

- Updates use `PATCH`.
- Delete operations usually move records to recycle bin rather than hard-deleting.
- Ticket sub-resources require `--ticket <id>`.
- Desk error responses use `errorCode`; the CLI maps them into the standard envelope.

## Bookings

Bookings uses action-style v1 endpoints and a workspace ID. Date/time flags accept ISO 8601; timezone suffixes are stripped and treated as workspace-local time.

```bash
zoho bookings workspaces list
zoho bookings workspaces get <workspaceId>
zoho bookings workspaces create --name "Sales Team" --dry-run

zoho bookings services list
zoho bookings services list --staff <staffId>
zoho bookings services create --name "30-min Consult" --duration 30 --meeting-mode online --meeting-type zoom --cost 50 --dry-run

zoho bookings staff list
zoho bookings staff search <email-substring>
zoho bookings staff add --name "Alice" --email alice@acme.com --role Staff --dob 1990-05-15 --dry-run

zoho bookings resources list
zoho bookings availability slots --service <svcId> --staff <stfId> --selected-date 2026-05-01
zoho bookings appointments list --status UPCOMING --per-page 100
zoho bookings appointments get <bookingId>
zoho bookings appointments book --service <svcId> --staff <stfId> --from-time 2026-05-01T10:00 --customer-name "Alice" --customer-email "alice@example.com" --customer-phone-number "555-1234" --timezone "Asia/Kolkata" --dry-run
zoho bookings appointments reschedule <id> --start-time 2026-05-02T14:00 --dry-run
zoho bookings appointments complete <id> --dry-run
zoho bookings appointments cancel <id> --dry-run
zoho bookings appointments noshow <id> --dry-run
```

Bookings gotchas:

- Availability and booking require exactly one of `--staff`, `--group`, or `--resource`.
- `book` requires either `--customer-details <json>` or all three customer name/email/phone flags.
- Some service, staff, and resource mutation commands are experimental because they target undocumented endpoints. Use `--dry-run` first.
