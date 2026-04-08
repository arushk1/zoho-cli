import { Flags } from '@oclif/core'
import { CrmBaseCommand } from '../../../crm-base-command.js'

export default class CrmCustomViewsList extends CrmBaseCommand<typeof CrmCustomViewsList> {
  static id = 'crm custom-views list'
  static summary = 'List custom views for a CRM module'
  static examples = [
    'zoho crm custom-views list -m Leads',
    'zoho crm custom-views list --module Contacts',
  ]

  static flags = {
    module: Flags.string({ description: 'CRM module API name (e.g., Leads, Contacts, Deals)', required: true, char: 'm' }),
  }

  async run(): Promise<void> {
    const { flags } = this

    try {
      const { data } = await this.apiClient.get('/settings/custom_views', {
        params: { module: flags.module },
      })

      const customViews = data.custom_views ?? []

      this.outputSuccess(customViews, {
        module: flags.module,
        action: 'custom-views.list',
        count: customViews.length,
      })
    } catch (error: any) {
      this.handleApiError(error)
    }
  }
}
