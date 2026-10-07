# Research: Zoho Analytics REST API v2 for a zoho-cli plugin

Research date: 2026-10-07. Every claim below comes from official Zoho sources: the Zoho Analytics API v2 docs (`https://www.zoho.com/analytics/api/v2/...`) and Zoho's official OpenAPI files (`https://github.com/zoho/analytics-oas`, linked from https://www.zoho.com/analytics/api/v2/open-api-specification.html). Each section cites the page it comes from. Items marked **UNVERIFIED** are things the docs do not state; they are not guesses.

Repo context: `packages/core/src/config/schema.ts` defines `REGION_DOMAINS` and `ACCOUNTS_DOMAINS` for `us | eu | in | au | jp | ca`. Analytics uses its own host family (`analyticsapi.*`), not `zohoapis.*`, so the plugin needs its own host map, as Projects, People, Desk and Payments already have.

---

## 1. Base URL per data center

Base path: **`https://<ZohoAnalytics_Server_URI>/restapi/v2`**, e.g. `https://analyticsapi.zoho.com/restapi/v2/workspaces`. HTTPS is mandatory; HTTP is not supported.

| DC | Analytics API host | Accounts host | Developer console |
|---|---|---|---|
| US | `analyticsapi.zoho.com` | `accounts.zoho.com` | `api-console.zoho.com` |
| EU | `analyticsapi.zoho.eu` | `accounts.zoho.eu` | `api-console.zoho.eu` |
| IN | `analyticsapi.zoho.in` | `accounts.zoho.in` | `api-console.zoho.in` |
| AU | `analyticsapi.zoho.com.au` | `accounts.zoho.com.au` | `api-console.zoho.com.au` |
| CN | `analyticsapi.zoho.com.cn` | `accounts.zoho.com.cn` | `api-console.zoho.com.cn` |
| JP | `analyticsapi.zoho.jp` | `accounts.zoho.jp` | `api-console.zoho.jp` |
| SA | `analyticsapi.zoho.sa` | `accounts.zoho.sa` | `api-console.zoho.sa` |
| **CA** | **`analyticsapi.zohocloud.ca`** | `accounts.zohocloud.ca` | `api-console.zohocloud.ca` |

- **CA uses `zohocloud.ca`, not `zoho.ca`.** That differs from the repo's `PROJECTS/PEOPLE/DESK_REGION_DOMAINS` (`*.zoho.ca`) and matches the repo's `ACCOUNTS_DOMAINS.ca`. (Doc quirk: the page's CA console link's `href` points to `api-console.zohocloud.sa`, but the visible text says `.ca`.)
- CN and SA exist for Analytics but are not in the repo's `ZohoRegion` enum.
- The OAuth token response's `api_domain` is `https://www.zohoapis.com`. Do **not** use it as the Analytics host, because Analytics calls go to `analyticsapi.*` (source: generating-token page below).
- Sources: https://www.zoho.com/analytics/api/v2/api-specification.html (Server URI table), https://www.zoho.com/analytics/api/v2/prerequisites.html

## 2. Auth and OAuth scopes

- Standard Zoho OAuth2: authorize `GET https://<accounts>/oauth/v2/auth` (`scope`, `client_id`, `response_type=code`, `redirect_uri`, `access_type=offline|online`, `prompt=consent`). Token `POST https://<accounts>/oauth/v2/token` uses `grant_type=authorization_code` or `refresh_token`. Access tokens last 1 hour. A client can mint at most 10 access tokens per 10 minutes from one refresh token. Each user can have at most 20 refresh tokens, and the oldest is deleted automatically.
- Header: `Authorization: Zoho-oauthtoken <access_token>`. The header is the only way to send the token; it cannot go in a query param.
- Multiple scopes are comma-separated, e.g. `ZohoAnalytics.data.all,ZohoAnalytics.modeling.create`.
- Sources: https://www.zoho.com/analytics/api/v2/authentication/generating-code.html , https://www.zoho.com/analytics/api/v2/authentication/generating-token.html , https://www.zoho.com/analytics/api/v2/authentication/refresh-token.html

