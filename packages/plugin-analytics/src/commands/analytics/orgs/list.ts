import { AnalyticsBaseCommand } from '../../../analytics-base-command.js'

export default class AnalyticsOrgsList extends AnalyticsBaseCommand<typeof AnalyticsOrgsList> {
  static id = 'analytics orgs list'
  static summary = 'List Zoho Analytics organizations (use orgId with --org or defaultAnalyticsOrg)'

  async run(): Promise<void> {
    try {
      const data = await this.analyticsGet('/orgs', undefined, { org: false })
      const orgs = data.orgs ?? []
      this.outputSuccess(orgs, { action: 'analytics.orgs.list', count: orgs.length })
    } catch (error: any) {
      this.handleApiError(error)
    }
  }
}
