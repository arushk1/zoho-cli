# Feasibility: Zoho Billing and Zoho Payments plugins for zoho-cli

Research date: 2026-09-01. All claims below are sourced from official Zoho API documentation (primary sources only); each section cites the owning page. Repo context: this repo already ships `packages/plugin-books` (Books, `ZohoBooks.fullaccess.all` scope, `organization_id` query param, base URL `https://www.zohoapis.{domain}/books/v3`) and `packages/plugin-expense`, neither of which is yet documented in CLAUDE.md.

---

## Zoho Billing (formerly Zoho Subscriptions)

### 1. Public REST API — yes

- Current version: **v1**, documented under the **`/billing/v1`** path (the docs have migrated from the old Subscriptions naming; the recommended base path is `billing/v1`).
- Base URL: `https://www.zohoapis.com/billing/v1`, with region-specific domains including **India: `https://www.zohoapis.in/billing/`**, EU `zohoapis.eu`, AU `zohoapis.com.au`, JP `zohoapis.jp`, CA `zohoapis.ca`, CN `zohoapis.com.cn`, SA `zohoapis.sa`.
- Source: https://www.zoho.com/billing/api/v1/introduction/

This maps 1:1 onto the CLI's existing `REGION_DOMAINS` table (`packages/core/src/config/schema.ts`), which already resolves `in → zohoapis.in` etc.

### 2. Auth — standard Zoho OAuth2

- Standard accounts-server flow: authorize `https://accounts.zoho.{dc}/oauth/v2/auth`, token `https://accounts.zoho.{dc}/oauth/v2/token`, revoke `/oauth/v2/token/revoke`; regional accounts servers include `accounts.zoho.in` for India. Grant types: `authorization_code` + `refresh_token` (access tokens expire in 1 hour; refresh tokens are long-lived).
- Scope format: **`ZohoSubscriptions.{resource}.{OPERATION}`** (operations: CREATE/UPDATE/READ/DELETE), e.g. `ZohoSubscriptions.invoices.READ`, `ZohoSubscriptions.subscriptions.UPDATE`, and the umbrella scope **`ZohoSubscriptions.fullaccess.all`**. Note: the scope prefix is still `ZohoSubscriptions`, not `ZohoBilling`, despite the product rename.
- Source: https://www.zoho.com/billing/api/v1/oauth/

This is exactly the flow `packages/core/src/auth/oauth.ts` already implements (`/oauth/v2/auth` + `/oauth/v2/token` with refresh). Adding Billing = appending scopes to the default list in `packages/cli/src/commands/auth/login.ts`.

### 3. Required headers

- Every request requires the header **`X-com-zoho-subscriptions-organizationid: {organization_id}`** (legacy Subscriptions name retained) plus `Authorization: Zoho-oauthtoken {token}`. It is a header, not a query param (unlike Books, which uses the `organization_id` query param).
- Sources: https://www.zoho.com/billing/api/v1/introduction/ , https://www.zoho.com/billing/api/v1/customers/

### 4. Rate limits

