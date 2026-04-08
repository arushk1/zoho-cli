import { CrmBaseCommand } from '../../../crm-base-command.js'

export default class CrmTerritoriesList extends CrmBaseCommand<typeof CrmTerritoriesList> {
  static id = 'crm territories list'
  static summary = 'List all CRM territories'
  static examples = ['zoho crm territories list']

  async run(): Promise<void> {
    try {
      const { data } = await this.apiClient.get('/settings/territories')

      const territories = data.territories ?? []

      this.outputSuccess(territories, {
        action: 'territories.list',
        count: territories.length,
      })
    } catch (error: any) {
      this.handleApiError(error)
    }
  }
}
