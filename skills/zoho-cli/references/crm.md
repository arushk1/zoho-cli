# Zoho CRM (78 commands)

## Records CRUD
```bash
zoho crm records list Leads --fields "Last_Name,Email,Company"   # --fields recommended
zoho crm records list Leads --page 1 --per-page 5 --fields "Last_Name,Email"
zoho crm records get Leads <id>                       # Returns RECORD_NOT_FOUND for invalid IDs
zoho crm records create Leads -d '{"Last_Name":"Smith","Email":"smith@example.com"}' --dry-run
zoho crm records update Leads <id> -d '{"Company":"Updated"}' --dry-run
zoho crm records delete Leads <id> --dry-run

# Module-specific shortcuts for Leads, Contacts, Deals, Accounts (--json preferred, --data/-d also works)
zoho crm leads create    --json '{"Last_Name":"Smith","Company":"Acme"}' --dry-run
zoho crm leads update    --id <id> --json '{"Email":"new@example.com"}' --dry-run
zoho crm leads delete    --id <id> --dry-run
zoho crm contacts create --json '{"Last_Name":"Smith","Email":"s@x.com"}'
zoho crm contacts update --id <id> --json '{"Phone":"+1..."}'
zoho crm contacts delete --id <id>
zoho crm deals create    --json '{"Deal_Name":"Acme Q2","Stage":"Qualification"}'
zoho crm deals update    --id <id> --json '{"Stage":"Closed Won"}'
zoho crm deals delete    --id <id>
zoho crm accounts create --json '{"Account_Name":"Acme Inc"}'
zoho crm accounts update --id <id> --json '{"Industry":"Software"}'
zoho crm accounts delete --id <id>
zoho crm records upsert Leads -d '{"Last_Name":"Test","Email":"test@example.com"}' --dry-run
zoho crm records search Leads --criteria "((Last_Name:equals:Smith))"
zoho crm records count Leads
zoho crm records clone Leads <id> --dry-run
zoho crm records deleted Leads                        # List recently deleted records
zoho crm records timeline Leads <id>                  # May require v8 features
zoho crm records mass-update Leads -d '{"data":[...]}' --ids "id1,id2" --dry-run
zoho crm records mass-delete Leads --ids "id1,id2" --dry-run
zoho crm records merge Leads --master <id> --sources "id2" --dry-run
zoho crm records change-owner Leads <id> --owner <userId> --dry-run
zoho crm records share Leads <id> list                # Action: list/add/remove
zoho crm records lock Leads <id> status               # Action: status/lock/unlock
zoho crm records blueprint Leads <id>
```

**CRM API Gotchas:**
- **`records list` without `--fields`** may fail with `REQUIRED_PARAM_MISSING` on some modules. Always specify `--fields`.
- **Non-existent record IDs** return `{"success": false, "error": {"code": "RECORD_NOT_FOUND"}}` (not empty data).
- **Invalid JSON in `--data`** returns `{"success": false, "error": {"code": "INVALID_JSON"}}` with exit code 3.
- **`--dry-run`** on all write commands shows `{dryRun: true, method, path, body}` without making API calls.

## Query (COQL)
```bash
zoho crm query --sql "SELECT Last_Name, Email FROM Leads WHERE City = 'New York' LIMIT 5"
```

## Notes, Attachments, Related Records
```bash
zoho crm notes list <Module> <recordId>               # Requires fields parameter (handled internally)
zoho crm notes get <Module> <recordId> <noteId>
zoho crm notes create <Module> <recordId> -d '{"Note_Content":"Hello"}' --dry-run
zoho crm notes update <Module> <recordId> <noteId> -d '{"Note_Content":"Updated"}' --dry-run
zoho crm notes delete <Module> <recordId> <noteId> --dry-run

zoho crm attachments list <Module> <recordId>
zoho crm attachments upload <Module> <recordId> --file <path> --dry-run
zoho crm attachments download <Module> <recordId> <attachmentId> --output <path>
zoho crm attachments delete <Module> <recordId> <attachmentId> --dry-run

zoho crm related list <Module> <recordId> --related-list <RelatedModule> --fields "field1,field2"
# --fields is REQUIRED for related list (field names vary by module)
```

## Tags
```bash
zoho crm tags list --module Leads
zoho crm tags create --module Leads --name "new-tag" --dry-run
zoho crm tags update --module Leads --id <tagId> --name "renamed" --dry-run
zoho crm tags delete --id <tagId> --dry-run
zoho crm tags add Leads <recordId> --tag-names "tag1,tag2" --dry-run
zoho crm tags remove Leads <recordId> --tag-names "tag1" --dry-run
```

## Modules & Metadata
```bash
zoho crm modules list                                 # List all CRM modules
zoho crm modules get Leads                            # Get module details (returns MODULE_NOT_FOUND for invalid)
zoho crm fields list --module Leads                   # List fields for a module
zoho crm fields get <fieldId> --module Leads
zoho crm layouts list --module Leads
zoho crm pipelines list --layout <layoutId>           # Use Deals layout ID, not Leads
zoho crm custom-views list --module Leads
```

## Other CRM
```bash
zoho crm org info                                     # Organization details
zoho crm users list                                   # All users
zoho crm users get <userId>                           # USER_NOT_FOUND for invalid IDs
zoho crm roles list
zoho crm profiles list
zoho crm territories list                             # Requires Territory Management enabled
zoho crm variables list                               # May require permissions
zoho crm currencies list                              # May require scope
zoho crm scoring-rules list                           # May require permissions
zoho crm email list Leads <recordId>
zoho crm email send Leads <recordId> -d '{"subject":"Hi","to":"a@b.com"}' --dry-run
zoho crm leads convert <id> --dry-run
zoho crm notifications list/enable/disable
zoho crm bulk-read create --module Leads --dry-run
zoho crm bulk-read status <jobId>
zoho crm bulk-read download <jobId> --output <path>
zoho crm bulk-write upload --file <path.zip> --dry-run            # Routes to upload.zoho.com; needs ZohoFiles.files.ALL scope
zoho crm bulk-write upload --file <path.zip> --org <zgid>         # Override org ID (auto-resolved from /org if omitted)
zoho crm bulk-write create --module Leads --file-id <id> --dry-run
zoho crm bulk-write status <jobId>
zoho crm bulk-write download <jobId> --output <path>
zoho crm composite -d '[{"method":"GET","url":"/crm/v7/Leads?per_page=1"}]' --dry-run    # Needs ZohoCRM.composite_requests.CUSTOM scope
```

**Scope requirements (auto-added to `zoho auth login` defaults):**
- `composite` -> `ZohoCRM.composite_requests.CUSTOM`
- `bulk-write upload` -> `ZohoFiles.files.ALL` (file upload), plus `ZohoCRM.bulk.ALL` for the write job
- `notifications` -> `ZohoCRM.notifications.ALL`

If you see `OAUTH_SCOPE_MISMATCH`, re-run `zoho auth login` to pick up new scopes.