- Per the API introduction: **100 requests/min per organization** (HTTP 429 on exceed); daily caps are plan-based (docs cite Standard ~1,000/day, Premium ~5,000/day); concurrency limits ~5 (free) / ~10 (paid) calls. A separate Billing KB FAQ cites 2,500 API requests/day — the exact daily cap is plan-dependent, so treat it as "plan-based, order of 1k–5k/day".
- No documented rate-limit response headers (unlike CRM's `X-RATELIMIT-REMAINING`), so client-side throttling only.
- Sources: https://www.zoho.com/billing/api/v1/introduction/ , https://www.zoho.com/us/billing/kb/webhooks/api-limits.html

### 5. Pagination

- Query params `page` (default 1) and `per_page` (default 200 on most lists); list responses include a **`page_context`** node: `{ "page": 2, "per_page": 25, "has_more_page": false }`.
- Source: https://www.zoho.com/billing/api/v1/pagination/

Same shape as Books/Expense — a `hasMore = data.page_context?.has_more_page` helper covers it.

### 6. Error envelope and quirks

- JSON bodies throughout; success and error responses share the envelope `{ "code": <number>, "message": "<text>", ...resource key }` with `code: 0` meaning success. Errors: `{ "code": <number>, "message": "<description>" }` with appropriate HTTP status (429 on rate limit).
- Quirks: the org header keeps the legacy `subscriptions` name; hosted pages return Zoho-hosted checkout URLs (browser flows, not fully scriptable); webhooks/events exist but are out of CLI scope.
- Sources: https://www.zoho.com/billing/api/v1/introduction/ , https://www.zoho.com/billing/api/v1/response/

### 7. Resource coverage

Documented modules include: customers, subscriptions, invoices, quotes, plans, addons, coupons, items/products, payments, **payment links** (https://www.zoho.com/billing/api/v1/payment-links/), credit notes, refunds, **hosted pages** (https://www.zoho.com/billing/api/v1/hosted-pages/), expenses, projects/tasks/time entries, cards, bank accounts, unbilled charges, price lists, events, settings, reporting tags, custom modules.
Source: https://www.zoho.com/billing/api/v1/introduction/

Plenty for a first-cut plugin: customers, plans, addons, coupons, subscriptions (incl. lifecycle verbs), invoices, payments, credit notes, hosted pages.

---

## Zoho Payments

### 1. Public REST API — yes, but region-limited (India + US only)

- Current version: **v1**.
- Base URLs: **India: `https://payments.zoho.in/api/v1`** (source: https://www.zoho.com/in/payments/api/v1/introduction ), **US: `https://payments.zoho.com/api/v1`** (source: https://www.zoho.com/us/payments/api/v1/introduction/ ).
- Availability: Zoho Payments is currently available **only to businesses registered in India (INR, domestic only) and the US** (source: https://www.zoho.com/us/payments/faq/general/countries-and-currencies/ ). No EU/AU/JP/CA editions.
- Note the domain: `payments.zoho.{in|com}`, **not** `www.zohoapis.{domain}` — it does not fit the `REGION_DOMAINS` (zohoapis) table and needs its own domain mapping (`in → payments.zoho.in`, `us → payments.zoho.com`, all other regions unsupported).

### 2. Auth — Zoho OAuth2, but with an org-scoped authorize endpoint

- Token/refresh endpoints are standard: `https://accounts.zoho.in/oauth/v2/token` (grant types `authorization_code`, `refresh_token`; 1-hour access tokens; max 20 refresh tokens per user, oldest auto-deleted).
- **Divergence:** the authorization URL is the org-scoped variant **`https://accounts.zoho.in/oauth/v2/org/auth`** and requires an extra **`soid=zohopay.{account_id}`** parameter (e.g. `soid=zohopay.8xxxxxxxx3`). This is not the plain `/oauth/v2/auth` endpoint the CLI's `buildAuthorizationUrl()` produces today — `packages/core/src/auth/oauth.ts` would need an optional `authPath`/`soid` extension.
- Scope format: **`ZohoPay.{module}.{OPERATION}`**, e.g. `ZohoPay.payments.CREATE`, `ZohoPay.payments.READ`, `ZohoPay.refunds.CREATE`, `ZohoPay.customers.READ`, `ZohoPay.payouts.READ`, `ZohoPay.transfers.CREATE`, `ZohoPay.connectedaccounts.READ`, `ZohoPay.settings.*`.
- Sandbox: replace the scope prefix with **`ZohoPaySandbox`** and use `soid=zohopaysandbox.{account_id}`; sandbox portal at `https://paymentssandbox.zoho.in/`.
- Sources: https://www.zoho.com/in/payments/api/v1/oauth/ , https://www.zoho.com/payments/api/v1/authentication/ , https://www.zoho.com/payments/api/v1/introduction/

### 3. Required parameters

- **`account_id` is a mandatory query parameter on every request** (e.g. `?account_id=23137556`), obtained from the Payments dashboard (Settings → Account Details). No special header beyond `Authorization: Zoho-oauthtoken`.
- Sources: https://www.zoho.com/payments/api/v1/introduction/ , https://www.zoho.com/us/payments/api/v1/introduction/

### 4. Rate limits

- **600 requests/min** for customers, payment methods, payments; **60 requests/min** for refunds; HTTP 429 with temporary blocking on exceed (limit increases via support@zohopay.com). No documented rate-limit response headers.
- Sources: https://www.zoho.com/us/payments/api/v1/introduction/ , https://www.zoho.com/us/payments/developerdocs/rate-limits/

### 5. Pagination

- List endpoints (e.g. `GET /payments`) take `page` and `per_page` (default 25, max 200) query params.
- Source: https://www.zoho.com/in/payments/api/v1/payments/

### 6. Error envelope and quirks

- Envelope matches the Books/Billing family: `{ "code": 0, "message": "success", "payment": {...} }` / `{ "code": 0, "message": "success", "payments": [...] }`; errors carry a code + message.
- JSON request bodies (e.g. `POST https://payments.zoho.in/api/v1/paymentsessions?account_id=...` with a JSON payload; scope `ZohoPay.paymentmethods.CREATE`).
- Payment sessions exist primarily to power the browser-side Zoho Payments widget — creating a session via CLI is possible, but completing a card payment is inherently a browser/widget flow. Server-to-server useful surface: payments (list/get), refunds, payment links, customers, payouts, mandates.
- Full sandbox/test mode exists (separate sandbox portal, `ZohoPaySandbox` scopes) — a `--sandbox` flag is feasible but changes scope prefix, `soid`, and (per sandbox portal domain) likely the API host, so it touches auth setup, not just the base URL.
- Sources: https://www.zoho.com/in/payments/api/v1/payments/ , https://www.zoho.com/in/payments/api/v1/payment-session , https://www.zoho.com/payments/api/v1/introduction/

### 7. Resource coverage

Documented modules: payment sessions, customers, payment methods, payments, payment links, mandates, virtual accounts (collect), refunds, payouts, transfers/connected accounts (split & marketplace settlement), settings, webhooks.
Sources: https://www.zoho.com/payments/api/v1/introduction/ , https://www.zoho.com/us/payments/api/v1/customer/ , https://www.zoho.com/us/payments/api/v1/payment-method/

---

## Books overlap

The repo already has a full `packages/plugin-books` (organizations, invoices, customer payments, credit notes, estimates, purchase orders, chart of accounts, etc.) using `https://www.zohoapis.{domain}/books/v3` and `organization_id` as a query param, plus raw GET passthrough for reports/bank transactions (commit 70d5c94). Billing overlaps Books on customers/invoices/credit-notes/payments but is a distinct product + API family (`billing/v1`, org **header**, `ZohoSubscriptions.*` scopes) whose differentiators are subscriptions, plans, addons, coupons, and hosted pages. Both can coexist as separate plugins the same way Books and Expense already do; a Billing org is separate from a Books org (both are auto-listable via their own `/organizations`-style endpoints).

## Fit with existing architecture

- **plugin-billing**: near copy of `packages/plugin-books/src/books-base-command.ts`. Differences: base URL `https://www.{REGION_DOMAINS[region]}/billing/v1`; org passed as the `X-com-zoho-subscriptions-organizationid` **header** on every call instead of a query param (set via axios default headers or per-request config in `billingGet/Post/Put/Delete` helpers); config key `defaultBillingOrg` + `--org` flag + env var; pagination helper reading `page_context.has_more_page`; error handling identical (`{code, message}` — the existing `handleApiError` already reads `respData.code`/`respData.message`). No changes to `packages/core` required. Add `ZohoSubscriptions.fullaccess.all` (or granular scopes) to the default scope list in `packages/cli/src/commands/auth/login.ts`.
- **plugin-payments**: base command needs (a) its own host map `{ in: 'payments.zoho.in', us: 'payments.zoho.com' }` with a hard error for other configured regions; (b) `account_id` resolution (`--account` flag > `config.defaultPaymentsAccount` > `ZOHO_PAYMENTS_ACCOUNT_ID` env; no documented auto-detect endpoint, so make it required); (c) the one **core change** in the whole proposal: `buildAuthorizationUrl()` in `packages/core/src/auth/oauth.ts` must optionally emit `/oauth/v2/org/auth` with a `soid` param so `zoho auth login` can mint tokens that include `ZohoPay.*` scopes. Token exchange/refresh are unchanged. Optional `--sandbox` support later (ZohoPaySandbox scopes + sandbox soid/host).

## Verdict

- **plugin-billing: feasible, low effort.** Public v1 REST API at `https://www.zohoapis.in/billing/v1` (India) with standard Zoho OAuth (`ZohoSubscriptions.*` scopes, `ZohoSubscriptions.fullaccess.all` umbrella), org header `X-com-zoho-subscriptions-organizationid`, `page`/`per_page` + `page_context.has_more_page` pagination, `{code, message}` errors. It is architecturally a sibling of the existing Books plugin; no core changes needed. Caveats: scope prefix and org header still use the legacy "Subscriptions" name; daily API cap is plan-based (~1k–5k/day) with no rate-limit headers; hosted-page checkout flows are browser-bound.
- **plugin-payments: feasible with caveats, moderate effort.** Public v1 REST API, JSON, `{code, message}` envelope, `page`/`per_page` pagination, sandbox mode. Blockers/caveats: (1) **India + US only** — fine for this repo's `.in` default, but the plugin must fail cleanly for other regions; (2) dedicated host `payments.zoho.in` / `payments.zoho.com` outside the shared `zohoapis` domain table; (3) OAuth authorization uses the org-scoped `https://accounts.zoho.in/oauth/v2/org/auth` endpoint with `soid=zohopay.{account_id}` — requires a small extension to `packages/core/src/auth/oauth.ts` and knowing the account_id *before* login; (4) mandatory `account_id` query param on every request with no documented auto-detect; (5) card-payment capture itself is a browser-widget flow — the CLI's useful surface is payments/refunds/payment links/customers/payouts.
- **Recommended first scopes**: Billing — `ZohoSubscriptions.fullaccess.all`; Payments — `ZohoPay.payments.CREATE`, `ZohoPay.payments.READ`, `ZohoPay.refunds.CREATE`, `ZohoPay.refunds.READ`, `ZohoPay.customers.READ`, `ZohoPay.payouts.READ`, `ZohoPay.settings.READ`.

*Note on file location: the repo had no research-notes convention (only `docs/superpowers/plans/` and `docs/superpowers/specs/` for implementation plans/specs), so this file establishes `docs/research/`.*
