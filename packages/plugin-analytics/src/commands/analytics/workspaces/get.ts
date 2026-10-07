import { Args } from '@oclif/core'
import { AnalyticsBaseCommand } from '../../../analytics-base-command.js'

export default class AnalyticsWorkspacesGet extends AnalyticsBaseCommand<typeof AnalyticsWorkspacesGet> {
  static id = 'analytics workspaces get'
  static summary = 'Get workspace details'

  static args = {
    id: Args.string({ description: 'Workspace ID', required: true }),
  }

  async run(): Promise<void> {
    const { args } = this
    try {
      const data = await this.analyticsGet(`/workspaces/${args.id}`, undefined, { org: false })
      this.outputSuccess(data.workspaces ?? data, { action: 'analytics.workspaces.get' })
    } catch (error: any) {
      this.handleApiError(error)
    }
  }
}
