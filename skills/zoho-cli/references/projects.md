# Zoho Projects (87 commands)

**V3 API.** Most commands require `--project <id>` or `-p <id>`. Portal auto-detects.

## Projects & Portals
```bash
zoho projects portals list                            # List all portals
zoho projects portals get                             # Get current portal details
zoho projects list                                    # List all projects
zoho projects list --page 1 --per-page 5
zoho projects get <projectId>
zoho projects create -d '{"name":"New Project"}' --dry-run
zoho projects update <projectId> -d '{"name":"Updated"}' --dry-run
zoho projects delete <projectId> --dry-run
zoho projects search --query "keyword" --module projects  # --module required (projects/milestones/tasks/tasklists)
```

## Tasks
```bash
zoho projects tasks list -p <projectId>
zoho projects tasks list -p <projectId> --page 1 --per-page 5 --status open
zoho projects tasks my                                # My tasks across all projects
zoho projects tasks get <taskId> -p <projectId>       # --project required
zoho projects tasks create -p <projectId> -d '{"name":"New Task"}' --dry-run
zoho projects tasks update <taskId> -p <projectId> -d '{"name":"Updated"}' --dry-run
zoho projects tasks delete <taskId> -p <projectId> --dry-run
zoho projects tasks move <taskId> -p <projectId> -d '{"tasklist":{"id":"<id>"}}' --dry-run
zoho projects tasks count -p <projectId>
```

## Tasklists & Phases
```bash
zoho projects tasklists list -p <projectId>
zoho projects tasklists get <id> -p <projectId>       # --project required
zoho projects tasklists create -p <projectId> -d '{"name":"New List"}' --dry-run
zoho projects phases list -p <projectId>              # "Milestones" in Zoho UI
zoho projects phases get <id> -p <projectId>
```

## Issues
```bash
zoho projects issues list -p <projectId>              # May require Issues module in plan
zoho projects issues get <id> -p <projectId>          # --project required
zoho projects issues create -p <projectId> -d '{"title":"Bug"}' --dry-run
zoho projects issues clone <id> -p <projectId> --dry-run
zoho projects issues move <id> -p <projectId> -d '{...}' --dry-run
```

## Comments (entity-scoped)
```bash
zoho projects comments list -p <projectId> --entity-type tasks --entity-id <taskId>
# Valid entity-types: tasks, tasklists, phases
zoho projects comments create -p <projectId> --entity-type tasks --entity-id <taskId> -d '{"content":"Hello"}' --dry-run
```

## Attachments (entity-scoped)
```bash
zoho projects attachments list -p <projectId> --entity-type tasks --entity-id <taskId>
zoho projects attachments upload -p <projectId> --entity-type tasks --entity-id <taskId> --file <path> --dry-run
```

## Other Project Modules
```bash
zoho projects timelogs list -p <projectId>
zoho projects timers list -p <projectId>
zoho projects users list -p <projectId>
zoho projects teams list -p <projectId>               # Requires ZohoProjects.teams scope
zoho projects tags list -p <projectId>
zoho projects forums list -p <projectId>              # May require Forums module in plan
zoho projects events list -p <projectId>
zoho projects dashboards list -p <projectId>
zoho projects feed list -p <projectId>
zoho projects blueprints list -p <projectId>
```

## Projects API Gotchas
- **V3 API returns arrays directly** (not wrapped in `{projects: [...]}`). The CLI handles this transparently.
- **Most get/update/delete commands require `--project`** -- they use project-scoped URLs.
- **`forums` and `issues`** may return "module not available in current plan" (error 6500).
- **`timers`** endpoint may not be configured in V3 (returns URL_RULE_NOT_CONFIGURED).
- **Phases = Milestones** in the Zoho UI. The API may return them under the `milestones` key.
