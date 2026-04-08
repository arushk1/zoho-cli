import { Args, Flags } from '@oclif/core'
import { CrmBaseCommand } from '../../../crm-base-command.js'

export default class CrmRecordsDeleted extends CrmBaseCommand<typeof CrmRecordsDeleted> {
  static id = 'crm records deleted'
  static summary = 'List deleted records from a module'
  static examples = [
    'zoho crm records deleted Leads',
    'zoho crm records deleted Contacts --type recycle --page 2',
  ]

  static args = {
    module: Args.string({ description: 'CRM module API name (e.g., Leads, Contacts, Deals)', required: true }),
  }

  static flags = {
    type: Flags.string({ description: 'Type of deleted records', options: ['all', 'recycle', 'permanent'], default: 'all' }),
    page: Flags.integer({ description: 'Page number', default: 1 }),
    'per-page': Flags.integer({ description: 'Records per page (max 200)', default: 200 }),
  }

  async run(): Promise<void> {
    const { args, flags } = this

    try {
      const params: Record<string, string> = {
        type: flags.type!,
        page: String(flags.page),
        per_page: String(flags['per-page']),
      }

      const { data } = await this.apiClient.get(`/${args.module}/deleted`, { params })

      this.outputSuccess(data.data ?? [], {
        module: args.module,
        action: 'deleted',
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
