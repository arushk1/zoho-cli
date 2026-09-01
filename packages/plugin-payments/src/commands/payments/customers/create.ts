import { Args, Flags } from '@oclif/core'
import { PaymentsBaseCommand } from '../../../payments-base-command.js'

export default class PayCustomersCreate extends PaymentsBaseCommand<typeof PayCustomersCreate> {
  static id = 'payments customers create'
  static summary = 'Create a customer'

  static flags = {
    data: Flags.string({ description: 'JSON object with customer fields (name, email, phone, phone_country_code, meta_data)', required: true, char: 'd' }),
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
      const data = await this.paymentsPost('/customers', body)
      this.outputSuccess(data.customer ?? data, { action: 'payments.customers.create' })
    } catch (error: any) {
      if (error instanceof SyntaxError) {
        this.outputError('INVALID_JSON', 'Invalid JSON in --data flag')
        this.exit(3)
      }
      this.handleApiError(error)
    }
  }
}
