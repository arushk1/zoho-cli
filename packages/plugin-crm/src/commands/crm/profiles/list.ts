import { CrmBaseCommand } from '../../../crm-base-command.js'

export default class CrmProfilesList extends CrmBaseCommand<typeof CrmProfilesList> {
  static id = 'crm profiles list'
  static summary = 'List all CRM profiles'
  static examples = ['zoho crm profiles list']

  async run(): Promise<void> {
    try {
      const { data } = await this.apiClient.get('/settings/profiles')

      const profiles = data.profiles ?? []

      this.outputSuccess(profiles, {
        action: 'profiles.list',
        count: profiles.length,
      })
    } catch (error: any) {
      this.handleApiError(error)
    }
  }
}
