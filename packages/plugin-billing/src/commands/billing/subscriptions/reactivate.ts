import { Args, Flags } from '@oclif/core'
import { BillingBaseCommand } from '../../../billing-base-command.js'

export default class BillingSubscriptionsReactivate extends BillingBaseCommand<typeof BillingSubscriptionsReactivate> {
  static id = 'billing subscriptions reactivate'
  static summary = 'Reactivate a cancelled subscription'

  static args = {
    id: Args.string({ description: 'Subscription ID', required: true }),
  }

  static flags = {
    'dry-run': Flags.boolean({ description: 'Show request without executing', default: false }),
  }

  async run(): Promise<void> {
    const { args, flags } = this
    try {
      const body = undefined
      if (flags['dry-run']) {
        this.outputSuccess({ dryRun: true, method: 'POST', path: `/subscriptions/${args.id}/reactivate`, body })
        return
      }
      const data = await this.billingPost(`/subscriptions/${args.id}/reactivate`, body)
      this.outputSuccess(data.subscription ?? data, { action: 'billing.subscriptions.reactivate' })
    } catch (error: any) {
      if (error instanceof SyntaxError) {
        this.outputError('INVALID_JSON', 'Invalid JSON in --data flag')
        this.exit(3)
      }
      this.handleApiError(error)
    }
  }
}
