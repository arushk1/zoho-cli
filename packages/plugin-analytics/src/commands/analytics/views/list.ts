import { Flags } from '@oclif/core'
import { AnalyticsBaseCommand } from '../../../analytics-base-command.js'
import { VIEW_TYPE_CODES } from '../../../analytics-utils.js'

export default class AnalyticsViewsList extends AnalyticsBaseCommand<typeof AnalyticsViewsList> {
  static id = 'analytics views list'
  static summary = 'List views (tables, reports, dashboards, query tables) in a workspace'

  static flags = {
    workspace: Flags.string({ description: 'Workspace ID', required: true, char: 'w' }),
    type: Flags.string({ description: 'Only include these view types (repeatable)', options: Object.keys(VIEW_TYPE_CODES), multiple: true }),
    keyword: Flags.string({ description: 'Filter views whose name contains this keyword' }),
    start: Flags.integer({ description: 'Start index of the result set (startIndex)' }),
    limit: Flags.integer({ description: 'Maximum number of views to return (noOfResult)' }),
  }

  async run(): Promise<void> {
    const { flags } = this
    try {
      const data = await this.analyticsGet(`/workspaces/${flags.workspace}/views`, {
        viewTypes: flags.type?.map((t) => VIEW_TYPE_CODES[t]),
        keyword: flags.keyword,
        startIndex: flags.start,
        noOfResult: flags.limit,
      })
      const views = data.views ?? []
      this.outputSuccess(views, { action: 'analytics.views.list', count: views.length })
    } catch (error: any) {
      this.handleApiError(error)
    }
  }
}
