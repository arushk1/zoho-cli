import { Args, Flags } from '@oclif/core'
import { AnalyticsBaseCommand } from '../../../analytics-base-command.js'

export default class AnalyticsViewsDelete extends AnalyticsBaseCommand<typeof AnalyticsViewsDelete> {
  static id = 'analytics views delete'
  static summary = 'Delete a view (fails if other views depend on it unless --delete-dependents)'

  static args = {
    id: Args.string({ description: 'View ID', required: true }),
  }

  static flags = {
    workspace: Flags.string({ description: 'Workspace ID', required: true, char: 'w' }),
    'delete-dependents': Flags.boolean({ description: 'Also delete views that depend on this one', default: false }),
    'dry-run': Flags.boolean({ description: 'Show request without executing', default: false }),
  }

  async run(): Promise<void> {
    const { args, flags } = this
    const path = `/workspaces/${flags.workspace}/views/${args.id}`
    const config = flags['delete-dependents'] ? { deleteDependentViews: true } : undefined
    try {
      if (flags['dry-run']) {
        this.outputSuccess({ dryRun: true, method: 'DELETE', path, config })
        return
      }
      await this.analyticsDelete(path, config)
      this.outputSuccess({ deleted: true, viewId: args.id }, { action: 'analytics.views.delete' })
    } catch (error: any) {
      this.handleApiError(error)
    }
  }
}
