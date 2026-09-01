import { Args, Flags } from '@oclif/core'
import { BillingBaseCommand } from '../../../billing-base-command.js'

export default class BillingSubscriptionsCreate extends BillingBaseCommand<typeof BillingSubscriptionsCreate> {
  static id = 'billing subscriptions create'
  static summary = 'Create a subscription (charges via stored card unless offline)'

  static flags = {
    data: Flags.string({ description: 'JSON object with subscription fields (customer_id or customer, plan: {plan_code}, addons, ...)', required: true, char: 'd' }),
    'dry-run': Flags.boolean({ description: 'Show request without executing', default: false }),
  }

  async run(): Promise<void> {
    const { flags } = this
    try {
      const body = JSON.parse(flags.data)
      if (flags['dry-run']) {
        this.outputSuccess({ dryRun: true, method: 'POST', path: '/subscriptions', body })
        return
      }
      const data = await this.billingPost('/subscriptions', body)
      this.outputSuccess(data.subscription ?? data, { action: 'billing.subscriptions.create' })
    } catch (error: any) {
      if (error instanceof SyntaxError) {
        this.outputError('INVALID_JSON', 'Invalid JSON in --data flag')
        this.exit(3)
      }
      this.handleApiError(error)
    }
  }
}
