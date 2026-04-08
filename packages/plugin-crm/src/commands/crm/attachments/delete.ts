import { Args } from '@oclif/core'
import { CrmBaseCommand } from '../../../crm-base-command.js'

export default class CrmAttachmentsDelete extends CrmBaseCommand<typeof CrmAttachmentsDelete> {
  static id = 'crm attachments delete'
  static summary = 'Delete an attachment from a record'
  static examples = [
    'zoho crm attachments delete Leads 5437280000000328001 9876543210000000001',
  ]

  static args = {
    module: Args.string({ description: 'CRM module API name (e.g., Leads, Contacts, Deals)', required: true }),
    recordId: Args.string({ description: 'Record ID', required: true }),
    attachmentId: Args.string({ description: 'Attachment ID', required: true }),
  }

  async run(): Promise<void> {
    const { args } = this

    try {
      const { data } = await this.apiClient.delete(
        `/${args.module}/${args.recordId}/Attachments/${args.attachmentId}`,
      )

      this.outputSuccess(data.data?.[0] ?? data, {
        module: args.module,
        action: 'delete',
      })
    } catch (error: any) {
      this.handleApiError(error)
    }
  }
}
