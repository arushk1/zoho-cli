import { AnalyticsBaseCommand } from '../../../analytics-base-command.js'

export default class AnalyticsViewsRecent extends AnalyticsBaseCommand<typeof AnalyticsViewsRecent> {
  static id = 'analytics views recent'
  static summary = 'List recently accessed views across all workspaces'

  async run(): Promise<void> {
    try {
      const data = await this.analyticsGet('/recentviews', undefined, { org: false })
      const views = data.views ?? []
      this.outputSuccess(views, { action: 'analytics.views.recent', count: views.length })
    } catch (error: any) {
      this.handleApiError(error)
    }
  }
}
