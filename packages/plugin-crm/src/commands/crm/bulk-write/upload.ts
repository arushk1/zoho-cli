import { Flags } from '@oclif/core'
import { createReadStream } from 'node:fs'
import FormData from 'form-data'
import { CrmBaseCommand } from '../../../crm-base-command.js'

export default class CrmBulkWriteUpload extends CrmBaseCommand<typeof CrmBulkWriteUpload> {
  static id = 'crm bulk-write upload'
  static summary = 'Upload a ZIP file (containing CSV) for bulk write'
  static examples = [
    'zoho crm bulk-write upload --file ./leads.zip',
    'zoho crm bulk-write upload --file ./leads.zip --org 56xxxx47',
  ]

  static flags = {
    file: Flags.string({ description: 'Path to ZIP file containing CSV data', required: true }),
    org: Flags.string({
      description: 'CRM org ID (zgid). Falls back to config.defaultOrg, ZOHO_DEFAULT_ORG, then /org API',
    }),
    'dry-run': Flags.boolean({ description: 'Preview upload without sending the file', default: false }),
  }

  async run(): Promise<void> {
    const { flags } = this

    try {
      if (flags['dry-run']) {
        this.outputSuccess({ file: flags.file }, { action: 'bulk-write-upload-preview' })
        return
      }

      const orgId = await this.resolveCrmOrgId(flags.org)

      const form = new FormData()
      form.append('file', createReadStream(flags.file))

      const { data } = await this.uploadApiClient.post('/upload', form, {
        headers: {
          ...form.getHeaders(),
          feature: 'bulk-write',
          'X-CRM-ORG': orgId,
        },
      })

      this.outputSuccess(data.details ?? data.data ?? data, {
        action: 'bulk-write-upload',
      })
    } catch (error: any) {
      this.handleApiError(error)
    }
  }
}
