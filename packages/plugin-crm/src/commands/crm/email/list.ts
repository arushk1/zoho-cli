import { Args } from '@oclif/core'
import { CrmBaseCommand } from '../../../crm-base-command.js'

export default class CrmEmailList extends CrmBaseCommand<typeof CrmEmailList> {
  static id = 'crm email list'
  static summary = 'List emails for a record'
  static examples = [
    'zoho crm email list Leads 5437280000000328001',
    'zoho crm email list Contacts 5437280000000328001',
  ]

  static args = {
    module: Args.string({ description: 'CRM module API name (e.g., Leads, Contacts, Deals)', required: true }),
    id: Args.string({ description: 'Record ID', required: true }),
  }

  async run(): Promise<void> {
    const { args } = this

    try {
      const { data } = await this.apiClient.get(`/${args.module}/${args.id}/Emails`)

      this.outputSuccess(data.data ?? [], {
        module: args.module,
        action: 'email.list',
        count: data.data?.length ?? 0,
      })
    } catch (error: any) {
      this.handleApiError(error)
    }
  }
}
