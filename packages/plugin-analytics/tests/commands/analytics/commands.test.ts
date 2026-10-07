import { describe, it, expect } from 'vitest'
import AnalyticsDashboardsList from '../../../src/commands/analytics/dashboards/list.js'
import AnalyticsDataExport from '../../../src/commands/analytics/data/export.js'
import AnalyticsDataImport from '../../../src/commands/analytics/data/import.js'
import AnalyticsDatasourcesList from '../../../src/commands/analytics/datasources/list.js'
import AnalyticsDatasourcesSync from '../../../src/commands/analytics/datasources/sync.js'
import AnalyticsExportJobsDownload from '../../../src/commands/analytics/export-jobs/download.js'
import AnalyticsExportJobsGet from '../../../src/commands/analytics/export-jobs/get.js'
import AnalyticsFoldersList from '../../../src/commands/analytics/folders/list.js'
import AnalyticsOrgsList from '../../../src/commands/analytics/orgs/list.js'
import AnalyticsQuery from '../../../src/commands/analytics/query.js'
import AnalyticsQueryTablesCreate from '../../../src/commands/analytics/query-tables/create.js'
import AnalyticsRawGet from '../../../src/commands/analytics/raw/get.js'
import AnalyticsRowsAdd from '../../../src/commands/analytics/rows/add.js'
import AnalyticsRowsDelete from '../../../src/commands/analytics/rows/delete.js'
import AnalyticsRowsUpdate from '../../../src/commands/analytics/rows/update.js'
import AnalyticsTablesCreate from '../../../src/commands/analytics/tables/create.js'
import AnalyticsUsersList from '../../../src/commands/analytics/users/list.js'
import AnalyticsViewsDelete from '../../../src/commands/analytics/views/delete.js'
import AnalyticsViewsGet from '../../../src/commands/analytics/views/get.js'
import AnalyticsViewsList from '../../../src/commands/analytics/views/list.js'
import AnalyticsViewsRecent from '../../../src/commands/analytics/views/recent.js'
import AnalyticsViewsRename from '../../../src/commands/analytics/views/rename.js'
import AnalyticsWorkspacesCreate from '../../../src/commands/analytics/workspaces/create.js'
import AnalyticsWorkspacesDelete from '../../../src/commands/analytics/workspaces/delete.js'
import AnalyticsWorkspacesGet from '../../../src/commands/analytics/workspaces/get.js'
import AnalyticsWorkspacesList from '../../../src/commands/analytics/workspaces/list.js'

const commands: Array<[any, string]> = [
  [AnalyticsDashboardsList, 'analytics dashboards list'],
  [AnalyticsDataExport, 'analytics data export'],
  [AnalyticsDataImport, 'analytics data import'],
  [AnalyticsDatasourcesList, 'analytics datasources list'],
  [AnalyticsDatasourcesSync, 'analytics datasources sync'],
  [AnalyticsExportJobsDownload, 'analytics export-jobs download'],
  [AnalyticsExportJobsGet, 'analytics export-jobs get'],
  [AnalyticsFoldersList, 'analytics folders list'],
  [AnalyticsOrgsList, 'analytics orgs list'],
  [AnalyticsQuery, 'analytics query'],
  [AnalyticsQueryTablesCreate, 'analytics query-tables create'],
  [AnalyticsRawGet, 'analytics raw get'],
  [AnalyticsRowsAdd, 'analytics rows add'],
  [AnalyticsRowsDelete, 'analytics rows delete'],
  [AnalyticsRowsUpdate, 'analytics rows update'],
  [AnalyticsTablesCreate, 'analytics tables create'],
  [AnalyticsUsersList, 'analytics users list'],
  [AnalyticsViewsDelete, 'analytics views delete'],
  [AnalyticsViewsGet, 'analytics views get'],
  [AnalyticsViewsList, 'analytics views list'],
  [AnalyticsViewsRecent, 'analytics views recent'],
  [AnalyticsViewsRename, 'analytics views rename'],
  [AnalyticsWorkspacesCreate, 'analytics workspaces create'],
  [AnalyticsWorkspacesDelete, 'analytics workspaces delete'],
  [AnalyticsWorkspacesGet, 'analytics workspaces get'],
  [AnalyticsWorkspacesList, 'analytics workspaces list'],
]

const writeCommands = [
  AnalyticsDataImport, AnalyticsDatasourcesSync, AnalyticsQueryTablesCreate, AnalyticsRowsAdd, AnalyticsRowsDelete,
  AnalyticsRowsUpdate, AnalyticsTablesCreate, AnalyticsViewsDelete, AnalyticsViewsRename, AnalyticsWorkspacesCreate,
  AnalyticsWorkspacesDelete,
]

const workspaceScoped = [
  AnalyticsDataExport, AnalyticsDataImport, AnalyticsDatasourcesList, AnalyticsDatasourcesSync, AnalyticsExportJobsDownload,
  AnalyticsExportJobsGet, AnalyticsFoldersList, AnalyticsQuery, AnalyticsQueryTablesCreate, AnalyticsRowsAdd,
  AnalyticsRowsDelete, AnalyticsRowsUpdate, AnalyticsTablesCreate, AnalyticsViewsDelete, AnalyticsViewsList,
  AnalyticsViewsRename,
]

describe('analytics command metadata', () => {
  it.each(commands)('%o has id "%s" and a summary', (Cmd, id) => {
    expect(Cmd.id).toBe(id)
    expect(Cmd.summary).toBeTruthy()
  })

  it.each(writeCommands.map((c) => [c.id, c]))('%s supports --dry-run', (_id, Cmd: any) => {
    expect(Cmd.flags['dry-run']).toBeDefined()
  })

  it.each(workspaceScoped.map((c) => [c.id, c]))('%s requires --workspace', (_id, Cmd: any) => {
    expect(Cmd.flags.workspace.required).toBe(true)
    expect(Cmd.flags.workspace.char).toBe('w')
  })

  it('requires --sql on query and offers no image format (bulk jobs cannot produce it)', () => {
    expect(AnalyticsQuery.flags.sql.required).toBe(true)
    expect(AnalyticsQuery.flags.format.options).not.toContain('image')
  })

  it('requires path arg on raw get', () => {
    expect(AnalyticsRawGet.args.path.required).toBe(true)
  })
})
