import { Args, Flags } from '@oclif/core'
import { PaymentsBaseCommand } from '../../../payments-base-command.js'

export default class PayPayoutsGet extends PaymentsBaseCommand<typeof PayPayoutsGet> {
  static id = 'payments payouts get'
  static summary = 'Get a payout'

  static args = {
    id: Args.string({ description: 'Payout ID', required: true }),
  }

  async run(): Promise<void> {
    const { args } = this
    try {
      const data = await this.paymentsGet(`/payouts/${args.id}`)
      this.outputSuccess(data.payout ?? data, { action: 'payments.payouts.get' })
    } catch (error: any) {
      this.handleApiError(error)
    }
  }
}
