import { Args, Flags } from '@oclif/core'
import { BillingBaseCommand } from '../../../billing-base-command.js'

export default class BillingCustomersGet extends BillingBaseCommand<typeof BillingCustomersGet> {
  static id = 'billing customers get'
  static summary = 'Get a customer'

  static args = {
    id: Args.string({ description: 'Customer ID', required: true }),
  }

  async run(): Promise<void> {
    const { args } = this
    try {
      const data = await this.billingGet(`/customers/${args.id}`)
      this.outputSuccess(data.customer ?? data, { action: 'billing.customers.get' })
    } catch (error: any) {
      this.handleApiError(error)
    }
  }
}
