import { Args, Flags } from '@oclif/core'
import { BillingBaseCommand } from '../../../billing-base-command.js'

export default class BillingPaymentsCreate extends BillingBaseCommand<typeof BillingPaymentsCreate> {
  static id = 'billing payments create'
  static summary = 'Record an offline payment'

  static flags = {
    data: Flags.string({ description: 'JSON object with payment fields (customer_id, amount, payment_mode, invoices, ...)', required: true, char: 'd' }),
    'dry-run': Flags.boolean({ description: 'Show request without executing', default: false }),
  }

  async run(): Promise<void> {
    const { flags } = this
    try {
      const body = JSON.parse(flags.data)
      if (flags['dry-run']) {
        this.outputSuccess({ dryRun: true, method: 'POST', path: '/payments', body })
        return
      }
      const data = await this.billingPost('/payments', body)
      this.outputSuccess(data.payment ?? data, { action: 'billing.payments.create' })
    } catch (error: any) {
      if (error instanceof SyntaxError) {
        this.outputError('INVALID_JSON', 'Invalid JSON in --data flag')
        this.exit(3)
      }
      this.handleApiError(error)
    }
  }
}
