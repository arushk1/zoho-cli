import { Args, Flags } from '@oclif/core'
import { BillingBaseCommand } from '../../../billing-base-command.js'

export default class BillingInvoicesGet extends BillingBaseCommand<typeof BillingInvoicesGet> {
  static id = 'billing invoices get'
  static summary = 'Get an invoice'

  static args = {
    id: Args.string({ description: 'Invoice ID', required: true }),
  }

  async run(): Promise<void> {
    const { args } = this
    try {
      const data = await this.billingGet(`/invoices/${args.id}`)
      this.outputSuccess(data.invoice ?? data, { action: 'billing.invoices.get' })
    } catch (error: any) {
      this.handleApiError(error)
    }
  }
}
