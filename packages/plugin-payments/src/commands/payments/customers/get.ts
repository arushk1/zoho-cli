import { Args, Flags } from '@oclif/core'
import { PaymentsBaseCommand } from '../../../payments-base-command.js'

export default class PayCustomersGet extends PaymentsBaseCommand<typeof PayCustomersGet> {
  static id = 'payments customers get'
  static summary = 'Get a customer'

  static args = {
    id: Args.string({ description: 'Customer ID', required: true }),
  }

  async run(): Promise<void> {
    const { args } = this
    try {
      const data = await this.paymentsGet(`/customers/${args.id}`)
      this.outputSuccess(data.customer ?? data, { action: 'payments.customers.get' })
    } catch (error: any) {
      this.handleApiError(error)
    }
  }
}
