import { Args, Flags } from '@oclif/core'
import { BillingBaseCommand } from '../../../billing-base-command.js'

export default class BillingCreditNotesGet extends BillingBaseCommand<typeof BillingCreditNotesGet> {
  static id = 'billing credit-notes get'
  static summary = 'Get a credit note'

  static args = {
    id: Args.string({ description: 'Credit note ID', required: true }),
  }

  async run(): Promise<void> {
    const { args } = this
    try {
      const data = await this.billingGet(`/creditnotes/${args.id}`)
      this.outputSuccess(data.creditnote ?? data, { action: 'billing.credit-notes.get' })
    } catch (error: any) {
      this.handleApiError(error)
    }
  }
}
