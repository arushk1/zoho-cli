import { Args, Flags } from '@oclif/core'
import { BillingBaseCommand } from '../../../billing-base-command.js'

export default class BillingSubscriptionsUpdate extends BillingBaseCommand<typeof BillingSubscriptionsUpdate> {
  static id = 'billing subscriptions update'
  static summary = 'Update a subscription'

  static args = {
    id: Args.string({ description: 'Subscription ID', required: true }),
  }

  static flags = {
    data: Flags.string({ description: 'JSON object with fields to update', required: true, char: 'd' }),
    'dry-run': Flags.boolean({ description: 'Show request without executing', default: false }),
  }

  async run(): Promise<void> {
    const { args, flags } = this
    try {
      const body = JSON.parse(flags.data)
      if (flags['dry-run']) {
        this.outputSuccess({ dryRun: true, method: 'PUT', path: `/subscriptions/${args.id}`, body })
        return
      }
      const data = await this.billingPut(`/subscriptions/${args.id}`, body)
      this.outputSuccess(data.subscription ?? data, { action: 'billing.subscriptions.update' })
    } catch (error: any) {
      if (error instanceof SyntaxError) {
        this.outputError('INVALID_JSON', 'Invalid JSON in --data flag')
        this.exit(3)
      }
      this.handleApiError(error)
    }
  }
}
