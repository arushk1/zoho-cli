import { Args, Flags } from '@oclif/core'
import { CrmBaseCommand } from '../../../crm-base-command.js'

export default class CrmRecordsList extends CrmBaseCommand<typeof CrmRecordsList> {
  static id = 'crm records list'
  static summary = 'List records from a CRM module'
  static examples = [
    'zoho crm records list Leads',
    'zoho crm records list Contacts --fields Email,Last_Name --page 2',
  ]

  static args = {
    module: Args.string({ description: 'CRM module API name (e.g., Leads, Contacts, Deals)', required: true }),
  }

  static flags = {
    fields: Flags.string({ description: 'Comma-separated field API names to return', char: 'f' }),
    'sort-by': Flags.string({ description: 'Field to sort by' }),
    'sort-order': Flags.string({ description: 'Sort order', options: ['asc', 'desc'] }),
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
      if (flags.fields) params.fields = flags.fields
      if (flags['sort-by']) params.sort_by = flags['sort-by']
      if (flags['sort-order']) params.sort_order = flags['sort-order']

      const { data } = await this.apiClient.get(`/${args.module}`, { params })

      this.outputSuccess(data.data ?? [], {
        module: args.module,
        action: 'list',
        page: flags.page,
        perPage: flags['per-page'],
        hasMore: data.info?.more_records ?? false,
        count: data.data?.length ?? 0,
      })
    } catch (error: any) {
      this.handleApiError(error)
    }
  }
}
