import { Args, Flags } from '@oclif/core'
import { PaymentsBaseCommand } from '../../../payments-base-command.js'

export default class PaySessionsCreate extends PaymentsBaseCommand<typeof PaySessionsCreate> {
  static id = 'payments sessions create'
  static summary = 'Create a payment session (powers the browser checkout widget)'

  static flags = {
    data: Flags.string({ description: 'JSON object (amount, currency, description required; expires_in, invoice_number, meta_data, ...)', required: true, char: 'd' }),
    'dry-run': Flags.boolean({ description: 'Show request without executing', default: false }),
  }

  async run(): Promise<void> {
    const { flags } = this
    try {
      const body = JSON.parse(flags.data)
      if (flags['dry-run']) {
        this.outputSuccess({ dryRun: true, method: 'POST', path: '/paymentsessions', body })
        return
      }
      const data = await this.paymentsPost('/paymentsessions', body)
      this.outputSuccess(data.payments_session ?? data, { action: 'payments.sessions.create' })
    } catch (error: any) {
      if (error instanceof SyntaxError) {
        this.outputError('INVALID_JSON', 'Invalid JSON in --data flag')
        this.exit(3)
      }
      this.handleApiError(error)
    }
  }
}
