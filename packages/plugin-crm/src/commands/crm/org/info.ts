import { CrmBaseCommand } from '../../../crm-base-command.js'

export default class CrmOrgInfo extends CrmBaseCommand<typeof CrmOrgInfo> {
  static id = 'crm org info'
  static summary = 'Get current CRM organization info'
  static examples = ['zoho crm org info']

  async run(): Promise<void> {
    try {
      const { data } = await this.apiClient.get('/org')

      this.outputSuccess(data.org?.[0] ?? data, {
        action: 'org.info',
      })
    } catch (error: any) {
      this.handleApiError(error)
    }
  }
}
