import { Flags } from '@oclif/core'
import { CrmBaseCommand } from '../../../crm-base-command.js'

export default class CrmNotificationsDisable extends CrmBaseCommand<typeof CrmNotificationsDisable> {
  static id = 'crm notifications disable'
  static summary = 'Disable notification watches by channel IDs'
  static examples = [
    'zoho crm notifications disable --channel-ids 1000000068001',
    'zoho crm notifications disable --channel-ids 1000000068001,1000000068002',
  ]

  static flags = {
    'channel-ids': Flags.string({ description: 'Comma-separated channel IDs to disable', required: true }),
    'dry-run': Flags.boolean({ description: 'Show request without executing', default: false }),
  }

  async run(): Promise<void> {
    const { flags } = this

    try {
      const channelIds = flags['channel-ids'].split(',').map((id) => id.trim())
      const body = { watch: channelIds.map((id) => ({ channel_id: id })) }

      if (flags['dry-run']) {
        this.outputSuccess({ dryRun: true, method: 'PATCH', path: '/actions/watch', body })
        return
      }

      const { data } = await this.apiClient.patch('/actions/watch', body)

      this.outputSuccess(data.watch ?? data, {
        action: 'notifications.disable',
      })
    } catch (error: any) {
      this.handleApiError(error)
    }
  }
}
