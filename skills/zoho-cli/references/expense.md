# Zoho Expense (73 commands)

Org ID: auto-detected, or `--org <id>` / `zoho config set defaultOrg <id>` (shared with Books and Desk).

## Examples
```bash
zoho expense reports list --status submitted
zoho expense reports get <reportId>
zoho expense reports approve <reportId> --dry-run
zoho expense reports reject <reportId> --dry-run
zoho expense expenses create -d '{"date":"2026-04-01","amount":25}' --dry-run
zoho expense trips approve <tripId> --dry-run
```

## All Commands
```bash
zoho expense organizations list/get/create/update
zoho expense expenses list/create/update/merge
zoho expense receipts upload --file <path> --dry-run
zoho expense reports list/get/create/update/approve/reject/reimburse/approval-history
zoho expense trips list/get/create/update/delete/approve/reject/cancel/close
zoho expense users list/get/create/update/delete/activate/deactivate/assign-role
zoho expense currencies list/get/create/update/delete
zoho expense taxes list/get/create/update/delete/get-group
zoho expense categories list/get/create/update/delete/enable/disable
zoho expense customers list/get/create/update/delete
zoho expense projects list/get/create/update/delete/activate/deactivate
zoho expense tags list/create/update/delete/activate/deactivate/get-options/update-options/reorder
```

## Expense-Specific Notes
- Uses `X-com-zoho-expense-organizationid` header (handled automatically)
- Status-changing commands (approve, reject, cancel, close, activate, deactivate, enable, disable, reimburse) all support `--dry-run`
- Bad org ID returns: `{"success": false, "error": {"code": "6041", "message": "This user is not associated..."}}`
