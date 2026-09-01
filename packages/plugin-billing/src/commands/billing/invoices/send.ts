import { Args, Flags } from '@oclif/core'
import { BillingBaseCommand } from '../../../billing-base-command.js'

export default class BillingInvoicesSend extends BillingBaseCommand<typeof BillingInvoicesSend> {
  static id = 'billing invoices send'
  static summary = 'Email an invoice to the customer'

  static args = {
    id: Args.string({ description: 'Invoice ID', required: true }),
  }

  static flags = {
    data: Flags.string({ description: 'Optional JSON body', char: 'd' }),
    'dry-run': Flags.boolean({ description: 'Show request without executing', default: false }),
  }

  async run(): Promise<void> {
    const { args, flags } = this
    try {
      const body = flags.data ? JSON.parse(flags.data) : undefined
      if (flags['dry-run']) {
        this.outputSuccess({ dryRun: true, method: 'POST', path: `/invoices/${args.id}/email`, body })
        return
      }
      const data = await this.billingPost(`/invoices/${args.id}/email`, body)
      this.outputSuccess(data.invoice ?? data, { action: 'billing.invoices.send' })
    } catch (error: any) {
      if (error instanceof SyntaxError) {
        this.outputError('INVALID_JSON', 'Invalid JSON in --data flag')
        this.exit(3)
      }
      this.handleApiError(error)
    }
  }
}
