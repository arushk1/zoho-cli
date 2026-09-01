import { Args, Flags } from '@oclif/core'
import { BillingBaseCommand } from '../../../billing-base-command.js'

export default class BillingCreditNotesCreate extends BillingBaseCommand<typeof BillingCreditNotesCreate> {
  static id = 'billing credit-notes create'
  static summary = 'Create a credit note'

  static flags = {
    data: Flags.string({ description: 'JSON object with credit note fields (customer_id, invoice_id, line_items, ...)', required: true, char: 'd' }),
    'dry-run': Flags.boolean({ description: 'Show request without executing', default: false }),
  }

  async run(): Promise<void> {
    const { flags } = this
    try {
      const body = JSON.parse(flags.data)
      if (flags['dry-run']) {
        this.outputSuccess({ dryRun: true, method: 'POST', path: '/creditnotes', body })
        return
      }
      const data = await this.billingPost('/creditnotes', body)
      this.outputSuccess(data.creditnote ?? data, { action: 'billing.credit-notes.create' })
    } catch (error: any) {
      if (error instanceof SyntaxError) {
        this.outputError('INVALID_JSON', 'Invalid JSON in --data flag')
        this.exit(3)
      }
      this.handleApiError(error)
    }
  }
}
