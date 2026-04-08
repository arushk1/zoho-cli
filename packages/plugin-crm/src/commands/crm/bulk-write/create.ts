import { Flags } from '@oclif/core'
import { CrmBaseCommand } from '../../../crm-base-command.js'

export default class CrmBulkWriteCreate extends CrmBaseCommand<typeof CrmBulkWriteCreate> {
  static id = 'crm bulk-write create'
  static summary = 'Create a bulk write job'
  static examples = [
    'zoho crm bulk-write create -m Leads --file-id 5437280000000328001',
    'zoho crm bulk-write create -m Contacts --file-id 5437280000000328001 --operation upsert',
  ]

  static flags = {
    module: Flags.string({ description: 'CRM module API name', required: true, char: 'm' }),
    'file-id': Flags.string({ description: 'File ID from bulk-write upload', required: true }),
    operation: Flags.string({
      description: 'Write operation type',
      options: ['insert', 'update', 'upsert'],
      default: 'insert',
    }),
    'dry-run': Flags.boolean({ description: 'Preview the bulk write job without executing', default: false }),
  }

  async run(): Promise<void> {
    const { flags } = this

    try {
      const body = {
        operation: flags.operation,
        resource: [
          {
            type: 'data',
            module: { api_name: flags.module },
            file_id: flags['file-id'],
          },
        ],
      }

      if (flags['dry-run']) {
        this.outputSuccess(body, { module: flags.module, action: 'bulk-write-create-preview' })
        return
      }

      const { data } = await this.apiClient.post('/write', body)

      this.outputSuccess(data.data ?? data, {
        module: flags.module,
        action: 'bulk-write-create',
      })
    } catch (error: any) {
      this.handleApiError(error)
    }
  }
}
