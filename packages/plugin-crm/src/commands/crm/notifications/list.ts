import { CrmBaseCommand } from '../../../crm-base-command.js'

export default class CrmNotificationsList extends CrmBaseCommand<typeof CrmNotificationsList> {
  static id = 'crm notifications list'
  static summary = 'List notification watches'
  static examples = ['zoho crm notifications list']

  async run(): Promise<void> {
    try {
      const { data } = await this.apiClient.get('/actions/watch')

      const watch = data.watch ?? []

      this.outputSuccess(watch, {
        action: 'notifications.list',
        count: watch.length,
      })
    } catch (error: any) {
      this.handleApiError(error)
    }
  }
}
