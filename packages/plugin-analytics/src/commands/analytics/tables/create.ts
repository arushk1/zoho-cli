import { Flags } from '@oclif/core'
import { AnalyticsBaseCommand } from '../../../analytics-base-command.js'

export default class AnalyticsTablesCreate extends AnalyticsBaseCommand<typeof AnalyticsTablesCreate> {
  static id = 'analytics tables create'
  static summary = 'Create a table from a table design'
  static description = 'The design uses Zoho\'s UPPERCASE keys: TABLENAME, TABLEDESCRIPTION, FOLDERNAME, COLUMNS[{COLUMNNAME, DATATYPE, MANDATORY, DESCRIPTION, DEFAULT, LOOKUPCOLUMN}]. DATATYPE is one of PLAIN, MULTI_LINE, EMAIL, NUMBER, POSITIVE_NUMBER, DECIMAL_NUMBER, CURRENCY, PERCENT, DATE, BOOLEAN, URL, AUTO_NUMBER, GEO.'
  static examples = [
    `<%= config.bin %> analytics tables create -w 1767024000003145002 -d '{"TABLENAME":"Leads","COLUMNS":[{"COLUMNNAME":"Name","DATATYPE":"PLAIN"},{"COLUMNNAME":"Value","DATATYPE":"CURRENCY"}]}'`,
  ]

  static flags = {
    workspace: Flags.string({ description: 'Workspace ID', required: true, char: 'w' }),
    data: Flags.string({ description: 'Table design JSON (tableDesign)', required: true, char: 'd' }),
    'dry-run': Flags.boolean({ description: 'Show request without executing', default: false }),
  }

  async run(): Promise<void> {
    const { flags } = this
    const path = `/workspaces/${flags.workspace}/tables`
    const config = { tableDesign: this.parseJsonFlag(flags.data, 'data') }
    try {
      if (flags['dry-run']) {
        this.outputSuccess({ dryRun: true, method: 'POST', path, config })
        return
      }
      const data = await this.analyticsPost(path, config)
      this.outputSuccess(data, { action: 'analytics.tables.create' })
    } catch (error: any) {
      this.handleApiError(error)
    }
  }
}
