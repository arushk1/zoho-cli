import { Args, Flags } from '@oclif/core'
import { AnalyticsBaseCommand } from '../../../analytics-base-command.js'

export default class AnalyticsDatasourcesSync extends AnalyticsBaseCommand<typeof AnalyticsDatasourcesSync> {
  static id = 'analytics datasources sync'
  static summary = 'Trigger an immediate sync of a data source (costs 5 API units)'

  static args = {
    id: Args.string({ description: 'Data source ID', required: true }),
  }

  static flags = {
    workspace: Flags.string({ description: 'Workspace ID', required: true, char: 'w' }),
    'sync-interval': Flags.string({ description: 'Sync interval ID (required when the source has several intervals)' }),
    'dry-run': Flags.boolean({ description: 'Show request without executing', default: false }),
  }

  async run(): Promise<void> {
    const { args, flags } = this
    const path = `/workspaces/${flags.workspace}/datasources/${args.id}/sync`
    const config = flags['sync-interval'] ? { syncIntervalId: flags['sync-interval'] } : undefined
    try {
      if (flags['dry-run']) {
        this.outputSuccess({ dryRun: true, method: 'POST', path, config })
        return
      }
      await this.analyticsPost(path, config)
      this.outputSuccess({ syncTriggered: true, datasourceId: args.id }, { action: 'analytics.datasources.sync' })
    } catch (error: any) {
      this.handleApiError(error)
    }
  }
}
