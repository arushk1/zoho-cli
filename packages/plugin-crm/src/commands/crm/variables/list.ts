import { CrmBaseCommand } from '../../../crm-base-command.js'

export default class CrmVariablesList extends CrmBaseCommand<typeof CrmVariablesList> {
  static id = 'crm variables list'
  static summary = 'List all CRM variables'
  static examples = ['zoho crm variables list']

  async run(): Promise<void> {
    try {
      const { data } = await this.apiClient.get('/settings/variables')

      const variables = data.variables ?? []

      this.outputSuccess(variables, {
        action: 'variables.list',
        count: variables.length,
      })
    } catch (error: any) {
      this.handleApiError(error)
    }
  }
}
