# Zoho Analytics (26 commands)

BI / reporting workspaces (REST API v2 on `analyticsapi.zoho.{dc}`). Scope `ZohoAnalytics.fullaccess.all` is added by `zoho auth login`; re-login if you get `INVALID_OAUTHSCOPE` (8540).

Org ID: auto-detected from `/orgs` (default org), or `--org <id>`, `ZOHO_ANALYTICS_ORG_ID`, `zoho config set defaultAnalyticsOrg <id>`. Most commands also need a workspace: `-w <workspace-id>` (find it with `workspaces list`).

## Discover
```bash
zoho analytics orgs list                                    # orgId, orgName, isDefault, planName
zoho analytics workspaces list                              # Owned + shared, each tagged access: owned|shared
zoho analytics workspaces list --scope owned                # --scope all|owned|shared
zoho analytics workspaces get <workspaceId>
zoho analytics folders list -w <workspaceId>
zoho analytics views list -w <workspaceId>                  # Tables, reports, dashboards, query tables
zoho analytics views list -w <workspaceId> --type table --type query-table --keyword sales
zoho analytics views list -w <workspaceId> --start 1 --limit 50
zoho analytics views get <viewId>                           # View details
zoho analytics views get <viewId> --with-meta               # Include columns / involved views
zoho analytics views recent                                 # Recently accessed, all workspaces
zoho analytics dashboards list                              # --scope all|owned|shared (all costs 1 API unit)
zoho analytics users list                                   # Org users
zoho analytics users list -w <workspaceId>                  # Workspace users
zoho analytics datasources list -w <workspaceId>            # Sync status + schedule
```

`--type` values: `table`, `tabular`, `chart`, `pivot`, `summary`, `query-table`, `dashboard` (repeatable).

## Query with SQL
```bash
zoho analytics query -w <workspaceId> --sql 'SELECT "Region", SUM("Sales") AS total FROM "Sales" GROUP BY "Region"'
zoho analytics query -w <workspaceId> --sql 'SELECT * FROM "Sales"' --format csv --output sales.csv
zoho analytics query -w <workspaceId> --sql '...' --no-wait          # Returns { jobId } immediately
zoho analytics query -w <workspaceId> --sql '...' --timeout 900 --poll-interval 10
zoho analytics export-jobs get <jobId> -w <workspaceId>              # jobCode "1004" = completed
zoho analytics export-jobs download <jobId> -w <workspaceId> [--format csv] [--output file]
```

SQL only runs as a bulk export job: `query` creates the job, polls until it completes, then downloads. On timeout it fails with `JOB_TIMEOUT` and the `jobId` in `error.details` — resume with `export-jobs get` / `download` (results are kept for 1 hour). Formats: `json` (default), `csv`, `xml`, `html` inline; `xls`, `pdf` need `--output`.

## Export a view
```bash
zoho analytics data export -w <workspaceId> --view <viewId>                       # JSON rows (default)
zoho analytics data export -w <workspaceId> --view <viewId> --columns Region,Sales --criteria "\"Region\"='East'"
zoho analytics data export -w <workspaceId> --view <viewId> --format csv
zoho analytics data export -w <workspaceId> --view <viewId> --format pdf --output report.pdf
zoho analytics data export -w <workspaceId> --view <dashboardId> --format pdf --output dash.pdf --async
```

Use `--async` for tables over 1M rows, query tables, dashboards, and live-connect workspaces (Zoho blocks synchronous export for those). `image` format is sync-only.

