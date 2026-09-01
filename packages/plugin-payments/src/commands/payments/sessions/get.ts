import { Args, Flags } from '@oclif/core'
import { PaymentsBaseCommand } from '../../../payments-base-command.js'

export default class PaySessionsGet extends PaymentsBaseCommand<typeof PaySessionsGet> {
  static id = 'payments sessions get'
  static summary = 'Get a payment session'

  static args = {
    id: Args.string({ description: 'Payment session ID', required: true }),
  }

  async run(): Promise<void> {
    const { args } = this
    try {
      const data = await this.paymentsGet(`/paymentsessions/${args.id}`)
      this.outputSuccess(data.payments_session ?? data, { action: 'payments.sessions.get' })
    } catch (error: any) {
      this.handleApiError(error)
    }
  }
}
