import { Flags } from '@oclif/core'
import { AnalyticsBaseCommand } from '../../../analytics-base-command.js'

export default class AnalyticsDatasourcesList extends AnalyticsBaseCommand<typeof AnalyticsDatasourcesList> {
  static id = 'analytics datasources list'
  static summary = 'List data sources in a workspace with their sync status and schedule'

  static flags = {
    workspace: Flags.string({ description: 'Workspace ID', required: true, char: 'w' }),
  }

  async run(): Promise<void> {
    const { flags } = this
    try {
      const data = await this.analyticsGet(`/workspaces/${flags.workspace}/datasources`)
      const dataSources = data.dataSources ?? []
      this.outputSuccess(dataSources, { action: 'analytics.datasources.list', count: dataSources.length })
    } catch (error: any) {
      this.handleApiError(error)
    }
  }
}
