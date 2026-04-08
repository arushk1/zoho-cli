import { Args, Flags } from '@oclif/core'
import { writeFile } from 'node:fs/promises'
import { CrmBaseCommand } from '../../../crm-base-command.js'

export default class CrmAttachmentsDownload extends CrmBaseCommand<typeof CrmAttachmentsDownload> {
  static id = 'crm attachments download'
  static summary = 'Download an attachment from a record'
  static examples = [
    'zoho crm attachments download Leads 5437280000000328001 9876543210000000001 -o ./downloaded.pdf',
  ]

  static args = {
    module: Args.string({ description: 'CRM module API name (e.g., Leads, Contacts, Deals)', required: true }),
    recordId: Args.string({ description: 'Record ID', required: true }),
    attachmentId: Args.string({ description: 'Attachment ID', required: true }),
  }

  static flags = {
    output: Flags.string({ description: 'Output file path', required: true, char: 'o' }),
  }

  async run(): Promise<void> {
    const { args, flags } = this

    try {
      const { data } = await this.apiClient.get(
        `/${args.module}/${args.recordId}/Attachments/${args.attachmentId}`,
        { responseType: 'arraybuffer' },
      )

      await writeFile(flags.output, Buffer.from(data as ArrayBuffer))

      this.outputSuccess({ file: flags.output }, {
        module: args.module,
        action: 'download',
      })
    } catch (error: any) {
      // When responseType is arraybuffer, error response data may need decoding
      if (error.response?.data instanceof ArrayBuffer || Buffer.isBuffer(error.response?.data)) {
        try {
          const text = Buffer.from(error.response.data).toString('utf8')
          const parsed = JSON.parse(text)
          error.response.data = parsed
        } catch {
          // ignore parse errors, let handleApiError handle it
        }
      }
      this.handleApiError(error)
    }
  }
}
