import { Args, Flags } from '@oclif/core'
import { PaymentsBaseCommand } from '../../../payments-base-command.js'

export default class PayPaymentLinksCreate extends PaymentsBaseCommand<typeof PayPaymentLinksCreate> {
  static id = 'payments payment-links create'
  static summary = 'Create a payment link'

  static flags = {
    data: Flags.string({ description: 'JSON object with link fields (amount, currency, email, phone, description, expires_at, ...)', required: true, char: 'd' }),
    'dry-run': Flags.boolean({ description: 'Show request without executing', default: false }),
  }

  async run(): Promise<void> {
    const { flags } = this
    try {
      const body = JSON.parse(flags.data)
      if (flags['dry-run']) {
        this.outputSuccess({ dryRun: true, method: 'POST', path: '/paymentlinks', body })
        return
      }
      const data = await this.paymentsPost('/paymentlinks', body)
      this.outputSuccess(data.payment_links ?? data, { action: 'payments.payment-links.create' })
    } catch (error: any) {
      if (error instanceof SyntaxError) {
        this.outputError('INVALID_JSON', 'Invalid JSON in --data flag')
        this.exit(3)
      }
      this.handleApiError(error)
    }
  }
}
