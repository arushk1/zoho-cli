import { Flags } from '@oclif/core'
import { CrmBaseCommand } from '../../../crm-base-command.js'

export default class CrmFieldsList extends CrmBaseCommand<typeof CrmFieldsList> {
  static id = 'crm fields list'
  static summary = 'List fields for a CRM module'
  static examples = [
    'zoho crm fields list -m Leads',
    'zoho crm fields list --module Contacts',
  ]

  static flags = {
    module: Flags.string({ description: 'CRM module API name (e.g., Leads, Contacts, Deals)', required: true, char: 'm' }),
  }

  async run(): Promise<void> {
    const { flags } = this

    try {
      const { data } = await this.apiClient.get('/settings/fields', {
        params: { module: flags.module },
      })

      const fields = data.fields ?? []

      this.outputSuccess(fields, {
        module: flags.module,
        action: 'fields.list',
        count: fields.length,
      })
    } catch (error: any) {
      this.handleApiError(error)
    }
  }
}