## Write data
```bash
zoho analytics rows add -w <ws> --view <tableId> -d '{"Region":"East","Sales":1200}' --dry-run
zoho analytics rows update -w <ws> --view <tableId> -d '{"Status":"Closed"}' --criteria "\"Region\"='East'" --dry-run
zoho analytics rows update -w <ws> --view <tableId> -d '{"Status":"Open"}' --criteria "\"Id\"='42'" --add-if-missing --dry-run
zoho analytics rows delete -w <ws> --view <tableId> --criteria "\"Year\"<2020" --dry-run
zoho analytics rows delete -w <ws> --view <tableId> --all --dry-run          # Every row

zoho analytics data import -w <ws> --view <tableId> -f sales.csv --dry-run                       # append (default)
zoho analytics data import -w <ws> --view <tableId> -f sales.csv --import-type truncateadd       # replace all rows
zoho analytics data import -w <ws> --view <tableId> -f sales.csv --import-type updateadd --matching-columns OrderId
zoho analytics data import -w <ws> --table-name Sales2026 -f sales.json                          # new table
zoho analytics data import -w <ws> --view <tableId> -f x.csv --no-auto-identify --config '{"delimiter":0,"quoted":2,"commentChar":"#"}'
```

## Modeling
```bash
zoho analytics workspaces create --name "Sales" --description "..." --dry-run
zoho analytics workspaces delete <workspaceId> --dry-run                     # Deletes everything in it
zoho analytics tables create -w <ws> -d '{"TABLENAME":"Leads","COLUMNS":[{"COLUMNNAME":"Name","DATATYPE":"PLAIN"},{"COLUMNNAME":"Value","DATATYPE":"CURRENCY"}]}' --dry-run
zoho analytics query-tables create -w <ws> --name "Sales by Region" --sql 'SELECT "Region", SUM("Sales") FROM "Sales" GROUP BY "Region"' --dry-run
zoho analytics views rename <viewId> -w <ws> --name "New name" --dry-run
zoho analytics views delete <viewId> -w <ws> [--delete-dependents] --dry-run
zoho analytics datasources sync <datasourceId> -w <ws> [--sync-interval <id>] --dry-run
```

`DATATYPE` values: `PLAIN`, `MULTI_LINE`, `EMAIL`, `NUMBER`, `POSITIVE_NUMBER`, `DECIMAL_NUMBER`, `CURRENCY`, `PERCENT`, `DATE`, `BOOLEAN`, `URL`, `AUTO_NUMBER`, `GEO`. Table-design keys are UPPERCASE.

## Raw passthrough
```bash
zoho analytics raw get /metadetails --config '{"workspaceName":"Sales"}'      # Look up IDs by name
zoho analytics raw get /bulk/workspaces/<ws>/importjobs/<jobId>
zoho analytics raw get /workspaces/<ws>/views/<viewId>/importdetails
zoho analytics raw get /dashboards/owned --skip-org-header
```
Read-only. Parameters go in `--config` as the `CONFIG` JSON object (Analytics has no other query params).

## Analytics API Gotchas
- **Criteria and SQL quoting:** double-quote table/column names, single-quote string values: `"Region"='East'`. In a shell, wrap the whole criteria in double quotes and escape inner ones (`"\"Region\"='East'"`), or wrap SQL in single quotes.
- **IDs are 19-digit strings** (e.g. `1767024000003145011`). Never convert them to numbers — precision is lost.
- **JSON exports** use Zoho's key/value format (column name → value per row).
- **Sync import limit is 20 MB.** Larger files need Zoho's bulk import (not wrapped yet; status readable via `raw get`).
- **API units:** daily quota by plan (Free 1k … Enterprise 100k). Export costs 3 units per 1,000 rows; `dashboards list` (all) and `datasources list` cost 1 each; job status/download cost 0. Also 100 requests/min overall. Over quota → error 6043/6044; over rate → 6045.
- **Errors** come back as `{ code: <SYMBOLIC_CODE>, message, zohoErrorCode }`, e.g. `META_OBJECT_NOT_PRESENT` (7103), `META_DBNAME_DUPLICATE` (7101), `ORGID_NOT_PRESENT_IN_THE_HEADER` (8083).
- **At most 5 concurrent export jobs per org** (counts `query` and `data export --async`).
