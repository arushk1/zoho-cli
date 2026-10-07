import { Flags } from '@oclif/core'
import { AnalyticsBaseCommand } from '../../../analytics-base-command.js'

export default class AnalyticsQueryTablesCreate extends AnalyticsBaseCommand<typeof AnalyticsQueryTablesCreate> {
  static id = 'analytics query-tables create'
  static summary = 'Create a query table (a saved SQL view)'

  static flags = {
    workspace: Flags.string({ description: 'Workspace ID', required: true, char: 'w' }),
    name: Flags.string({ description: 'Query table name', required: true }),
    sql: Flags.string({ description: 'SQL SELECT query (double-quote table/column names)', required: true }),
    description: Flags.string({ description: 'Query table description' }),
    folder: Flags.string({ description: 'Folder ID to place the query table in' }),
    'dry-run': Flags.boolean({ description: 'Show request without executing', default: false }),
  }

  async run(): Promise<void> {
    const { flags } = this
    const path = `/workspaces/${flags.workspace}/querytables`
    const config = { queryTableName: flags.name, sqlQuery: flags.sql, description: flags.description, folderId: flags.folder }
    try {
      if (flags['dry-run']) {
        this.outputSuccess({ dryRun: true, method: 'POST', path, config })
        return
      }
      const data = await this.analyticsPost(path, config)
      this.outputSuccess(data, { action: 'analytics.query-tables.create' })
    } catch (error: any) {
      this.handleApiError(error)
    }
  }
}
