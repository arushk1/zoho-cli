import { Flags } from '@oclif/core'
import { AnalyticsBaseCommand } from '../../../analytics-base-command.js'
import { EXPORT_FORMATS, splitList, type ExportFormat } from '../../../analytics-utils.js'

export default class AnalyticsDataExport extends AnalyticsBaseCommand<typeof AnalyticsDataExport> {
  static id = 'analytics data export'
  static summary = 'Export data from a table, report or dashboard'
  static description = 'Synchronous by default. Use --async for tables over 1M rows, query tables, dashboards and live-connect workspaces, which Zoho only exports as a bulk job. json/csv/xml/html are returned inline unless --output is given; xls/pdf/image require --output.'
  static examples = [
    '<%= config.bin %> analytics data export -w <workspace-id> --view <view-id>',
    `<%= config.bin %> analytics data export -w <workspace-id> --view <view-id> --criteria "\\"Region\\"='East'" --columns Region,Sales`,
    '<%= config.bin %> analytics data export -w <workspace-id> --view <view-id> --format pdf --output report.pdf --async',
  ]

  static flags = {
    workspace: Flags.string({ description: 'Workspace ID', required: true, char: 'w' }),
    view: Flags.string({ description: 'View ID to export', required: true }),
    format: Flags.string({ description: 'Response format', options: [...EXPORT_FORMATS], default: 'json' }),
    criteria: Flags.string({ description: 'SQL WHERE clause to filter rows' }),
    columns: Flags.string({ description: 'Comma-separated column names to include (selectedColumns)' }),
    output: Flags.string({ description: 'Write the export to this file instead of stdout', char: 'o' }),
    async: Flags.boolean({ description: 'Run as a bulk export job and wait for it', default: false }),
    timeout: Flags.integer({ description: 'Seconds to wait for an --async job', default: 300 }),
    'poll-interval': Flags.integer({ description: 'Seconds between --async job status checks', default: 5 }),
  }

  async run(): Promise<void> {
    const { flags } = this
    const format = flags.format as ExportFormat
    const config = { responseFormat: format, criteria: flags.criteria, selectedColumns: splitList(flags.columns) }
    const meta = { action: 'analytics.data.export' }
    try {
      let body: Buffer
      if (flags.async) {
        if (format === 'image') {
          this.outputError('INVALID_FORMAT', 'Bulk export jobs do not support the image format')
          this.exit(3)
        }
        const { jobId } = await this.analyticsGet(`/bulk/workspaces/${flags.workspace}/views/${flags.view}/data`, config)
        process.stderr.write(`[zoho-cli] Export job ${jobId} created, waiting for completion...\n`)
        await this.waitForExportJob(flags.workspace, jobId, { intervalMs: flags['poll-interval'] * 1000, timeoutMs: flags.timeout * 1000 })
        body = await this.analyticsDownload(`/bulk/workspaces/${flags.workspace}/exportjobs/${jobId}/data`)
      } else {
        body = await this.analyticsDownload(`/workspaces/${flags.workspace}/views/${flags.view}/data`, config)
      }
      await this.emitExport(body, format, flags.output, meta)
    } catch (error: any) {
      this.handleApiError(error)
    }
  }
}