Scopes listed on the Prerequisites page (https://www.zoho.com/analytics/api/v2/prerequisites.html):

| Group | Scopes |
|---|---|
| data | `ZohoAnalytics.data.read`, `.data.create`, `.data.update`, `.data.delete`, `.data.all` |
| modeling | `ZohoAnalytics.modeling.create`, `.modeling.update`, `.modeling.delete`, `.modeling.all` |
| metadata | `ZohoAnalytics.metadata.read`, `.metadata.all` |
| share | `ZohoAnalytics.share.read`, `.share.create`, `.share.delete`, `.share.all` |
| embed | `ZohoAnalytics.embed.read`, `.embed.all` |
| usermanagement | `ZohoAnalytics.usermanagement.read`, `.create`, `.update`, `.delete`, `.all` |
| all | **`ZohoAnalytics.fullaccess.all`** |

Discrepancy: individual endpoint pages and the official OAS use scopes that are **not** on the Prerequisites list. Examples: Sync Data needs `ZohoAnalytics.metadata.create` (https://www.zoho.com/analytics/api/v2/metadata-api/sync-data.html), and the OAS also defines `metadata.update`, `metadata.delete`, `modeling.read`, `share.update`, `embed.create/update/delete` (`securitySchemes` in https://github.com/zoho/analytics-oas/tree/main/v2.0). **Recommendation:** request `ZohoAnalytics.fullaccess.all` by default.

## 3. `ZANALYTICS-ORGID` header

- "The header `ZANALYTICS-ORGID` with the 'Organization ID' should be sent with the API request to identify the organization." Missing header → error **8083** "Organization id is not present in the request header." (https://www.zoho.com/analytics/api/v2/api-specification.html , https://www.zoho.com/analytics/api/v2/common-error-codes.html)
- **Where it is not needed.** Per the official OAS (https://github.com/zoho/analytics-oas, `*-grouped-api.json`) and the curl samples on each page:
  - No header at all: `GET /orgs`, `GET /dashboards`, `GET /dashboards/owned`, `GET /dashboards/shared`, `GET /recentviews`.
  - Header optional: `GET /workspaces`, `GET /workspaces/owned`, `GET /workspaces/{id}`, `GET /views/{view-id}`. The doc curl samples omit it.
  - **Every other endpoint marks it required**: all `/workspaces/{id}/...` sub-resources, every POST/PUT/DELETE including `POST /workspaces`, all `/bulk/...`, `/users`, `/metadetails`.
- Copy Views also takes `ZANALYTICS-DEST-ORGID: <destination-org-id>` (https://www.zoho.com/analytics/api/v2/modeling-api/copy-views.html).
- **Getting the org ID:** `GET /restapi/v2/orgs` (scope `ZohoAnalytics.metadata.read`, no org header). Response (https://www.zoho.com/analytics/api/v2/metadata-api/get-org.html):
  ```json
  { "status": "success", "summary": "Get organizations",
    "data": { "orgs": [ { "orgId": "671712892", "orgName": "bruce.wn", "orgDesc": "",
      "createdBy": "bruce.wn@zoho.com", "createdByZuId": "671546307", "planName": "Premium",
      "isDefault": true, "numberOfworkspaces": 27, "role": "Account Admin" } ] } }
  ```
  Auto-detect can pick the entry with `isDefault: true`. Every workspace object also carries `orgId`, so a workspace ID can be mapped to its org from `GET /workspaces`.

## 4. How parameters are passed (`CONFIG`)

- The docs say all operation parameters go in **one parameter named `CONFIG`**, whose value is a **JSON object** (URL-encoded): `https://<end_point>?CONFIG={"workspaceName":"<workspace-name>"}` (https://www.zoho.com/analytics/api/v2/api-specification.html).
- **GET:** `CONFIG` in the query string, e.g. `GET .../views/<id>/data?CONFIG=<encoded_json_value>`.
- **POST/PUT/DELETE:** the HTML docs show `CONFIG` in the query string (`-X 'PUT' .../rows?CONFIG=...`, `-X 'DELETE' .../rows?CONFIG=...`). Some POST samples send it as a form-urlencoded body instead (`curl --data-urlencode 'CONFIG={...}' -X POST`, on Create Workspace and Create Query Table). The official OAS models POST/PUT/DELETE `CONFIG` as an `application/x-www-form-urlencoded` body field (`encoding.CONFIG.contentType: application/json`). Zoho shows both forms. Which forms are accepted for PUT/DELETE is **UNVERIFIED without a live test**. Query-string is the form the HTML docs show for every method.
- **Imports are the only request with a real body:** `multipart/form-data` with a `FILE` part (or a `DATA` string part). The HTML curl samples put `CONFIG` in the query (`.../data?CONFIG=... -F 'FILE=@/home/local/import.csv'`). The OAS says "CONFIG is mandatory and must be sent as a form field along with either FILE or DATA". (https://www.zoho.com/analytics/api/v2/bulk-api/import-data/existing-table.html ; OAS `data-operations-grouped-api.json`)
- Some endpoints use **no CONFIG** (`/orgs`, `/workspaces`, `/folders`, `/dashboards`, job status/download).
- In JSON, booleans appear both as `true` and as the string `"true"` (e.g. `"autoIdentify":"true"` in the doc samples).

## 5. Response envelopes and HTTP status codes

Success (https://www.zoho.com/analytics/api/v2/api-specification.html):
```json
HTTP/1.1 200 OK
{ "status": "success", "summary": "Create workspace", "data": { "workspaceId": "1767024000003145002" } }
```
Error:
```json
HTTP/1.1 400 Bad Request
{ "status": "failure", "summary": "META_DBNAME_DUPLICATE",
  "data": { "errorCode": 7101, "errorMessage": "Workspace with the same name exists already. Provide an alternate name" } }
```
- "Check the HTTP response code. If it is 4xx or 5xx … it is an error." The error body is always `{status:"failure", summary:<SYMBOLIC_CODE>, data:{errorCode:<int>, errorMessage}}`.
- The OAS maps examples to status codes: **400** (e.g. 8083 `ORGID_NOT_PRESENT_IN_THE_HEADER`, 8504 `LESS_THAN_MIN_OCCURANCE`), **401** (8535 `INVALID_OAUTHTOKEN`), **403** (7301 `SECURITY_NOT_PERMITTED`), **404** (e.g. 7103 `META_OBJECT_NOT_PRESENT`), **500** (7005 `COMMON_INTERNAL_SERVER_ERROR`). (`v2.0/common/zoho-analytics-api-common.json` in https://github.com/zoho/analytics-oas)
- Several write operations return **`204 No Content`** with an empty body: Delete Workspace, Rename View, Delete View, Sync Data. The CLI must handle an empty body.
- Exports return the **raw file body** (CSV/JSON/XML/XLS/PDF/HTML/PNG/JPG) with the matching Content-Type, not the JSON envelope. Errors still use the JSON envelope.
- Error code lists: https://www.zoho.com/analytics/api/v2/common-error-codes.html , https://www.zoho.com/analytics/api/v2/bulk-api/error-codes.html , https://www.zoho.com/analytics/api/v2/data-api/error-codes.html , https://www.zoho.com/analytics/api/v2/metadata-api/error-codes.html , https://www.zoho.com/analytics/api/v2/modeling-api/error-codes.html

## 6. Operations

All paths are relative to `https://<host>/restapi/v2`. "Org hdr" = `ZANALYTICS-ORGID` required.

### Orgs, workspaces, folders, dashboards, recent views (metadata)

| Op | Method + path | Scope | CONFIG | `data` shape | Source |
|---|---|---|---|---|---|
| List orgs | `GET /orgs` | metadata.read | – | `{orgs:[{orgId, orgName, orgDesc, createdBy, createdByZuId, planName, isDefault, numberOfworkspaces, role}]}` | https://www.zoho.com/analytics/api/v2/metadata-api/get-org.html |
| All workspaces | `GET /workspaces` | metadata.read | – | `{ownedWorkspaces:[…], sharedWorkspaces:[…]}`; item = `{workspaceId, workspaceName, workspaceDesc, orgId, createdTime, createdBy, isDefault}` | https://www.zoho.com/analytics/api/v2/metadata-api/all-workspace.html |
| Owned workspaces | `GET /workspaces/owned` | metadata.read | – | `{workspaces:[…]}` | https://www.zoho.com/analytics/api/v2/metadata-api/owned-workspace.html |
| Shared workspaces | `GET /workspaces/shared` | metadata.read | – | `{workspaces:[…]}` | https://www.zoho.com/analytics/api/v2/metadata-api/shared-workspace.html |
| Workspace details | `GET /workspaces/{wsId}` | metadata.read | – | `{workspaces:{workspaceId, workspaceName, workspaceDesc, createdTime, createdBy, orgId}}` (singular object under plural key) | https://www.zoho.com/analytics/api/v2/metadata-api/workspace-details.html |
| Create workspace | `POST /workspaces` (org hdr) | modeling.create | `workspaceName`*, `workspaceDesc` | `{workspaceId}`; dup name → 7101 | https://www.zoho.com/analytics/api/v2/modeling-api/create-workspace.html |
| Delete workspace | `DELETE /workspaces/{wsId}` (org hdr) | modeling.delete | – | 204 No Content; system workspace → 7165 | https://www.zoho.com/analytics/api/v2/modeling-api/delete-workspace.html |
| List folders | `GET /workspaces/{wsId}/folders` (org hdr) | metadata.read | – | `{folders:[{folderId, folderName, folderDesc, folderIndex, isDefault, parentFolderId}]}` (`parentFolderId: "-1"` = root) | https://www.zoho.com/analytics/api/v2/metadata-api/get-folders.html |
| All dashboards | `GET /dashboards` | metadata.read | – | `{ownedViews:[…], sharedViews:[…]}`; item = view object + `workspaceId`, `orgId` | https://www.zoho.com/analytics/api/v2/metadata-api/dashboards.html |
| Owned dashboards | `GET /dashboards/owned` | metadata.read | – | `{views:[…]}` | https://www.zoho.com/analytics/api/v2/metadata-api/owned-dashboard.html |
| Shared dashboards | `GET /dashboards/shared` | metadata.read | – | `{views:[…]}` | https://www.zoho.com/analytics/api/v2/metadata-api/shared-dashboard.html |
| Recent views | `GET /recentviews` | metadata.read | – | `{views:[{viewId, viewName, viewType, workspaceId, workspaceName, viewLastAccessedTime}]}` | https://www.zoho.com/analytics/api/v2/metadata-api/recent-views.html |
| Meta details (lookup by name) | `GET /metadetails` (org hdr) | metadata.read | `workspaceName`*, `viewName` | `{workspaces:{workspaceId, workspaceName, workspaceDesc, orgId}}` (view shape when `viewName` given is not shown) | https://www.zoho.com/analytics/api/v2/metadata-api/meta-deatils.html (note the typo "deatils" in the URL) |

Note: the cloud v2 left-nav menu does not currently link Get Organizations, Get All/Owned/Shared Workspaces, Get Dashboards, Recent Views or Meta Details. The pages still return HTTP 200 at the URLs above and are linked from the API Specification page ("Get Organizations"). They also appear in the official OAS (`org-management`, `workspace-management`, `views-management`, `reports-dashboards` grouped files).

### Views

| Op | Method + path | Scope | CONFIG | Response | Source |
|---|---|---|---|---|---|
| List views | `GET /workspaces/{wsId}/views` (org hdr) | metadata.read | `viewTypes` (int array), `keyword`, `sortedColumn` (0 name, 1 created, 2 modified), `sortedOrder` (0 asc, 1 desc), `noOfResult`, `startIndex` | `{views:[{viewId, viewName, viewDesc, viewType:"Table", parentViewId, folderId, createdTime, createdBy, lastModifiedTime, lastModifiedBy, isFavorite, sharedBy}]}` | https://www.zoho.com/analytics/api/v2/metadata-api/get-views.html |
| View details | `GET /views/{viewId}` | metadata.read | `withInvolvedMetaInfo` (bool: include column / involved-view details) | `{views:{viewId, viewName, viewDesc, viewType, workspaceId, orgId}}` (shape with `withInvolvedMetaInfo:true` not shown → **UNVERIFIED**) | https://www.zoho.com/analytics/api/v2/metadata-api/view-details.html |
| Rename view | `PUT /workspaces/{wsId}/views/{viewId}` (org hdr) | modeling.update | `viewName`*, `viewDesc` | 204 | https://www.zoho.com/analytics/api/v2/modeling-api/rename-view.html |
| Delete view | `DELETE /workspaces/{wsId}/views/{viewId}` (org hdr) | modeling.delete | `deleteDependentViews` (bool; else 7277 if dependents exist) | 204 | https://www.zoho.com/analytics/api/v2/modeling-api/delete-view.html |
| Save as (copy within workspace) | `POST /workspaces/{wsId}/views/{viewId}/saveas` (org hdr) | modeling.update (OAS says modeling.create) | `viewName`*, `viewDesc`, `copyWithData`, `copyWithLookup`, `folderId` | `{viewId}`; >200k rows → 15018 | https://www.zoho.com/analytics/api/v2/modeling-api/saveas-view.html |
| Copy views to another workspace | `POST /workspaces/{srcWsId}/views/copy` (org hdr = source org; `ZANALYTICS-DEST-ORGID`) | modeling.create | `viewIds`*, `destWorkspaceId`*, `workspaceKey`, `copyWithData`, `copyWithDependentViews` | `{views:[{sourceViewId, destViewId}]}` | https://www.zoho.com/analytics/api/v2/modeling-api/copy-views.html |

**`viewTypes` filter codes** (request side): `0` Table, `1` Tabular View, `2` AnalysisView/Chart, `3` Pivot, `4` SummaryView, `6` QueryTable, `7` Dashboard. Code 5 is not documented. In responses, `viewType` is a **string** (`"Table"`, `"Dashboard"`), not the numeric code. (https://www.zoho.com/analytics/api/v2/metadata-api/get-views.html)

### Tables / query tables

| Op | Method + path | Scope | CONFIG | Response | Source |
|---|---|---|---|---|---|
| Create table | `POST /workspaces/{wsId}/tables` (org hdr) | modeling.create | `tableDesign`* = `{TABLENAME*, TABLEDESCRIPTION, FOLDERNAME, COLUMNS*:[{COLUMNNAME*, DATATYPE*, MANDATORY, DESCRIPTION, DEFAULT, GEOROLE, ISHIDE, PII, LOOKUPCOLUMN:{TABLENAME, COLUMNNAME}}]}` (UPPERCASE keys) | `{viewId}` | https://www.zoho.com/analytics/api/v2/modeling-api/create-table.html |
| Create query table | `POST /workspaces/{wsId}/querytables` (org hdr) | modeling.create | `sqlQuery`*, `queryTableName`*, `description`, `folderId` | `{viewId}` | https://www.zoho.com/analytics/api/v2/modeling-api/create-query-table.html |

DATATYPE values: `PLAIN, MULTI_LINE, EMAIL, NUMBER, POSITIVE_NUMBER, DECIMAL_NUMBER, CURRENCY, PERCENT, DATE, BOOLEAN, URL, AUTO_NUMBER, GEO`. GEOROLE (required for GEO) is 0–8 (Continent … Airport).

### Rows (DML)

| Op | Method + path | Scope | CONFIG | Response | Source |
|---|---|---|---|---|---|
| Add row | `POST /workspaces/{wsId}/views/{viewId}/rows` (org hdr) | data.create | `columns`* `{colName: value}`, `dateFormat`, `columnDateFormat` | `{addedColumns:{…}, invalidColumns:{}}` | https://www.zoho.com/analytics/api/v2/data-api/add-row.html |
| Update rows | `PUT …/rows` (org hdr) | data.update | `columns`*, `criteria`, `updateAllRows` (bool), `addIfNotExist` (bool, default false), `dateFormat`, `columnDateFormat` | `{updatedColumns:{…}, updatedRows:27, invalidColumns:{}}` | https://www.zoho.com/analytics/api/v2/data-api/update-row.html |
| Delete rows | `DELETE …/rows` (org hdr) | data.delete | `criteria`, `deleteAllRows` (bool) | `{deletedRows:27}` | https://www.zoho.com/analytics/api/v2/data-api/delete-row.html |

The OAS update-row example notes that "criteria must not be sent along with updateAllRows".

### Export, synchronous

`GET /workspaces/{wsId}/views/{viewId}/data?CONFIG=…` (org hdr), scope `data.read`. (https://www.zoho.com/analytics/api/v2/bulk-api/export-data.html)
- `responseFormat`* is one of `csv | json | xml | xls | pdf | html | image`.
- Common keys: `criteria`, `selectedColumns` (array), `password` (produces a password-protected file), `showHiddenCols`, `showPersonalCols` (default false), `generateTOC` / `dashboardLayout` (0 = each report on a new page, 1 = dashboard layout; dashboards only), `validateSystemTags` (default true).
- CSV keys: `delimiter` (0 comma, 1 tab, 2 semicolon, 3 space), `recordDelimiter` (0 DOS, 1 UNIX, 2 MAC), `quoted` (0 single, 1 double), `includeHeader` (default true).
- JSON key: **`keyValueFormat`** (bool, **default true**). "To return JSON data as ColumnName - Value pair."
- PDF keys: `paperSize`, `paperStyle`, `showTitle`, `showDesc`, `exportLanguage`, `zoomFactor`, margins, header/footer.
- HTML keys: `includeTitle`, `includeDesc`.
- Image keys: `width` (500), `height` (400), `title`, `description`, `legend`, `imageFormat` (png/jpg).
- **Restrictions (use async instead):** "Tables having more than one million rows. Tables and Views from live connect workspaces. Dashboard and Querytable view types." The same page still lists dashboard-only keys (`generateTOC`, `dashboardLayout`), so the docs contradict themselves on dashboards.
- Response: the raw file body. The sample is `Content-Type:text/csv`.
- **The exact JSON export body shape (with keyValueFormat true or false) is UNVERIFIED.** No v2 page or OAS file shows a sample. The OAS declares `application/json: {}` with no schema.

### Export, asynchronous (bulk)

Overview (https://www.zoho.com/analytics/api/v2/bulk-api/export-data-async.html): create a job → poll every ~10 s → download.
- Downloads are available for **1 hour** after completion.
- At most **5 concurrent export jobs per org**.
- `jobCode` values: `1001` JOB NOT INITIATED, `1002` JOB IN PROGRESS (keep polling), `1003` ERROR OCCURRED (stop), `1004` JOB COMPLETED (download), `1005` JOB NOT FOUND (stop).

| Op | Method + path | Scope | Notes / response | Source |
|---|---|---|---|---|
| Create job from view | `GET /bulk/workspaces/{wsId}/views/{viewId}/data?CONFIG=…` (org hdr) | data.read | Same CONFIG as sync export + `callbackUrl` (POSTed job details on completion/failure). → `{jobId}` | https://www.zoho.com/analytics/api/v2/bulk-api/export-data-async/create-export/view-id.html |
| Create job from SQL | `GET /bulk/workspaces/{wsId}/data?CONFIG=…` (org hdr) | data.read | `sqlQuery`*, `responseFormat`* (csv/json/xml/xls/pdf/html, **no image**), plus `password`, `selectedColumns`, `showHiddenCols`, `showPersonalCols`, `callbackUrl`, format options. Sample `{"responseFormat":"csv","sqlQuery":"select * from Sales"}` → `{jobId}`. Bad SQL → 7403 | https://www.zoho.com/analytics/api/v2/bulk-api/export-data-async/create-export/sql-query.html |
| Job status | `GET /bulk/workspaces/{wsId}/exportjobs/{jobId}` (org hdr) | data.read | `{jobId, jobCode:"1004", jobStatus:"JOB COMPLETED", downloadUrl, expiryTime}` (`jobCode` is a string). 8120 not found, 8124 not job owner | https://www.zoho.com/analytics/api/v2/bulk-api/export-data-async/get-export.html |
| Download | `GET /bulk/workspaces/{wsId}/exportjobs/{jobId}/data` (org hdr) | data.read | Raw file body. 8121 not initiated, 8122 not completed | https://www.zoho.com/analytics/api/v2/bulk-api/export-data-async/download-export.html |

Creating an export job is a **GET**, although it starts a job. Only the user who created a job can read it (8124/8138).

### Import, synchronous

Both variants use multipart `FILE` (max **20 MB**) or a `DATA` string, with scope `data.create` and the org header.

- **Existing table:** `POST /workspaces/{wsId}/views/{viewId}/data` (https://www.zoho.com/analytics/api/v2/bulk-api/import-data/existing-table.html)
  - `importType`*: `append | truncateadd | updateadd`
  - `fileType`*: `csv | json`
  - `autoIdentify`* (bool)
  - `onError`: `abort | skiprow | setcolumnempty`
  - `matchingColumns` (array; required when `importType` is `updateadd`)
  - `selectedColumns`, `skipTop`, `thousandSeparator` (0–3), `decimalSeparator` (0–1), `dateFormat`, `columnDateFormat`
  - `columnDataTypes` (`[{columnName, dataType, geoRole}]`)
  - CSV keys `commentChar`, `delimiter` (0–3), `quoted` (0 none, 1 single, 2 double) are mandatory when `autoIdentify` is false
  - JSON key `retainColumnNames` (default false: nested keys are flattened as `parent.child`)
  - Response: `{importSummary:{importType:"APPEND", totalColumnCount, selectedColumnCount, totalRowCount, successRowCount, warnings, importOperation:"updated"}, columnDetails:{col: typeLabel}, importErrors:""}`
- **New table:** `POST /workspaces/{wsId}/data`. `tableName`* replaces `importType`/`matchingColumns`; the other keys are the same. Response adds `viewId` and `importOperation:"created"`. (https://www.zoho.com/analytics/api/v2/bulk-api/import-data/new-table.html)
- Errors: 7232 import aborted, 7235 no matching columns, 7248 not multipart, 7249 file can't be imported, 8513 file too large. (https://www.zoho.com/analytics/api/v2/bulk-api/error-codes.html)

### Import, asynchronous (bulk)

Overview (https://www.zoho.com/analytics/api/v2/bulk-api/import-data-async.html):
- Max file size **100 MB**.
- At most **5 simultaneous import jobs per org**.
- The job summary is kept for 1 hour.
- `jobCode` values are the same 1001–1005 as export.

| Op | Method + path | Notes | Source |
|---|---|---|---|
| Job, existing table | `POST /bulk/workspaces/{wsId}/views/{viewId}/data` | multipart `FILE`*; same CONFIG as sync + `callbackUrl` → `{jobId}` | https://www.zoho.com/analytics/api/v2/bulk-api/import-data-async/create-import-job/existing-table.html |
| Job, new table | `POST /bulk/workspaces/{wsId}/data` | `tableName`* … → `{jobId}` | https://www.zoho.com/analytics/api/v2/bulk-api/import-data-async/create-import-job/new-table.html |
| Job status | `GET /bulk/workspaces/{wsId}/importjobs/{jobId}` | scope **data.create** (not read). → `{jobId, jobCode, jobStatus, jobInfo:{viewId, importSummary, columnDetails, importErrors}, expiryTime}`. 8137 not found, 8138 access denied | https://www.zoho.com/analytics/api/v2/bulk-api/import-data-async/get-import-job.html |
| Batch import | `POST /bulk/workspaces/{wsId}[/views/{viewId}]/data/batch` (paths from OAS) | Split into ≤100 MB batches. First batch sends `{"batchKey":"start"}`, which returns jobId + batchKey. Later batches reuse the batchKey. The last batch sets `{"isLastBatch":true}`. `append`/`updateadd` commit per batch; `truncateadd` commits only at the end | https://www.zoho.com/analytics/api/v2/bulk-api/batch-import.html |

### Users

| Op | Method + path | Scope | Response | Source |
|---|---|---|---|---|
| Org users | `GET /users` (org hdr) | usermanagement.read | `{users:[{emailId, status:true, role:"Organization Admin"}]}` | https://www.zoho.com/analytics/api/v2/user-management-api/get-users.html |
| Workspace users | `GET /workspaces/{wsId}/users` (org hdr) | usermanagement.read | `{users:[{emailId, status, role:"Workspace Admin"}]}` | https://www.zoho.com/analytics/api/v2/user-management-api/get-workspace-users.html |

### Datasources

| Op | Method + path | Scope | Response | Source |
|---|---|---|---|---|
| List | `GET /workspaces/{wsId}/datasources` (org hdr) | metadata.read | `{dataSources:[{datasourceName, datasourceId?, source, fileType?, lastDataSyncStatus, lastDataSyncTime, schedule, nextScheduleTime, syncUsed, syncIntervalId, totalSyncAllowed, tableDetails:[{viewName, viewId, sourceName, lastSyncTime, syncStatus}] \| syncIntervals:[…]}]}`. The shape is heterogeneous: web/file sources have no `datasourceId`, and multi-interval sources nest `syncIntervals[]`. Times are human-readable strings ("03 August, 2024 03:39:16 PM IST") | https://www.zoho.com/analytics/api/v2/metadata-api/datasources.html |
| Sync | `POST /workspaces/{wsId}/datasources/{dsId}/sync` (org hdr) | **metadata.create** | Optional CONFIG `userName`, `password`, `syncIntervalId` (required when there are multiple intervals). → **204**. 18061 = datasource not in workspace | https://www.zoho.com/analytics/api/v2/metadata-api/sync-data.html |

Related endpoints not detailed here: Refetch Data (`POST /workspaces/{wsId}/views/{viewId}/sync`), Get Last Import Details (`GET …/views/{viewId}/importdetails`), Update Datasource Connection (`PUT …/datasources/{dsId}`). Paths are from the OAS `data-operations-grouped-api.json`.

### Pagination

No general pagination envelope is documented. Only Get Views documents `startIndex` / `noOfResult` in CONFIG, and responses carry no has-more flag (https://www.zoho.com/analytics/api/v2/metadata-api/get-views.html). Pagination for other list endpoints is **UNVERIFIED** (none is documented).

## 7. Rate limits / API units

- **Daily API units by plan:** Free 1,000; Basic 4,000; Standard 10,000; Premium 30,000; Enterprise 100,000. Add-on units can be purchased. Exceeding the daily units → error **6043 or 6044**. (https://www.zoho.com/analytics/api/v2/api-limits-pricing/api-units.html)
- **Unit costs (selected):**
  - Import append/truncateadd: 10 units per 1,000 rows. Import updateadd: 15 units per 1,000 rows.
  - Export, CSV/JSON etc.: 3 units per 1,000 rows. PDF: 5 units per 1,000 rows. Dashboard or HTML: 15 per request. Chart as image/PDF: 10 per request.
  - Add row 0.1, update rows 0.3, delete rows 0.1.
  - Get orgs 0.1, all workspaces 0.2, owned/shared workspaces 0.1, views 0.1, folders 0.1, recent views 0.1.
  - All dashboards **1**, owned dashboards 0.1, shared dashboards 0.5.
  - Workspace/view details 0.1, meta details 0.1, datasources 1, sync data 5, refetch 2.
  - Get users 1.
  - Create workspace 1, create table 1, saveas 1, rename view 1, delete view 2.
  - Import/export job status and download: **0**.
- **Per-minute frequency limits:** DML 100/min, BULK 40/min, METADATA 60/min, and **100/min overall** regardless of type. Exceeding them → error **6045**. (https://www.zoho.com/analytics/api/v2/api-limits-pricing/api-frequency.html)
- **Rate-limit response headers: none documented.** No `X-RATELIMIT-*`/`Retry-After` appears in any v2 page or OAS file checked. The HTTP status for 6043/6044/6045 is **UNVERIFIED**.
- Separate OAuth limit: 10 access tokens per 10 minutes per refresh token (https://www.zoho.com/analytics/api/v2/authentication/refresh-token.html).

## 8. Notable quirks

- **SQL queries are only available as an async export job.** `sqlQuery` is accepted only by `GET /bulk/workspaces/{wsId}/data` (async), not by sync export. A "run SQL" command has to create the job, poll, then download. Query tables (`POST …/querytables`) are the persistent alternative. Supported SQL dialects: ANSI, Oracle, MySQL, PostgreSQL, SQL Server, DB2, Informix, Sybase. (https://www.zoho.com/analytics/api/v2/zoho-analytics-cloudsql.html)
- **Sync export is blocked for** tables over 1M rows, live-connect workspaces, dashboards and query tables. Use async for those.
- **Criteria syntax** is a SQL WHERE clause in a JSON string. Double-quote table/column names, single-quote string literals, use `"table"."column"` when names are ambiguous, and wrap groups in parentheses. Dates are `yyyy-mm-dd` or `yyyy-mm-dd hh:mm:ss`. Currency/percent symbols are not allowed. Operators: `= != < > <= >= LIKE, NOT LIKE, IN, NOT IN, BETWEEN`. Example: `{"criteria":"\"Sales\".\"Region\"='East'"}`. Criteria applies to Update, Delete, Export, Share, View URL, Embed URL and Private URL. (https://www.zoho.com/analytics/api/v2/prerequisites.html)
- `keyValueFormat` defaults to **true** for JSON exports. The non-key-value shape is undocumented (**UNVERIFIED**).
- ID values are numeric strings longer than 2^53 (e.g. `"1767024000003145011"`), and timestamps are epoch-ms strings. Treat both as strings and never `Number()` them.
- Detail endpoints return a **single object under a plural key** (`data.workspaces`, `data.views`).
- `jobCode` is returned as a string (`"1004"`).
- The Get Import Job Details scope is `data.create`, and Sync Data needs `metadata.create`, which is not on the Prerequisites scope list. Using `ZohoAnalytics.fullaccess.all` avoids these mismatches.
- Doc typos to keep in mind: the meta-details page URL is `meta-deatils.html`. The Rename View REQUEST URI shows `//restapi/v2` (double slash) while its curl sample uses the normal path. The async existing-table import URI omits the slash before `restapi`.
- `createdTime`, `lastModifiedTime` etc. are epoch-ms strings, but datasource sync times are localized display strings.
- Official SDKs exist (Java, C#, Python, PHP, Go, NodeJS, Ruby; latest release notes v2.9.0), and Zoho publishes OAS 3.1 files at https://github.com/zoho/analytics-oas (`v2.0/*-grouped-api.json`, `servers: https://analyticsapi.zoho.com`). (https://www.zoho.com/analytics/api/v2/release-notes.html , https://www.zoho.com/analytics/api/v2/open-api-specification.html)

## Fit with existing architecture (summary)

- New `ANALYTICS_REGION_DOMAINS`: `us → analyticsapi.zoho.com`, `eu → analyticsapi.zoho.eu`, `in → analyticsapi.zoho.in`, `au → analyticsapi.zoho.com.au`, `jp → analyticsapi.zoho.jp`, `ca → analyticsapi.zohocloud.ca`. Base `https://{host}/restapi/v2`.
- `AnalyticsBaseCommand` should provide:
  - Org resolution: `--org` flag > config key (e.g. `defaultAnalyticsOrg`) > env var > auto-detect via `GET /orgs` (`isDefault`). Send `ZANALYTICS-ORGID` on every call except `/orgs`.
  - A helper that JSON-stringifies a `config` object into the `CONFIG` param.
  - Handling for 204 responses.
  - Raw-body passthrough for exports.
  - A multipart helper for imports.
  - A poll helper for `jobCode` 1001/1002 → 1004.
  - Error mapping from `data.errorCode` / `data.errorMessage` / `summary`.
- Add `ZohoAnalytics.fullaccess.all` to the default login scopes.
