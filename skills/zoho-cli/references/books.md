# Zoho Books (167 commands)

## Raw passthrough (reports, bank transactions)
```bash
zoho books raw get /reports/profitandloss --param from_date=2026-04-01 --param to_date=2026-08-26   # accrual; add --param cash_based=true
zoho books raw get /reports/balancesheet --param to_date=2026-07-31
zoho books raw get /reports/cashflow --param from_date=2026-07-01 --param to_date=2026-07-31
zoho books raw get /reports/aragingsummary --param date=2026-08-26      # total = OVERDUE amount, aging by due date
zoho books raw get /reports/apagingsummary --param date=2026-08-26
zoho books raw get /banktransactions --param account_id=<id> --param date_start=2026-08-01 --param date_end=2026-08-26 --param per_page=200
zoho books raw get /banktransactions --param account_id=<id> --param filter_by=Status.Uncategorized --param page=2
```
GET-only passthrough for endpoints the CLI does not wrap; `organization_id` is appended. Gotchas measured 2026-08-26: `/banktransactions` **ignores `date_start`/`date_end` whenever `filter_by` is passed**; the default listing (`Status.All`) **excludes** `uncategorized` rows, so fetch those with `filter_by=Status.Uncategorized` separately. On a bank account `debit_or_credit: debit` means money **in**. Reports ignore `group_by=month` — one call per month.

## Contacts & Items
```bash
zoho books contacts list
zoho books contacts list --page 1 --per-page 5 --status active
zoho books contacts get <contactId>
zoho books contacts create -d '{"contact_name":"Acme Corp","contact_type":"vendor"}' --dry-run
zoho books contacts activate <contactId> --dry-run
zoho books contacts deactivate <contactId> --dry-run
zoho books contact-persons list <contactId>
zoho books contact-persons get <contactId> <personId>
zoho books items list
zoho books items get <itemId>
zoho books items create -d '{"name":"Widget","rate":100}' --dry-run
```

## Invoices
```bash
zoho books invoices list
zoho books invoices list --status sent --customer-id <contactId>
zoho books invoices get <invoiceId>
zoho books invoices create -d '{"customer_id":"<id>","line_items":[{"item_id":"<id>","quantity":1}]}' --dry-run
zoho books invoices update <invoiceId> -d '{...}' --dry-run
zoho books invoices delete <invoiceId> --dry-run
zoho books invoices send <invoiceId> --dry-run
zoho books invoices approve <invoiceId> --dry-run
zoho books invoices void <invoiceId> --dry-run
zoho books invoices draft <invoiceId> --dry-run
```

## Full Command List
```bash
zoho books invoices list/get/create/update/delete/send/void/draft/approve
zoho books estimates list/get/create/update/delete/send/accept/decline/approve
zoho books sales-orders list/get/create/update/delete/open/void/approve
zoho books purchase-orders list/get/create/update/delete/open/billed/cancel/approve/reject
zoho books bills list/get/create/update/delete/void/open/approve
zoho books credit-notes list/get/create/update/delete/void/draft/open/approve
zoho books vendor-credits list/get/create/update/delete/void/open/approve
zoho books expenses list/get/create/update/delete
zoho books customer-payments list/get/create/update/delete
zoho books vendor-payments list/get/create/update/delete
zoho books recurring-invoices list/get/create/update/delete/stop/resume
zoho books recurring-bills list/get/create/update/delete/stop/resume
zoho books bank-accounts list/get/create/update/delete/activate/deactivate
zoho books chart-of-accounts list/get/create/update/delete/activate/deactivate
zoho books journals list/get/create/update/delete/publish
zoho books taxes list/get/create/update/delete
zoho books currencies list/get/create/update/delete
zoho books organizations list/get
zoho books users list/get/create/update/delete/me/invite/activate/deactivate
zoho books projects list/get/create/update/delete/clone/activate/deactivate
zoho books time-entries list/get/create/update/delete/start-timer/stop-timer/running
zoho books contact-persons list/get/create/update/delete
zoho books items list/get/create/update/delete/activate/deactivate
```

## Common Books Flags
- `--data '{...}'` or `-d '{...}'` -- JSON body for create/update
- `--dry-run` -- Preview without executing (ALL write/action operations)
- `--page N` / `--per-page N` -- Pagination
- `--status <status>` -- Filter lists (draft/sent/paid/overdue/void etc.)
- `--customer-id <id>` / `--vendor-id <id>` -- Filter by contact
- `--org <id>` -- Override organization ID
