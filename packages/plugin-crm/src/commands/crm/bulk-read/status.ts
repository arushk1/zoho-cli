import { Args } from '@oclif/core'
import { CrmBaseCommand } from '../../../crm-base-command.js'

export default class CrmBulkReadStatus extends CrmBaseCommand<typeof CrmBulkReadStatus> {
  static id = 'crm bulk-read status'
  static summary = 'Check the status of a bulk read job'
  static examples = [
    'zoho crm bulk-read status 5437280000000328001',
  ]

  static args = {
    jobId: Args.string({ description: 'Bulk read job ID', required: true }),
  }

  async run(): Promise<void> {
    const { args } = this

    try {
      const { data } = await this.apiClient.get(`/read/${args.jobId}`)

      this.outputSuccess(data.data ?? data, {
        action: 'bulk-read-status',
      })
    } catch (error: any) {
      this.handleApiError(error)
    }
  }
}
