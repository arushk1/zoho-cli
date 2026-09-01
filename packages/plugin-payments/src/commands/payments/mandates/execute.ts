import { Args, Flags } from '@oclif/core'
import { PaymentsBaseCommand } from '../../../payments-base-command.js'

export default class PayMandatesExecute extends PaymentsBaseCommand<typeof PayMandatesExecute> {
  static id = 'payments mandates execute'
  static summary = 'Execute a mandate charge after notification'

  static flags = {
    data: Flags.string({ description: 'JSON object (customer_id, mandate_id, payments_session_id, amount, mandate_notification_id, ...)', required: true, char: 'd' }),
    'dry-run': Flags.boolean({ description: 'Show request without executing', default: false }),
  }

  async run(): Promise<void> {
    const { flags } = this
    try {
      const body = JSON.parse(flags.data)
      if (flags['dry-run']) {
        this.outputSuccess({ dryRun: true, method: 'POST', path: '/mandates/execute', body })
        return
      }
      const data = await this.paymentsPost('/mandates/execute', body)
      this.outputSuccess(data.payment ?? data, { action: 'payments.mandates.execute' })
    } catch (error: any) {
      if (error instanceof SyntaxError) {
        this.outputError('INVALID_JSON', 'Invalid JSON in --data flag')
        this.exit(3)
      }
      this.handleApiError(error)
    }
  }
}
