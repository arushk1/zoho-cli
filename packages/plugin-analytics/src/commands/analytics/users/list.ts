import { Flags } from '@oclif/core'
import { AnalyticsBaseCommand } from '../../../analytics-base-command.js'

export default class AnalyticsUsersList extends AnalyticsBaseCommand<typeof AnalyticsUsersList> {
  static id = 'analytics users list'
  static summary = 'List organization users, or the users of one workspace with --workspace'

  static flags = {
    workspace: Flags.string({ description: 'Workspace ID (lists workspace users instead of org users)', char: 'w' }),
  }

  async run(): Promise<void> {
    const { flags } = this
    try {
      const path = flags.workspace ? `/workspaces/${flags.workspace}/users` : '/users'
      const data = await this.analyticsGet(path)
      const users = data.users ?? []
      this.outputSuccess(users, { action: 'analytics.users.list', count: users.length })
    } catch (error: any) {
      this.handleApiError(error)
    }
  }
}
