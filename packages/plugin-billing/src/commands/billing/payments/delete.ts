import { Args, Flags } from '@oclif/core'
import { BillingBaseCommand } from '../../../billing-base-command.js'

export default class BillingPaymentsDelete extends BillingBaseCommand<typeof BillingPaymentsDelete> {
  static id = 'billing payments delete'
  static summary = 'Delete a payment'

  static args = {
    id: Args.string({ description: 'Payment ID', required: true }),
  }

  static flags = {
    'dry-run': Flags.boolean({ description: 'Show request without executing', default: false }),
  }

  async run(): Promise<void> {
    const { args, flags } = this
    try {
      if (flags['dry-run']) {
        this.outputSuccess({ dryRun: true, method: 'DELETE', path: `/payments/${args.id}` })
        return
      }
      const data = await this.billingDelete(`/payments/${args.id}`)
      this.outputSuccess(data, { action: 'billing.payments.delete' })
    } catch (error: any) {
      this.handleApiError(error)
    }
  }
}
