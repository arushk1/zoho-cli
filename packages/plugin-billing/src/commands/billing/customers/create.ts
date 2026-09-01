import { Args, Flags } from '@oclif/core'
import { BillingBaseCommand } from '../../../billing-base-command.js'

export default class BillingCustomersCreate extends BillingBaseCommand<typeof BillingCustomersCreate> {
  static id = 'billing customers create'
  static summary = 'Create a customer'

  static flags = {
    data: Flags.string({ description: 'JSON object with customer fields (display_name, email, ...)', required: true, char: 'd' }),
    'dry-run': Flags.boolean({ description: 'Show request without executing', default: false }),
  }

  async run(): Promise<void> {
    const { flags } = this
    try {
      const body = JSON.parse(flags.data)
      if (flags['dry-run']) {
        this.outputSuccess({ dryRun: true, method: 'POST', path: '/customers', body })
        return
      }
      const data = await this.billingPost('/customers', body)
      this.outputSuccess(data.customer ?? data, { action: 'billing.customers.create' })
    } catch (error: any) {
      if (error instanceof SyntaxError) {
        this.outputError('INVALID_JSON', 'Invalid JSON in --data flag')
        this.exit(3)
      }
      this.handleApiError(error)
    }
  }
}
