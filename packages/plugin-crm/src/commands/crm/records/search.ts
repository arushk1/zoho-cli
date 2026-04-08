import { Args, Flags } from '@oclif/core'
import { CrmBaseCommand } from '../../../crm-base-command.js'

export default class CrmRecordsSearch extends CrmBaseCommand<typeof CrmRecordsSearch> {
  static id = 'crm records search'
  static summary = 'Search records in a CRM module'
  static examples = [
    'zoho crm records search Leads --word "Smith"',
    'zoho crm records search Contacts --email "smith@example.com"',
    'zoho crm records search Deals --criteria "((Stage:equals:Closed Won))"',
  ]

  static args = {
    module: Args.string({ description: 'CRM module API name (e.g., Leads, Contacts, Deals)', required: true }),
  }

  static flags = {
    criteria: Flags.string({ description: 'Search criteria expression' }),
    email: Flags.string({ description: 'Search by email address' }),
    phone: Flags.string({ description: 'Search by phone number' }),
    word: Flags.string({ description: 'Search by keyword' }),
    fields: Flags.string({ description: 'Comma-separated field API names to return', char: 'f' }),
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
      if (flags.criteria) params.criteria = flags.criteria
      if (flags.email) params.email = flags.email
      if (flags.phone) params.phone = flags.phone
      if (flags.word) params.word = flags.word
      if (flags.fields) params.fields = flags.fields

      const { data } = await this.apiClient.get(`/${args.module}/search`, { params })

      this.outputSuccess(data.data ?? [], {
        module: args.module,
        action: 'search',
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
