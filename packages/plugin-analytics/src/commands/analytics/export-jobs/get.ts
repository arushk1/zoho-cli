import { Args, Flags } from '@oclif/core'
import { AnalyticsBaseCommand } from '../../../analytics-base-command.js'

export default class AnalyticsExportJobsGet extends AnalyticsBaseCommand<typeof AnalyticsExportJobsGet> {
  static id = 'analytics export-jobs get'
  static summary = 'Get the status of a bulk export job (jobCode 1004 = completed)'

  static args = {
    id: Args.string({ description: 'Export job ID', required: true }),
  }

  static flags = {
    workspace: Flags.string({ description: 'Workspace ID', required: true, char: 'w' }),
  }

  async run(): Promise<void> {
    const { args, flags } = this
    try {
      const data = await this.analyticsGet(`/bulk/workspaces/${flags.workspace}/exportjobs/${args.id}`)
      this.outputSuccess(data, { action: 'analytics.export-jobs.get' })
    } catch (error: any) {
      this.handleApiError(error)
    }
  }
}
