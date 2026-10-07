# Zoho Billing (44 commands)

Subscription billing (formerly Zoho Subscriptions). Separate product and org from Zoho Books — a Billing org is NOT a Books org. Scope `ZohoSubscriptions.fullaccess.all` is added automatically by `zoho auth login` (re-login if you get error 57 "not authorized").

## Organizations & Customers
```bash
zoho billing organizations list                  # Find org IDs (works without org context)
zoho billing customers list [--email <e>]
zoho billing customers get|create|update|delete  # create/update take --data '<json>'
```

## Plans, Addons, Coupons (catalog — keyed by CODE, not numeric ID)
```bash
zoho billing plans list [--product-id <id>]
zoho billing plans get <plan_code>               # get/update/delete take the code
zoho billing plans create --data '{"plan_code":"pro-monthly","name":"Pro","recurring_price":999,"interval":1,"product_id":"..."}'
zoho billing addons list|get|create|update|delete    # keyed by addon_code
zoho billing coupons list|get|create|update|delete   # keyed by coupon_code
```

## Subscriptions
```bash
zoho billing subscriptions list [--customer-id <id>] [--filter-by SubscriptionStatus.ACTIVE]
zoho billing subscriptions get <id>
zoho billing subscriptions create --data '{"customer_id":"...","plan":{"plan_code":"pro-monthly"}}'
zoho billing subscriptions update <id> --data '<json>'
zoho billing subscriptions cancel <id>           # Immediate (status: cancelled)
zoho billing subscriptions cancel <id> --at-end  # End of term (status: non_renewing)
zoho billing subscriptions reactivate <id>
```

## Invoices, Payments, Credit Notes, Hosted Pages
```bash
zoho billing invoices list [--customer-id <id>] [--subscription-id <id>] [--filter-by Status.Unpaid]
zoho billing invoices get|void|send|write-off <id>   # send = email to customer
zoho billing payments list|get|create|update|delete  # create records an offline payment
zoho billing credit-notes get|create|void <id>       # NO list endpoint documented
zoho billing credit-notes apply <id> --data '{"invoices":[{"invoice_id":"...","amount_applied":100}]}'
zoho billing hosted-pages list                       # Zoho-hosted checkout pages
zoho billing hosted-pages get <id>                   # Includes status + URL
zoho billing raw get /events --param page=1          # Read-only passthrough for unwrapped endpoints
```

## Billing API Gotchas
- **Org travels as a header** (`X-com-zoho-subscriptions-organizationid`), unlike Books' query param. The CLI handles this; just set the org.
- **Scope prefix is still `ZohoSubscriptions.*`** despite the product rename — there is no `ZohoBilling.*`.
- **Catalog resources are code-keyed:** pass `plan_code`/`addon_code`/`coupon_code` to get/update/delete, not numeric IDs.
- **Rate limits:** 100 req/min/org, plan-based daily cap (~1k–5k/day), no rate-limit headers.
- **Hosted checkout is browser-bound** — `hosted-pages` commands create/inspect the pages, but card entry happens in the browser.
