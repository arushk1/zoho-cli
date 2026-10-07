import { Flags } from '@oclif/core'
import { AnalyticsBaseCommand } from '../../../analytics-base-command.js'
import { flattenOwnedShared } from '../../../analytics-utils.js'

export default class AnalyticsDashboardsList extends AnalyticsBaseCommand<typeof AnalyticsDashboardsList> {
  static id = 'analytics dashboards list'
  static summary = 'List dashboards across all workspaces (owned and shared, each tagged with access)'

  static flags = {
    scope: Flags.string({ description: 'Which dashboards to list (all costs 1 API unit; owned/shared are cheaper)', options: ['all', 'owned', 'shared'], default: 'all' }),
  }

  async run(): Promise<void> {
    const { flags } = this
    try {
      let dashboards: Array<Record<string, unknown>>
      if (flags.scope === 'all') {
        const data = await this.analyticsGet('/dashboards', undefined, { org: false })
        dashboards = flattenOwnedShared(data.ownedViews, data.sharedViews)
      } else {
        const data = await this.analyticsGet(`/dashboards/${flags.scope}`, undefined, { org: false })
        dashboards = flags.scope === 'owned'
          ? flattenOwnedShared(data.views, undefined)
          : flattenOwnedShared(undefined, data.views)
      }
      this.outputSuccess(dashboards, { action: 'analytics.dashboards.list', count: dashboards.length })
    } catch (error: any) {
      this.handleApiError(error)
    }
  }
}
