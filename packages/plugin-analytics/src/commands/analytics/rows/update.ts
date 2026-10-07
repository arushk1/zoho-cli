import { Flags } from '@oclif/core'
import { AnalyticsBaseCommand } from '../../../analytics-base-command.js'

export default class AnalyticsRowsUpdate extends AnalyticsBaseCommand<typeof AnalyticsRowsUpdate> {
  static id = 'analytics rows update'
  static summary = 'Update rows matching a criteria (or every row with --all)'
  static description = 'Criteria is a SQL WHERE clause: double-quote column names, single-quote strings, e.g. "Region"=\'East\'.'
  static examples = [
    `<%= config.bin %> analytics rows update -w <workspace-id> --view <view-id> -d '{"Status":"Closed"}' --criteria "\\"Region\\"='East'"`,
  ]

  static flags = {
    workspace: Flags.string({ description: 'Workspace ID', required: true, char: 'w' }),
    view: Flags.string({ description: 'Table (view) ID', required: true }),
    data: Flags.string({ description: 'JSON object of column name to new value', required: true, char: 'd' }),
    criteria: Flags.string({ description: 'SQL WHERE clause selecting rows to update', exclusive: ['all'] }),
    all: Flags.boolean({ description: 'Update every row in the table', default: false, exclusive: ['criteria'] }),
    'add-if-missing': Flags.boolean({ description: 'Insert a row when no row matches the criteria (addIfNotExist)', default: false }),
    'date-format': Flags.string({ description: 'Date format of date values in --data (e.g. dd-MMM-yyyy)' }),
    'dry-run': Flags.boolean({ description: 'Show request without executing', default: false }),
  }

  async run(): Promise<void> {
    const { flags } = this
    if (!flags.criteria && !flags.all) {
      this.outputError('MISSING_CRITERIA', 'Pass --criteria to select rows, or --all to update every row')
      this.exit(3)
    }
    const path = `/workspaces/${flags.workspace}/views/${flags.view}/rows`
    const config = {
      columns: this.parseJsonFlag(flags.data, 'data'),
      criteria: flags.criteria,
      updateAllRows: flags.all || undefined,
      addIfNotExist: flags['add-if-missing'] || undefined,
      dateFormat: flags['date-format'],
    }
    try {
      if (flags['dry-run']) {
        this.outputSuccess({ dryRun: true, method: 'PUT', path, config })
        return
      }
      const data = await this.analyticsPut(path, config)
      this.outputSuccess(data, { action: 'analytics.rows.update' })
    } catch (error: any) {
      this.handleApiError(error)
    }
  }
}
