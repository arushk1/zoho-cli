import { Args, Flags } from '@oclif/core'
import { BillingBaseCommand } from '../../../billing-base-command.js'

export default class BillingPlansGet extends BillingBaseCommand<typeof BillingPlansGet> {
  static id = 'billing plans get'
  static summary = 'Get a plan by plan code'

  static args = {
    id: Args.string({ description: 'Plan code', required: true }),
  }

  async run(): Promise<void> {
    const { args } = this
    try {
      const data = await this.billingGet(`/plans/${args.id}`)
      this.outputSuccess(data.plan ?? data, { action: 'billing.plans.get' })
    } catch (error: any) {
      this.handleApiError(error)
    }
  }
}
