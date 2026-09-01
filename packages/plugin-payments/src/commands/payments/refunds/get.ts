import { Args, Flags } from '@oclif/core'
import { PaymentsBaseCommand } from '../../../payments-base-command.js'

export default class PayRefundsGet extends PaymentsBaseCommand<typeof PayRefundsGet> {
  static id = 'payments refunds get'
  static summary = 'Get a refund'

  static args = {
    id: Args.string({ description: 'Refund ID', required: true }),
  }

  async run(): Promise<void> {
    const { args } = this
    try {
      const data = await this.paymentsGet(`/refunds/${args.id}`)
      this.outputSuccess(data.refund ?? data, { action: 'payments.refunds.get' })
    } catch (error: any) {
      this.handleApiError(error)
    }
  }
}
