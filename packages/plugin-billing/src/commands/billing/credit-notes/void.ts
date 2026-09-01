import { Args, Flags } from '@oclif/core'
import { BillingBaseCommand } from '../../../billing-base-command.js'

export default class BillingCreditNotesVoid extends BillingBaseCommand<typeof BillingCreditNotesVoid> {
  static id = 'billing credit-notes void'
  static summary = 'Void a credit note'

  static args = {
    id: Args.string({ description: 'Credit note ID', required: true }),
  }

  static flags = {
    'dry-run': Flags.boolean({ description: 'Show request without executing', default: false }),
  }

  async run(): Promise<void> {
    const { args, flags } = this
    try {
      const body = undefined
      if (flags['dry-run']) {
        this.outputSuccess({ dryRun: true, method: 'POST', path: `/creditnotes/${args.id}/void`, body })
        return
      }
      const data = await this.billingPost(`/creditnotes/${args.id}/void`, body)
      this.outputSuccess(data.creditnote ?? data, { action: 'billing.credit-notes.void' })
    } catch (error: any) {
      if (error instanceof SyntaxError) {
        this.outputError('INVALID_JSON', 'Invalid JSON in --data flag')
        this.exit(3)
      }
      this.handleApiError(error)
    }
  }
}
