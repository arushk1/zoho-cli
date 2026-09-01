import { Args, Flags } from '@oclif/core'
import { BillingBaseCommand } from '../../../billing-base-command.js'

export default class BillingInvoicesWriteOff extends BillingBaseCommand<typeof BillingInvoicesWriteOff> {
  static id = 'billing invoices write-off'
  static summary = 'Write off an invoice'

  static args = {
    id: Args.string({ description: 'Invoice ID', required: true }),
  }

  static flags = {
    'dry-run': Flags.boolean({ description: 'Show request without executing', default: false }),
  }

  async run(): Promise<void> {
    const { args, flags } = this
    try {
      const body = undefined
      if (flags['dry-run']) {
        this.outputSuccess({ dryRun: true, method: 'POST', path: `/invoices/${args.id}/writeoff`, body })
        return
      }
      const data = await this.billingPost(`/invoices/${args.id}/writeoff`, body)
      this.outputSuccess(data.invoice ?? data, { action: 'billing.invoices.write-off' })
    } catch (error: any) {
      if (error instanceof SyntaxError) {
        this.outputError('INVALID_JSON', 'Invalid JSON in --data flag')
        this.exit(3)
      }
      this.handleApiError(error)
    }
  }
}
