import { Flags } from '@oclif/core'
import { AnalyticsBaseCommand } from '../../../analytics-base-command.js'

export default class AnalyticsRowsAdd extends AnalyticsBaseCommand<typeof AnalyticsRowsAdd> {
  static id = 'analytics rows add'
  static summary = 'Add a row to a table'
  static examples = [
    `<%= config.bin %> analytics rows add -w <workspace-id> --view <view-id> -d '{"Region":"East","Sales":1200}'`,
  ]

  static flags = {
    workspace: Flags.string({ description: 'Workspace ID', required: true, char: 'w' }),
    view: Flags.string({ description: 'Table (view) ID', required: true }),
    data: Flags.string({ description: 'JSON object of column name to value', required: true, char: 'd' }),
    'date-format': Flags.string({ description: 'Date format of date values in --data (e.g. dd-MMM-yyyy)' }),
    'dry-run': Flags.boolean({ description: 'Show request without executing', default: false }),
  }

  async run(): Promise<void> {
    const { flags } = this
    const path = `/workspaces/${flags.workspace}/views/${flags.view}/rows`
    const config = { columns: this.parseJsonFlag(flags.data, 'data'), dateFormat: flags['date-format'] }
    try {
      if (flags['dry-run']) {
        this.outputSuccess({ dryRun: true, method: 'POST', path, config })
        return
      }
      const data = await this.analyticsPost(path, config)
      this.outputSuccess(data, { action: 'analytics.rows.add' })
    } catch (error: any) {
      this.handleApiError(error)
    }
  }
}
