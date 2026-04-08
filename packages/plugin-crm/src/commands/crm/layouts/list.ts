import { Flags } from '@oclif/core'
import { CrmBaseCommand } from '../../../crm-base-command.js'

export default class CrmLayoutsList extends CrmBaseCommand<typeof CrmLayoutsList> {
  static id = 'crm layouts list'
  static summary = 'List layouts for a CRM module'
  static examples = [
    'zoho crm layouts list -m Leads',
    'zoho crm layouts list --module Contacts',
  ]

  static flags = {
    module: Flags.string({ description: 'CRM module API name (e.g., Leads, Contacts, Deals)', required: true, char: 'm' }),
  }

  async run(): Promise<void> {
    const { flags } = this

    try {
      const { data } = await this.apiClient.get('/settings/layouts', {
        params: { module: flags.module },
      })

      const layouts = data.layouts ?? []

      this.outputSuccess(layouts, {
        module: flags.module,
        action: 'layouts.list',
        count: layouts.length,
      })
    } catch (error: any) {
      this.handleApiError(error)
    }
  }
}
