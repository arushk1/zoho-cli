import { CrmBaseCommand } from '../../../crm-base-command.js'

export default class CrmCurrenciesList extends CrmBaseCommand<typeof CrmCurrenciesList> {
  static id = 'crm currencies list'
  static summary = 'List all CRM currencies'
  static examples = ['zoho crm currencies list']

  async run(): Promise<void> {
    try {
      const { data } = await this.apiClient.get('/org/currencies')

      const currencies = data.currencies ?? []

      this.outputSuccess(currencies, {
        action: 'currencies.list',
        count: currencies.length,
      })
    } catch (error: any) {
      this.handleApiError(error)
    }
  }
}
