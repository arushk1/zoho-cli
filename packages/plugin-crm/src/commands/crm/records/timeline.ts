import { Args, Flags } from '@oclif/core'
import { CrmBaseCommand } from '../../../crm-base-command.js'

export default class CrmRecordsTimeline extends CrmBaseCommand<typeof CrmRecordsTimeline> {
  static id = 'crm records timeline'
  static summary = 'Get the timeline of a record'
  static examples = [
    'zoho crm records timeline Leads 5437280000000328001',
    'zoho crm records timeline Contacts 5437280000000328001 --page 2 --per-page 50',
  ]

  static args = {
    module: Args.string({ description: 'CRM module API name (e.g., Leads, Contacts, Deals)', required: true }),
    id: Args.string({ description: 'Record ID', required: true }),
  }

  static flags = {
    page: Flags.integer({ description: 'Page number', default: 1 }),
    'per-page': Flags.integer({ description: 'Records per page (max 200)', default: 200 }),
  }

  async run(): Promise<void> {
    const { args, flags } = this

    try {
      const params: Record<string, string> = {
        page: String(flags.page),
        per_page: String(flags['per-page']),
      }

      const { data } = await this.apiClient.get(`/${args.module}/${args.id}/timeline`, { params })

      this.outputSuccess(data.data ?? data, {
        module: args.module,
        action: 'timeline',
        page: flags.page,
        perPage: flags['per-page'],
      })
    } catch (error: any) {
      this.handleApiError(error)
    }
  }
}
