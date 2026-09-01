import { Args, Flags } from '@oclif/core'
import { BillingBaseCommand } from '../../../billing-base-command.js'

export default class BillingHostedPagesGet extends BillingBaseCommand<typeof BillingHostedPagesGet> {
  static id = 'billing hosted-pages get'
  static summary = 'Get a hosted page (includes status and URL)'

  static args = {
    id: Args.string({ description: 'Hosted page ID', required: true }),
  }

  async run(): Promise<void> {
    const { args } = this
    try {
      const data = await this.billingGet(`/hostedpages/${args.id}`)
      this.outputSuccess(data.hostedpage ?? data, { action: 'billing.hosted-pages.get' })
    } catch (error: any) {
      this.handleApiError(error)
    }
  }
}
