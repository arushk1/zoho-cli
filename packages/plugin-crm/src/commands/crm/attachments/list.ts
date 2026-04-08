import { Args, Flags } from '@oclif/core'
import { CrmBaseCommand } from '../../../crm-base-command.js'

export default class CrmAttachmentsList extends CrmBaseCommand<typeof CrmAttachmentsList> {
  static id = 'crm attachments list'
  static summary = 'List attachments for a record'
  static examples = [
    'zoho crm attachments list Leads 5437280000000328001',
    'zoho crm attachments list Contacts 5437280000000328001 --page 2',
  ]

  static args = {
    module: Args.string({ description: 'CRM module API name (e.g., Leads, Contacts, Deals)', required: true }),
    id: Args.string({ description: 'Record ID', required: true }),
  }

  static flags = {
    page: Flags.integer({ description: 'Page number', default: 1 }),
  }

  async run(): Promise<void> {
    const { args, flags } = this

    try {
      const params: Record<string, string> = {
        page: String(flags.page),
        fields: 'id,File_Name,Size,Created_Time,Modified_Time,Created_By,Type,Category,Owner',
      }

      const { data } = await this.apiClient.get(`/${args.module}/${args.id}/Attachments`, { params })

      this.outputSuccess(data.data ?? [], {
        module: args.module,
        action: 'list',
        page: flags.page,
        hasMore: data.info?.more_records ?? false,
        count: data.data?.length ?? 0,
      })
    } catch (error: any) {
      this.handleApiError(error)
    }
  }
}
