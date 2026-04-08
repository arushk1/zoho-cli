import { Args } from '@oclif/core'
import { CrmBaseCommand } from '../../../crm-base-command.js'

export default class CrmBulkWriteStatus extends CrmBaseCommand<typeof CrmBulkWriteStatus> {
  static id = 'crm bulk-write status'
  static summary = 'Check the status of a bulk write job'
  static examples = [
    'zoho crm bulk-write status 5437280000000328001',
  ]

  static args = {
    jobId: Args.string({ description: 'Bulk write job ID', required: true }),
  }

  async run(): Promise<void> {
    const { args } = this

    try {
      const { data } = await this.apiClient.get(`/write/${args.jobId}`)

      this.outputSuccess(data.data ?? data, {
        action: 'bulk-write-status',
      })
    } catch (error: any) {
      this.handleApiError(error)
    }
  }
}
