import { Flags } from '@oclif/core'
import { CrmBaseCommand } from '../../../crm-base-command.js'

export default class CrmTagsList extends CrmBaseCommand<typeof CrmTagsList> {
  static id = 'crm tags list'
  static summary = 'List tags for a module'
  static examples = [
    'zoho crm tags list -m Leads',
    'zoho crm tags list --module Contacts',
  ]

  static flags = {
    module: Flags.string({ description: 'CRM module API name (e.g., Leads, Contacts, Deals)', required: true, char: 'm' }),
  }

  async run(): Promise<void> {
    const { flags } = this

    try {
      const { data } = await this.apiClient.get('/settings/tags', {
        params: { module: flags.module },
      })

      this.outputSuccess(data.tags ?? [], {
        module: flags.module,
        action: 'list',
        count: data.tags?.length ?? 0,
      })
    } catch (error: any) {
      this.handleApiError(error)
    }
  }
}
