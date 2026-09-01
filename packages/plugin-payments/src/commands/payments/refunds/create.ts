import { Args, Flags } from '@oclif/core'
import { PaymentsBaseCommand } from '../../../payments-base-command.js'

export default class PayRefundsCreate extends PaymentsBaseCommand<typeof PayRefundsCreate> {
  static id = 'payments refunds create'
  static summary = 'Refund a payment (full or partial via --data {"amount": ...})'

  static args = {
    id: Args.string({ description: 'Payment ID to refund', required: true }),
  }

  static flags = {
    data: Flags.string({ description: 'JSON request body', required: true, char: 'd' }),
    'dry-run': Flags.boolean({ description: 'Show request without executing', default: false }),
  }

  async run(): Promise<void> {
    const { args, flags } = this
    try {
      const body = JSON.parse(flags.data)
      if (flags['dry-run']) {
        this.outputSuccess({ dryRun: true, method: 'POST', path: `/payments/${args.id}/refunds`, body })
        return
      }
      const data = await this.paymentsPost(`/payments/${args.id}/refunds`, body)
      this.outputSuccess(data.refund ?? data, { action: 'payments.refunds.create' })
    } catch (error: any) {
      if (error instanceof SyntaxError) {
        this.outputError('INVALID_JSON', 'Invalid JSON in --data flag')
        this.exit(3)
      }
      this.handleApiError(error)
    }
  }
}
