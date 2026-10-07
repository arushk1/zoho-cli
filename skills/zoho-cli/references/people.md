# Zoho People (100 commands)

## Employees
```bash
zoho people employees list                            # List all employees
zoho people employees list --page 1 --per-page 5      # Paginated
zoho people employees get <recordId>                   # Get employee by record ID
zoho people employees search --search-params '[{"searchField":"EmployeeID","searchOperator":"Contains","searchText":"E"}]'
zoho people employees add --data '{"FirstName":"Jane","LastName":"Doe","EmailID":"jane@co.com"}' --dry-run
zoho people employees update <id> --data '{"FirstName":"Updated"}' --dry-run
```

## Attendance
```bash
zoho people attendance report --from "01-Apr-2025" --to "30-Jun-2025"
zoho people attendance report --from "01-Apr-2025" --to "30-Jun-2025" --employee "email@example.com"
zoho people attendance entries --date "07-Apr-2026"
zoho people attendance entries --date "07-Apr-2026" --employee <empId>
zoho people attendance checkin --data '{"empId":"<id>","checkIn":"07-Apr-2026 09:00:00"}' --dry-run
zoho people attendance checkout --data '{"empId":"<id>","checkOut":"07-Apr-2026 18:00:00"}' --dry-run
zoho people attendance latest
zoho people attendance bulk-import --data '{...}' --dry-run
zoho people attendance shift-config
zoho people attendance shift-update --data '{...}' --dry-run
zoho people attendance regularization --data '{...}' --dry-run
```

**Attendance report limits:** Max ~3 months per call. For a full year, split into quarterly calls and merge:
```bash
zoho people attendance report --from "01-Apr-2025" --to "30-Jun-2025" 2>/dev/null > /tmp/q1.json
zoho people attendance report --from "01-Jul-2025" --to "30-Sep-2025" 2>/dev/null > /tmp/q2.json
zoho people attendance report --from "01-Oct-2025" --to "31-Dec-2025" 2>/dev/null > /tmp/q3.json
zoho people attendance report --from "01-Jan-2026" --to "31-Mar-2026" 2>/dev/null > /tmp/q4.json
```

**Response structure:**
```json
{
  "result": [{
    "employeeDetails": { "first name": "...", "last name": "...", "mail id": "...", "erecno": "..." },
    "attendanceDetails": {
      "2025-04-01": { "Status": "Present", "FirstIn": "10:05 AM", "LastOut": "07:12 PM", "TotalHours": "09:07" }
    }
  }]
}
```

**Status values:** `Present`, `Absent`, `Weekend`, `Holiday` (with name, e.g. "Good Friday(Holiday)"), `Leave`, `Half Day`, `On Duty`, `WFH`, empty string (unmarked/not yet recorded).

## Leave Management
```bash
zoho people leave types                               # List all leave types
zoho people leave holidays                            # List holidays
zoho people leave list --from "01-Apr-2026" --to "30-Apr-2026"
zoho people leave get <id>                            # Get leave record
zoho people leave apply --data '{"Leavetype":"Casual Leave","From":"25-Dec-2026","To":"25-Dec-2026"}' --dry-run
zoho people leave cancel --data '{...}' --dry-run
zoho people leave balance --data '{...}' --dry-run    # Note: this ADDS balance, not queries it
zoho people leave user-report --employee <empId> --from "..." --to "..."
zoho people leave booked-report --from "..." --to "..."
zoho people leave compensatory --from "..." --to "..."
zoho people leave encashment-report
zoho people leave lop-report --from "..." --to "..."
zoho people leave customize-balance --data '{...}' --dry-run
```

## Forms (Generic CRUD -- all People modules are forms)
```bash
zoho people forms list                                # List all form names
zoho people forms fields --form Employee              # List fields for a form
zoho people forms search --form Employee --search-params '[{"searchField":"EmailID","searchOperator":"Contains","searchText":"@"}]'
zoho people forms get --form Employee --id <recordId> # Get record by ID
zoho people forms insert --form Employee --data '{"FirstName":"Test"}' --dry-run
zoho people forms update --form Employee --id <id> --data '{"FirstName":"Updated"}' --dry-run
```

**Note:** Omitting `--search-params` on `forms search` lists all records for that form.

## Timetracker
**Note:** Timetracker must be enabled in Zoho People subscription. If disabled, commands return "Time Tracker Tab is disabled".
```bash
zoho people timetracker clients list/get/add/update/delete
zoho people timetracker projects list/get/add/update/delete/status
zoho people timetracker jobs list/get/add/update/delete/status
zoho people timetracker timelogs list --from "01-Apr-2026" --to "07-Apr-2026" [/get/add/update/delete/bulk]
zoho people timetracker timer start/pause/current/comments
zoho people timetracker timesheets list/get/create/update/delete/approve
zoho people timetracker payroll-report --from "..." --to "..."
```

## Other People Modules
```bash
zoho people cases list/my/view/add/categories         # Requires Cases module in subscription
zoho people announcements get/add/update/delete/toggle
zoho people files list/upload/download/delete/add-folder
zoho people organization info/entities/units/divisions # Requires ZOHOPEOPLE.organization scope
zoho people onboarding add-candidate/update-candidate/trigger
zoho people lms courses list/my/get/create/update/delete  # Requires LMS scope
zoho people lms enroll/unenroll/categories
zoho people separation add/list
```

## People API Gotchas
- **Error responses from Zoho return HTTP 200** with error details in the body. The CLI now properly detects these and returns `success: false`.
- **Zoho People error codes:** 7049 = record not found, 7022 = invalid params, 7218 = invalid OAuth scope
- **Organization/LMS/Cases** may require additional OAuth scopes not in the default set.
- **`leave balance`** is a write operation (adds balance), NOT a balance query.
