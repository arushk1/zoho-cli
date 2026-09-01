import { Args, Flags } from '@oclif/core'
import { BillingBaseCommand } from '../../../billing-base-command.js'

export default class BillingCreditNotesApply extends BillingBaseCommand<typeof BillingCreditNotesApply> {
  static id = 'billing credit-notes apply'
  static summary = 'Apply a credit note to invoices (--data with {invoices: [{invoice_id, amount_applied}]})'

  static args = {
    id: Args.string({ description: 'Credit note ID', required: true }),
  }

  static flags = {
    data: Flags.string({ description: 'Optional JSON body', char: 'd' }),
    'dry-run': Flags.boolean({ description: 'Show request without executing', default: false }),
  }

  async run(): Promise<void> {
    const { args, flags } = this
    try {
      const body = flags.data ? JSON.parse(flags.data) : undefined
      if (flags['dry-run']) {
        this.outputSuccess({ dryRun: true, method: 'POST', path: `/creditnotes/${args.id}/invoices`, body })
        return
      }
      const data = await this.billingPost(`/creditnotes/${args.id}/invoices`, body)
      this.outputSuccess(data.creditnote ?? data, { action: 'billing.credit-notes.apply' })
    } catch (error: any) {
      if (error instanceof SyntaxError) {
        this.outputError('INVALID_JSON', 'Invalid JSON in --data flag')
        this.exit(3)
      }
      this.handleApiError(error)
    }
  }
}
