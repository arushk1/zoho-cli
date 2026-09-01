import { Args, Flags } from '@oclif/core'
import { BillingBaseCommand } from '../../../billing-base-command.js'

export default class BillingSubscriptionsGet extends BillingBaseCommand<typeof BillingSubscriptionsGet> {
  static id = 'billing subscriptions get'
  static summary = 'Get a subscription'

  static args = {
    id: Args.string({ description: 'Subscription ID', required: true }),
  }

  async run(): Promise<void> {
    const { args } = this
    try {
      const data = await this.billingGet(`/subscriptions/${args.id}`)
      this.outputSuccess(data.subscription ?? data, { action: 'billing.subscriptions.get' })
    } catch (error: any) {
      this.handleApiError(error)
    }
  }
}
