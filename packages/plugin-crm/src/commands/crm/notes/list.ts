import { Args, Flags } from '@oclif/core'
import { CrmBaseCommand } from '../../../crm-base-command.js'

export default class CrmNotesList extends CrmBaseCommand<typeof CrmNotesList> {
  static id = 'crm notes list'
  static summary = 'List notes for a record'
  static examples = [
    'zoho crm notes list Leads 5437280000000328001',
    'zoho crm notes list Contacts 5437280000000328001 --page 2',
  ]

  static args = {
    module: Args.string({ description: 'CRM module API name (e.g., Leads, Contacts, Deals)', required: true }),
    id: Args.string({ description: 'Record ID', required: true }),
  }

  static flags = {
    page: Flags.integer({ description: 'Page number', default: 1 }),
    'per-page': Flags.integer({ description: 'Notes per page (max 200)', default: 200 }),
  }

  async run(): Promise<void> {
    const { args, flags } = this

    try {
      const params: Record<string, string> = {
        page: String(flags.page),
        per_page: String(flags['per-page']),
        fields: 'id,Note_Title,Note_Content,Created_Time,Modified_Time,Created_By,Owner,Parent_Id',
      }

      const { data } = await this.apiClient.get(`/${args.module}/${args.id}/Notes`, { params })

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
