import { Args, Flags } from '@oclif/core'
import { AnalyticsBaseCommand } from '../../../analytics-base-command.js'

export default class AnalyticsWorkspacesDelete extends AnalyticsBaseCommand<typeof AnalyticsWorkspacesDelete> {
  static id = 'analytics workspaces delete'
  static summary = 'Delete a workspace and everything in it'

  static args = {
    id: Args.string({ description: 'Workspace ID', required: true }),
  }

  static flags = {
    'dry-run': Flags.boolean({ description: 'Show request without executing', default: false }),
  }

  async run(): Promise<void> {
    const { args, flags } = this
    try {
      if (flags['dry-run']) {
        this.outputSuccess({ dryRun: true, method: 'DELETE', path: `/workspaces/${args.id}` })
        return
      }
      await this.analyticsDelete(`/workspaces/${args.id}`)
      this.outputSuccess({ deleted: true, workspaceId: args.id }, { action: 'analytics.workspaces.delete' })
    } catch (error: any) {
      this.handleApiError(error)
    }
  }
}
