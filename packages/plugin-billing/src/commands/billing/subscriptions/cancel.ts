import { Args, Flags } from '@oclif/core'
import { BillingBaseCommand } from '../../../billing-base-command.js'

export default class BillingSubscriptionsCancel extends BillingBaseCommand<typeof BillingSubscriptionsCancel> {
  static id = 'billing subscriptions cancel'
  static summary = 'Cancel a subscription (immediately, or at the end of the current term with --at-end)'

  static args = {
    id: Args.string({ description: 'Subscription ID', required: true }),
  }

  static flags = {
    'at-end': Flags.boolean({
      description: 'Cancel at the end of the current billing term (status becomes non_renewing) instead of immediately',
      default: false,
    }),
    'dry-run': Flags.boolean({ description: 'Show request without executing', default: false }),
  }

  async run(): Promise<void> {
    const { args, flags } = this
    try {
      const params = { cancel_at_end: String(flags['at-end']) }
      if (flags['dry-run']) {
        this.outputSuccess({ dryRun: true, method: 'POST', path: `/subscriptions/${args.id}/cancel`, params })
        return
      }
      const data = await this.billingPost(`/subscriptions/${args.id}/cancel`, undefined, params)
      this.outputSuccess(data.subscription ?? data, { action: 'billing.subscriptions.cancel' })
    } catch (error: any) {
      this.handleApiError(error)
    }
  }
}
