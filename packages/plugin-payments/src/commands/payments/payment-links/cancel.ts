import { Args, Flags } from '@oclif/core'
import { PaymentsBaseCommand } from '../../../payments-base-command.js'

export default class PayPaymentLinksCancel extends PaymentsBaseCommand<typeof PayPaymentLinksCancel> {
  static id = 'payments payment-links cancel'
  static summary = 'Cancel a payment link'

  static args = {
    id: Args.string({ description: 'Payment link ID', required: true }),
  }

  static flags = {
    'dry-run': Flags.boolean({ description: 'Show request without executing', default: false }),
  }

  async run(): Promise<void> {
    const { args, flags } = this
    try {
      const body = undefined
      if (flags['dry-run']) {
        this.outputSuccess({ dryRun: true, method: 'PUT', path: `/paymentlinks/${args.id}/cancel`, body })
        return
      }
      const data = await this.paymentsPut(`/paymentlinks/${args.id}/cancel`, body)
      this.outputSuccess(data.payment_links ?? data, { action: 'payments.payment-links.cancel' })
    } catch (error: any) {
      if (error instanceof SyntaxError) {
        this.outputError('INVALID_JSON', 'Invalid JSON in --data flag')
        this.exit(3)
      }
      this.handleApiError(error)
    }
  }
}
