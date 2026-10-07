# Zoho Payments (18 commands)

Payment gateway (India + US businesses only; the CLI hard-fails with REGION_UNSUPPORTED elsewhere). Every request needs the account ID — set `defaultPaymentsAccount` once. Requires login via `zoho auth login --payments-account <id>` (org-scoped OAuth consent).

```bash
zoho payments list [--status Status.Succeeded] [--filter-by ChargeDate.Last_30_Days] \
  [--from-date 2026-08-01 --to-date 2026-08-31] [--search-text <q>] [--payment-method-type upi]
zoho payments get <payment_id>
zoho payments refunds create <payment_id> --data '{"amount":100,"reason":"..."}'  # partial or full
zoho payments refunds get <refund_id>
zoho payments payment-links create --data '{"amount":500,"currency":"INR","email":"a@b.com","description":"..."}'
zoho payments payment-links get|update|cancel <link_id>
zoho payments customers create --data '{"name":"...","email":"...","phone":"..."}'
zoho payments customers get <customer_id>
zoho payments payouts list [--status Status.Paid] [--filter-by PayoutDate.ThisMonth]
zoho payments payouts get <payout_id>
zoho payments mandates get <mandate_id>          # Recurring debit mandates
zoho payments mandates notify --data '<json>'    # Pre-debit notification
zoho payments mandates execute --data '<json>'   # Charge after notification
zoho payments sessions create --data '{"amount":500,"currency":"INR","description":"..."}'  # Powers browser widget
zoho payments sessions get <session_id>
zoho payments raw get /payouts/<id>/transactions --param per_page=200
```

## Payments API Gotchas
- **`account_id` is mandatory on every call and has NO auto-detect.** Get it from the Payments dashboard (Settings → Account Details).
- **No list endpoints exist** for refunds, payment links, customers, or mandates — only create/get. Use `payments raw get` for anything undocumented.
- **Refund create is nested** (`POST /payments/{id}/refunds`) but refund get is top-level (`GET /refunds/{id}`) — hence `refunds create` takes the PAYMENT id, `refunds get` takes the REFUND id.
- **Card capture is a browser flow:** `sessions create` returns a session for the Zoho checkout widget; the CLI cannot complete a card payment itself.
- **Date filters:** `--filter-by ChargeDate.CustomDate` requires both `--from-date` and `--to-date` (YYYY-MM-DD).
- **Rate limits:** 600 req/min (payments/customers), 60 req/min (refunds). Pagination default 25, max 200 per page.
- **Sandbox mode is not wired into the CLI yet** (`ZohoPaySandbox.*` scopes are future scope).
