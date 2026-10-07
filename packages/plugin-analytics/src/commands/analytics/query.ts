import { Flags } from '@oclif/core'
import { AnalyticsBaseCommand } from '../../analytics-base-command.js'
import { EXPORT_FORMATS, type ExportFormat } from '../../analytics-utils.js'

export default class AnalyticsQuery extends AnalyticsBaseCommand<typeof AnalyticsQuery> {
  static id = 'analytics query'
  static summary = 'Run a SQL SELECT query against a workspace and return the result'
  static description = 'Zoho only runs SQL as a bulk export job: this creates the job, polls until it completes, then downloads the result (available for 1 hour). Use --no-wait to just get the job ID and fetch it later with "analytics export-jobs".'
  static examples = [
    `<%= config.bin %> analytics query -w <workspace-id> --sql 'SELECT "Region", SUM("Sales") FROM "Sales" GROUP BY "Region"'`,
    `<%= config.bin %> analytics query -w <workspace-id> --sql 'SELECT * FROM "Sales"' --format csv --output sales.csv`,
  ]

  static flags = {
    workspace: Flags.string({ description: 'Workspace ID', required: true, char: 'w' }),
    sql: Flags.string({ description: 'SQL SELECT query (double-quote table/column names)', required: true, char: 'q' }),
    format: Flags.string({ description: 'Result format', options: EXPORT_FORMATS.filter((f) => f !== 'image'), default: 'json' }),
    output: Flags.string({ description: 'Write the result to this file instead of stdout', char: 'o' }),
    wait: Flags.boolean({ description: 'Wait for the job and return its result (--no-wait returns the job ID)', default: true, allowNo: true }),
    timeout: Flags.integer({ description: 'Seconds to wait for the job', default: 300 }),
    'poll-interval': Flags.integer({ description: 'Seconds between job status checks', default: 5 }),
  }

  async run(): Promise<void> {
    const { flags } = this
    const format = flags.format as ExportFormat
    try {
      const { jobId } = await this.analyticsGet(`/bulk/workspaces/${flags.workspace}/data`, { sqlQuery: flags.sql, responseFormat: format })
      if (!flags.wait) {
        this.outputSuccess({ jobId, workspaceId: flags.workspace }, { action: 'analytics.query' })
        return
      }
      process.stderr.write(`[zoho-cli] Query job ${jobId} created, waiting for completion...\n`)
      await this.waitForExportJob(flags.workspace, jobId, { intervalMs: flags['poll-interval'] * 1000, timeoutMs: flags.timeout * 1000 })
      const body = await this.analyticsDownload(`/bulk/workspaces/${flags.workspace}/exportjobs/${jobId}/data`)
      await this.emitExport(body, format, flags.output, { action: 'analytics.query' })
    } catch (error: any) {
      this.handleApiError(error)
    }
  }
}
