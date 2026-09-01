import { Args, Flags } from '@oclif/core'
import { PaymentsBaseCommand } from '../../payments-base-command.js'

export default class PayGet extends PaymentsBaseCommand<typeof PayGet> {
  static id = 'payments get'
  static summary = 'Get a payment'

  static args = {
    id: Args.string({ description: 'Payment ID', required: true }),
  }

  async run(): Promise<void> {
    const { args } = this
    try {
      const data = await this.paymentsGet(`/payments/${args.id}`)
      this.outputSuccess(data.payment ?? data, { action: 'payments.get' })
    } catch (error: any) {
      this.handleApiError(error)
    }
  }
}
