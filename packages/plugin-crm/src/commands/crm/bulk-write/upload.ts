import { Flags } from '@oclif/core'
import { createReadStream } from 'node:fs'
import FormData from 'form-data'
import { CrmBaseCommand } from '../../../crm-base-command.js'

export default class CrmBulkWriteUpload extends CrmBaseCommand<typeof CrmBulkWriteUpload> {
  static id = 'crm bulk-write upload'
  static summary = 'Upload a CSV file for bulk write'
  static examples = [
    'zoho crm bulk-write upload --file ./leads-import.csv',
  ]

  static flags = {
    file: Flags.string({ description: 'Path to CSV file to upload', required: true }),
    'dry-run': Flags.boolean({ description: 'Preview upload without sending the file', default: false }),
  }

  async run(): Promise<void> {
    const { flags } = this

    try {
      if (flags['dry-run']) {
        this.outputSuccess({ file: flags.file }, { action: 'bulk-write-upload-preview' })
        return
      }

      const form = new FormData()
      form.append('file', createReadStream(flags.file))

      const { data } = await this.apiClient.post('/upload', form, {
        headers: form.getHeaders(),
      })

      this.outputSuccess(data.data ?? data, {
        action: 'bulk-write-upload',
      })
    } catch (error: any) {
      this.handleApiError(error)
    }
  }
}
