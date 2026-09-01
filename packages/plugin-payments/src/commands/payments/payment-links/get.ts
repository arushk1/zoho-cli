import { Args, Flags } from '@oclif/core'
import { PaymentsBaseCommand } from '../../../payments-base-command.js'

export default class PayPaymentLinksGet extends PaymentsBaseCommand<typeof PayPaymentLinksGet> {
  static id = 'payments payment-links get'
  static summary = 'Get a payment link'

  static args = {
    id: Args.string({ description: 'Payment link ID', required: true }),
  }

  async run(): Promise<void> {
    const { args } = this
    try {
      const data = await this.paymentsGet(`/paymentlinks/${args.id}`)
      this.outputSuccess(data.payment_links ?? data, { action: 'payments.payment-links.get' })
    } catch (error: any) {
      this.handleApiError(error)
    }
  }
}
