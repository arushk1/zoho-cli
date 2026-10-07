import { Args, Flags } from '@oclif/core'
import { AnalyticsBaseCommand } from '../../../analytics-base-command.js'

export default class AnalyticsRawGet extends AnalyticsBaseCommand<typeof AnalyticsRawGet> {
  static id = 'analytics raw get'
  static summary = 'GET any Zoho Analytics API path with the org header set'
  static description = 'Authenticated passthrough for endpoints this CLI does not wrap yet (e.g. import job status, last import details, metadetails). Read-only. Parameters go in --config as the CONFIG JSON object.'
  static examples = [
    `<%= config.bin %> analytics raw get /metadetails --config '{"workspaceName":"Sales"}'`,
    '<%= config.bin %> analytics raw get /bulk/workspaces/<workspace-id>/importjobs/<job-id>',
  ]

  static args = {
    path: Args.string({ description: 'API path relative to /restapi/v2, starting with /', required: true }),
  }

  static flags = {
    config: Flags.string({ description: 'CONFIG parameter as a JSON object' }),
    'skip-org-header': Flags.boolean({ description: 'Omit the ZANALYTICS-ORGID header (for /orgs, /dashboards, /recentviews)', default: false }),
  }

  async run(): Promise<void> {
    const { args, flags } = this
    if (!args.path.startsWith('/')) {
      this.outputError('INVALID_PATH', `path must start with "/", got "${args.path}"`)
      this.exit(3)
    }
    const config = flags.config ? this.parseJsonFlag<Record<string, unknown>>(flags.config, 'config') : undefined
    try {
      const data = await this.analyticsGet(args.path, config, { org: !flags['skip-org-header'] })
      this.outputSuccess(data, { action: 'analytics.raw.get', path: args.path } as any)
    } catch (error: any) {
      this.handleApiError(error)
    }
  }
}
