import { Args, Flags } from '@oclif/core'
import { BillingBaseCommand } from '../../../billing-base-command.js'

export default class BillingPlansCreate extends BillingBaseCommand<typeof BillingPlansCreate> {
  static id = 'billing plans create'
  static summary = 'Create a plan'

  static flags = {
    data: Flags.string({ description: 'JSON object with plan fields (plan_code, name, recurring_price, interval, product_id, ...)', required: true, char: 'd' }),
    'dry-run': Flags.boolean({ description: 'Show request without executing', default: false }),
  }

  async run(): Promise<void> {
    const { flags } = this
    try {
      const body = JSON.parse(flags.data)
      if (flags['dry-run']) {
        this.outputSuccess({ dryRun: true, method: 'POST', path: '/plans', body })
        return
      }
      const data = await this.billingPost('/plans', body)
      this.outputSuccess(data.plan ?? data, { action: 'billing.plans.create' })
    } catch (error: any) {
      if (error instanceof SyntaxError) {
        this.outputError('INVALID_JSON', 'Invalid JSON in --data flag')
        this.exit(3)
      }
      this.handleApiError(error)
    }
  }
}
