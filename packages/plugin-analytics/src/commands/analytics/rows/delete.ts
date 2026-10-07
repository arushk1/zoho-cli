import { Flags } from '@oclif/core'
import { AnalyticsBaseCommand } from '../../../analytics-base-command.js'

export default class AnalyticsRowsDelete extends AnalyticsBaseCommand<typeof AnalyticsRowsDelete> {
  static id = 'analytics rows delete'
  static summary = 'Delete rows matching a criteria (or every row with --all)'
  static description = 'Criteria is a SQL WHERE clause: double-quote column names, single-quote strings, e.g. "Region"=\'East\'.'

  static flags = {
    workspace: Flags.string({ description: 'Workspace ID', required: true, char: 'w' }),
    view: Flags.string({ description: 'Table (view) ID', required: true }),
    criteria: Flags.string({ description: 'SQL WHERE clause selecting rows to delete', exclusive: ['all'] }),
    all: Flags.boolean({ description: 'Delete every row in the table', default: false, exclusive: ['criteria'] }),
    'dry-run': Flags.boolean({ description: 'Show request without executing', default: false }),
  }

  async run(): Promise<void> {
    const { flags } = this
    if (!flags.criteria && !flags.all) {
      this.outputError('MISSING_CRITERIA', 'Pass --criteria to select rows, or --all to delete every row')
      this.exit(3)
    }
    const path = `/workspaces/${flags.workspace}/views/${flags.view}/rows`
    const config = { criteria: flags.criteria, deleteAllRows: flags.all || undefined }
    try {
      if (flags['dry-run']) {
        this.outputSuccess({ dryRun: true, method: 'DELETE', path, config })
        return
      }
      const data = await this.analyticsDelete(path, config)
      this.outputSuccess(data, { action: 'analytics.rows.delete' })
    } catch (error: any) {
      this.handleApiError(error)
    }
  }
}
