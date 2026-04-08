import { Args } from '@oclif/core'
import { CrmBaseCommand } from '../../../crm-base-command.js'

export default class CrmRecordsCount extends CrmBaseCommand<typeof CrmRecordsCount> {
  static id = 'crm records count'
  static summary = 'Get the total record count for a module'
  static examples = ['zoho crm records count Leads', 'zoho crm records count Deals']

  static args = {
    module: Args.string({ description: 'CRM module API name (e.g., Leads, Contacts, Deals)', required: true }),
  }

  async run(): Promise<void> {
    const { args } = this

    try {
      const { data } = await this.apiClient.get(`/${args.module}/actions/count`)

      this.outputSuccess(data, {
        module: args.module,
        action: 'count',
      })
    } catch (error: any) {
      this.handleApiError(error)
    }
  }
}
