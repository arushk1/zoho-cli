import { Args, Flags } from '@oclif/core'
import { PaymentsBaseCommand } from '../../../payments-base-command.js'

export default class PayMandatesNotify extends PaymentsBaseCommand<typeof PayMandatesNotify> {
  static id = 'payments mandates notify'
  static summary = 'Send a pre-debit notification for a mandate'

  static flags = {
    data: Flags.string({ description: 'JSON object (mandate_id, amount, execution_date, description, invoice_number)', required: true, char: 'd' }),
    'dry-run': Flags.boolean({ description: 'Show request without executing', default: false }),
  }

  async run(): Promise<void> {
    const { flags } = this
    try {
      const body = JSON.parse(flags.data)
      if (flags['dry-run']) {
        this.outputSuccess({ dryRun: true, method: 'POST', path: '/mandates/notify', body })
        return
      }
      const data = await this.paymentsPost('/mandates/notify', body)
      this.outputSuccess(data.mandate_notification ?? data, { action: 'payments.mandates.notify' })
    } catch (error: any) {
      if (error instanceof SyntaxError) {
        this.outputError('INVALID_JSON', 'Invalid JSON in --data flag')
        this.exit(3)
      }
      this.handleApiError(error)
    }
  }
}
