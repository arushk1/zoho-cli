import { Flags } from '@oclif/core'
import { AnalyticsBaseCommand } from '../../../analytics-base-command.js'

export default class AnalyticsWorkspacesCreate extends AnalyticsBaseCommand<typeof AnalyticsWorkspacesCreate> {
  static id = 'analytics workspaces create'
  static summary = 'Create a workspace'

  static flags = {
    name: Flags.string({ description: 'Workspace name (must be unique in the org)', required: true }),
    description: Flags.string({ description: 'Workspace description' }),
    'dry-run': Flags.boolean({ description: 'Show request without executing', default: false }),
  }

  async run(): Promise<void> {
    const { flags } = this
    const config = { workspaceName: flags.name, workspaceDesc: flags.description }
    try {
      if (flags['dry-run']) {
        this.outputSuccess({ dryRun: true, method: 'POST', path: '/workspaces', config })
        return
      }
      const data = await this.analyticsPost('/workspaces', config)
      this.outputSuccess(data, { action: 'analytics.workspaces.create' })
    } catch (error: any) {
      this.handleApiError(error)
    }
  }
}
