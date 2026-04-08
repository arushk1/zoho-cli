import { Flags } from '@oclif/core'
import { CrmBaseCommand } from '../../../crm-base-command.js'

export default class CrmNotificationsEnable extends CrmBaseCommand<typeof CrmNotificationsEnable> {
  static id = 'crm notifications enable'
  static summary = 'Enable a notification watch'
  static examples = [
    'zoho crm notifications enable -d \'{"channel_id":"1000000068001","events":["Deals.all"],"channel_expiry":"2025-12-31T00:00:00+05:30","notify_url":"https://example.com/webhook"}\'',
  ]

  static flags = {
    data: Flags.string({ description: 'JSON object with notification watch config', required: true, char: 'd' }),
    'dry-run': Flags.boolean({ description: 'Show request without executing', default: false }),
  }

  async run(): Promise<void> {
    const { flags } = this

    try {
      const watchData = JSON.parse(flags.data)
      const body = { watch: [watchData] }

      if (flags['dry-run']) {
        this.outputSuccess({ dryRun: true, method: 'POST', path: '/actions/watch', body })
        return
      }

      const { data } = await this.apiClient.post('/actions/watch', body)

      this.outputSuccess(data.watch?.[0] ?? data, {
        action: 'notifications.enable',
      })
    } catch (error: any) {
      if (error instanceof SyntaxError) {
        this.outputError('INVALID_JSON', 'Invalid JSON in --data flag')
        this.exit(3)
      }
      this.handleApiError(error)
    }
  }
}
