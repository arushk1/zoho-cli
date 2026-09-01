import { Args, Flags } from '@oclif/core'
import { BillingBaseCommand } from '../../../billing-base-command.js'

export default class BillingPaymentsGet extends BillingBaseCommand<typeof BillingPaymentsGet> {
  static id = 'billing payments get'
  static summary = 'Get a payment'

  static args = {
    id: Args.string({ description: 'Payment ID', required: true }),
  }

  async run(): Promise<void> {
    const { args } = this
    try {
      const data = await this.billingGet(`/payments/${args.id}`)
      this.outputSuccess(data.payment ?? data, { action: 'billing.payments.get' })
    } catch (error: any) {
      this.handleApiError(error)
    }
  }
}
