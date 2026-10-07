import { Args, Flags } from '@oclif/core'
import { AnalyticsBaseCommand } from '../../../analytics-base-command.js'

export default class AnalyticsViewsRename extends AnalyticsBaseCommand<typeof AnalyticsViewsRename> {
  static id = 'analytics views rename'
  static summary = 'Rename a view and optionally change its description'

  static args = {
    id: Args.string({ description: 'View ID', required: true }),
  }

  static flags = {
    workspace: Flags.string({ description: 'Workspace ID', required: true, char: 'w' }),
    name: Flags.string({ description: 'New view name', required: true }),
    description: Flags.string({ description: 'New view description' }),
    'dry-run': Flags.boolean({ description: 'Show request without executing', default: false }),
  }

  async run(): Promise<void> {
    const { args, flags } = this
    const path = `/workspaces/${flags.workspace}/views/${args.id}`
    const config = { viewName: flags.name, viewDesc: flags.description }
    try {
      if (flags['dry-run']) {
        this.outputSuccess({ dryRun: true, method: 'PUT', path, config })
        return
      }
      await this.analyticsPut(path, config)
      this.outputSuccess({ renamed: true, viewId: args.id, viewName: flags.name }, { action: 'analytics.views.rename' })
    } catch (error: any) {
      this.handleApiError(error)
    }
  }
}
