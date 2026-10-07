import { Flags } from '@oclif/core'
import { AnalyticsBaseCommand } from '../../../analytics-base-command.js'

export default class AnalyticsFoldersList extends AnalyticsBaseCommand<typeof AnalyticsFoldersList> {
  static id = 'analytics folders list'
  static summary = 'List folders in a workspace'

  static flags = {
    workspace: Flags.string({ description: 'Workspace ID', required: true, char: 'w' }),
  }

  async run(): Promise<void> {
    const { flags } = this
    try {
      const data = await this.analyticsGet(`/workspaces/${flags.workspace}/folders`)
      const folders = data.folders ?? []
      this.outputSuccess(folders, { action: 'analytics.folders.list', count: folders.length })
    } catch (error: any) {
      this.handleApiError(error)
    }
  }
}
