import { Flags } from '@oclif/core'
import { AnalyticsBaseCommand } from '../../../analytics-base-command.js'
import { flattenOwnedShared } from '../../../analytics-utils.js'

export default class AnalyticsWorkspacesList extends AnalyticsBaseCommand<typeof AnalyticsWorkspacesList> {
  static id = 'analytics workspaces list'
  static summary = 'List workspaces (owned and shared, each tagged with access)'

  static flags = {
    scope: Flags.string({ description: 'Which workspaces to list', options: ['all', 'owned', 'shared'], default: 'all' }),
  }

  async run(): Promise<void> {
    const { flags } = this
    try {
      let workspaces: Array<Record<string, unknown>>
      if (flags.scope === 'all') {
        const data = await this.analyticsGet('/workspaces', undefined, { org: false })
        workspaces = flattenOwnedShared(data.ownedWorkspaces, data.sharedWorkspaces)
      } else {
        const data = await this.analyticsGet(`/workspaces/${flags.scope}`, undefined, { org: false })
        workspaces = flags.scope === 'owned'
          ? flattenOwnedShared(data.workspaces, undefined)
          : flattenOwnedShared(undefined, data.workspaces)
      }
      this.outputSuccess(workspaces, { action: 'analytics.workspaces.list', count: workspaces.length })
    } catch (error: any) {
      this.handleApiError(error)
    }
  }
}
