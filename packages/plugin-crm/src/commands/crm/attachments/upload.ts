import { Args, Flags } from '@oclif/core'
import { createReadStream } from 'node:fs'
import FormData from 'form-data'
import { CrmBaseCommand } from '../../../crm-base-command.js'

export default class CrmAttachmentsUpload extends CrmBaseCommand<typeof CrmAttachmentsUpload> {
  static id = 'crm attachments upload'
  static summary = 'Upload an attachment to a record'
  static examples = [
    'zoho crm attachments upload Leads 5437280000000328001 --file ./proposal.pdf',
  ]

  static args = {
    module: Args.string({ description: 'CRM module API name (e.g., Leads, Contacts, Deals)', required: true }),
    id: Args.string({ description: 'Record ID', required: true }),
  }

  static flags = {
    file: Flags.string({ description: 'Path to file to upload', required: true, char: 'f' }),
    'dry-run': Flags.boolean({ description: 'Print request without executing', default: false }),
  }

  async run(): Promise<void> {
    const { args, flags } = this

    try {
      if (flags['dry-run']) {
        this.outputSuccess({ file: flags.file }, { module: args.module, action: 'upload.dry-run' })
        return
      }

      const form = new FormData()
      form.append('file', createReadStream(flags.file))

      const { data } = await this.apiClient.post(
        `/${args.module}/${args.id}/Attachments`,
        form,
        {
          headers: form.getHeaders(),
        },
      )

      this.outputSuccess(data.data?.[0] ?? data, {
        module: args.module,
        action: 'upload',
      })
    } catch (error: any) {
      this.handleApiError(error)
    }
  }
}
