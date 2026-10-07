# Zoho Desk (151 commands)

**Helpdesk / customer support.** Single API version v1. Uses `orgId` header on every request (except `/organizations`). Pagination uses `--page`/`--per-page` (converted internally to Desk's `from`/`limit`). Updates use `PATCH`. Org ID via `--org`, `ZOHO_DESK_ORG_ID` env var, or `zoho config set defaultOrg <id>`.

## Tickets — Core CRUD
```bash
zoho desk tickets list                                # List tickets
zoho desk tickets list --page 1 --per-page 50 --status Open --department <deptId>
zoho desk tickets list --assignee <agentId> --sort-by createdTime --sort-order desc
zoho desk tickets list --view-id <viewId>             # Use a saved custom view
zoho desk tickets get <ticketId>                      # Get ticket details
zoho desk tickets get <ticketId> --include contacts,assignee,departments
zoho desk tickets create -d '{"subject":"Login issue","departmentId":"<id>","contactId":"<id>","description":"..."}' --dry-run
zoho desk tickets update <ticketId> -d '{"status":"On Hold","priority":"High"}' --dry-run
zoho desk tickets delete <ticketId>                   # Moves to recycle bin
```

## Tickets — Actions
```bash
zoho desk tickets move <ticketId> --department <deptId>           # Move to another department
zoho desk tickets merge <ticketId> -d '{"ids":["<id2>","<id3>"]}' --dry-run
zoho desk tickets split <ticketId> -d '{"threadId":"<id>","subject":"New","departmentId":"<id>"}' --dry-run
zoho desk tickets close --ids "id1,id2,id3" --dry-run             # Bulk close
zoho desk tickets spam --ids "id1,id2"                            # Mark as spam
zoho desk tickets unspam --ids "id1,id2"                          # Unmark spam
zoho desk tickets count --department <deptId> --status Open
zoho desk tickets search --query "login error" --page 1 --per-page 20
zoho desk tickets history <ticketId>                              # Audit trail
zoho desk tickets metrics <ticketId>                              # Response/resolution times
zoho desk tickets blueprint <ticketId>                            # Current blueprint state
```

## Ticket Resolution
```bash
zoho desk tickets resolution get <ticketId>
zoho desk tickets resolution add <ticketId> -d '{"resolution":"Fixed by..."}' --dry-run
zoho desk tickets resolution update <ticketId> -d '{"resolution":"Updated"}' --dry-run
zoho desk tickets resolution delete <ticketId>
```

## Threads (email conversations)
```bash
zoho desk threads list --ticket <ticketId>
zoho desk threads get <threadId> --ticket <ticketId>
zoho desk threads reply --ticket <ticketId> -d '{"channel":"EMAIL","to":"user@example.com","content":"Hi","contentType":"html"}' --dry-run
zoho desk threads draft --ticket <ticketId> -d '{...}' --dry-run
```

**Thread channels:** `EMAIL`, `CUSTOMERPORTAL`, `CHAT`, `FORUMS`, `TWITTER`, `FACEBOOK`, `PHONE`

## Ticket Comments (internal notes)
```bash
zoho desk ticket-comments list --ticket <ticketId>
zoho desk ticket-comments get <commentId> --ticket <ticketId>
zoho desk ticket-comments add --ticket <ticketId> -d '{"content":"Internal note","contentType":"html","isPublic":false}' --dry-run
zoho desk ticket-comments update <commentId> --ticket <ticketId> -d '{"content":"Updated"}' --dry-run
zoho desk ticket-comments delete <commentId> --ticket <ticketId>
```

## Ticket Attachments
```bash
zoho desk ticket-attachments list --ticket <ticketId>
zoho desk ticket-attachments get <attachmentId> --ticket <ticketId>
zoho desk ticket-attachments upload --ticket <ticketId> --file /path/to/file.pdf --dry-run
zoho desk ticket-attachments download <attachmentId> --ticket <ticketId> --output /path/out.pdf
zoho desk ticket-attachments delete <attachmentId> --ticket <ticketId>
```

## Ticket Tags
```bash
zoho desk ticket-tags list --ticket <ticketId>
zoho desk ticket-tags add --ticket <ticketId> -d '{"tagIds":["<id1>","<id2>"]}' --dry-run
zoho desk ticket-tags remove <tagId> --ticket <ticketId>
```

## Ticket Time Entries & Timers
```bash
zoho desk ticket-time-entries list --ticket <ticketId>
zoho desk ticket-time-entries create --ticket <ticketId> -d '{"executedTime":"01:30","agentId":"<id>"}' --dry-run
zoho desk ticket-time-entries update <entryId> --ticket <ticketId> -d '{...}' --dry-run
zoho desk ticket-time-entries delete <entryId> --ticket <ticketId>

zoho desk ticket-timers start --ticket <ticketId>     # Start billing timer
zoho desk ticket-timers pause --ticket <ticketId>
zoho desk ticket-timers resume --ticket <ticketId>
zoho desk ticket-timers stop --ticket <ticketId>
zoho desk ticket-timers status --ticket <ticketId>
```

## Contacts (Desk customers)
```bash
zoho desk contacts list --page 1 --per-page 50
zoho desk contacts get <contactId> --include assignedAgent,ownerId
zoho desk contacts create -d '{"lastName":"Smith","firstName":"John","email":"john@acme.com"}' --dry-run
zoho desk contacts update <contactId> -d '{"phone":"+1234567890"}' --dry-run
zoho desk contacts delete <contactId>
zoho desk contacts search --query "acme"
zoho desk contacts count
zoho desk contacts tickets <contactId>                # List this contact's tickets
```

## Accounts (Customer companies)
```bash
zoho desk accounts list
zoho desk accounts get <accountId>
zoho desk accounts create -d '{"accountName":"Acme Corp","website":"acme.com"}' --dry-run
zoho desk accounts update <accountId> -d '{...}' --dry-run
zoho desk accounts delete <accountId>
zoho desk accounts search --query "acme"
zoho desk accounts count
zoho desk accounts tickets <accountId>                # List this account's tickets
```

## Agents (Support staff)
```bash
zoho desk agents list --department <deptId> --status ACTIVE
zoho desk agents get <agentId>
zoho desk agents me                                   # Get current authenticated agent's info
zoho desk agents create -d '{"firstName":"Jane","lastName":"Doe","email":"jane@co.com","roleId":"<id>"}' --dry-run
zoho desk agents update <agentId> -d '{...}' --dry-run
zoho desk agents delete <agentId>
zoho desk agents count
zoho desk agents activate <agentId>
```

## Departments
```bash
zoho desk departments list
zoho desk departments get <deptId>
zoho desk departments create -d '{"name":"Technical Support"}' --dry-run
zoho desk departments update <deptId> -d '{"name":"Tech"}' --dry-run
zoho desk departments delete <deptId>
```

## Tasks, Calls, Events, Activities
```bash
zoho desk tasks list --department <deptId> --status Open --assignee <id>
zoho desk tasks get <taskId>
zoho desk tasks create -d '{"subject":"Follow up","departmentId":"<id>","dueDate":"2026-04-15T17:00:00Z"}' --dry-run
zoho desk tasks update <taskId> -d '{...}' --dry-run
zoho desk tasks delete <taskId>
zoho desk tasks count
zoho desk tasks search --query "follow up"

zoho desk calls list/get/create/update/delete/count
zoho desk events list/get/create/update/delete/count
zoho desk activities list                             # Unified view of tasks, calls, events
zoho desk activities list --type TASK                 # Filter by type: TASK/CALL/EVENT
zoho desk activities count
```

## Time Entries (Global)
```bash
zoho desk time-entries list
zoho desk time-entries get <entryId>
zoho desk time-entries create -d '{...}' --dry-run
zoho desk time-entries update <entryId> -d '{...}' --dry-run
zoho desk time-entries delete <entryId>
```

## Knowledge Base — Articles
```bash
zoho desk articles list --category-id <id> --section-id <id> --status Published
zoho desk articles get <articleId>
zoho desk articles create -d '{"title":"How to...","answer":"...","categoryId":"<id>","status":"Published"}' --dry-run
zoho desk articles update <articleId> -d '{...}' --dry-run
zoho desk articles delete <articleId>
zoho desk articles search --query "login"
zoho desk articles count
```

**Article status:** `Draft`, `Published`, `Unpublished`
**Article permission:** `ALL`, `REGISTEREDUSERS`, `AGENTS`

## Knowledge Base — Categories & Sections
```bash
zoho desk kb-categories list
zoho desk kb-categories get <categoryId>
zoho desk kb-categories create -d '{"name":"Getting Started","departmentId":"<id>"}' --dry-run
zoho desk kb-categories update <categoryId> -d '{"name":"Getting Started Guide"}' --dry-run
zoho desk kb-categories delete <categoryId>

zoho desk kb-sections list --category-id <id>
zoho desk kb-sections get <sectionId>
zoho desk kb-sections create -d '{"name":"FAQs","categoryId":"<id>"}' --dry-run
```

## Products, Tags, Views
```bash
zoho desk products list/get/create/update/delete/count
zoho desk tags list --department <deptId>             # Ticket tag management
zoho desk tags get/create/update/delete/count
zoho desk views list --module tickets                 # Custom views: tickets/contacts/accounts/tasks/calls/events
zoho desk views get/create/update/delete
```

## Cross-Module Search
```bash
zoho desk search --query "acme" --module tickets      # Module: tickets/contacts/accounts/tasks/calls/events/articles
zoho desk search --query "login issue" --module tickets --page 1 --per-page 20
```

## Settings (Read-Only)
```bash
zoho desk organizations list                          # List all Desk orgs (works without orgId header)
zoho desk organizations get <orgId>
zoho desk roles list/get                              # Permission roles
zoho desk profiles list/get                           # Permission profiles
zoho desk teams list/get                              # Team management
zoho desk sla list/get                                # SLA rules
zoho desk business-hours list/get                     # Business hours configuration
zoho desk fields list --module tickets                # Field metadata. Module: tickets/contacts/accounts/tasks/calls/events/products
zoho desk layouts list --department <deptId>          # Ticket layouts
zoho desk layouts get <layoutId>
zoho desk blueprints list --department <deptId>       # Process automation blueprints
```

## Desk API Gotchas
- **`orgId` header required** on every request except `/organizations`. Auto-detected on first call.
- **Pagination uses `from`/`limit`** internally (1-based offset, max 100). Exposed as `--page`/`--per-page` for UX consistency.
- **Updates use `PATCH`** (not PUT). All update commands map to PATCH.
- **Error format** uses `errorCode` field (e.g., `{"errorCode":"INVALID_DATA","message":"..."}`). CLI maps to standard envelope.
- **Ticket sub-resources** (threads, comments, attachments, tags, time entries, timers) all require `--ticket <id>` flag.
- **Delete is recoverable** — items move to recycle bin, not hard-deleted.
- **Rate limits:** Daily credit pool (4,000–25,000/day/org depending on plan).
- **Status-changing commands** (create, update, move, merge, split, close, spam, etc.) all support `--dry-run`.
- **Scope format:** `Desk.{module}.{operation}` (e.g., `Desk.tickets.ALL`, `Desk.articles.READ`).
