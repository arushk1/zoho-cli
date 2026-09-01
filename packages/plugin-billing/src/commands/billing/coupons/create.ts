import { Args, Flags } from '@oclif/core'
import { BillingBaseCommand } from '../../../billing-base-command.js'

export default class BillingCouponsCreate extends BillingBaseCommand<typeof BillingCouponsCreate> {
  static id = 'billing coupons create'
  static summary = 'Create a coupon'

  static flags = {
    data: Flags.string({ description: 'JSON object with coupon fields (coupon_code, name, type, discount_by, discount_value, ...)', required: true, char: 'd' }),
    'dry-run': Flags.boolean({ description: 'Show request without executing', default: false }),
  }

  async run(): Promise<void> {
    const { flags } = this
    try {
      const body = JSON.parse(flags.data)
      if (flags['dry-run']) {
        this.outputSuccess({ dryRun: true, method: 'POST', path: '/coupons', body })
        return
      }
      const data = await this.billingPost('/coupons', body)
      this.outputSuccess(data.coupon ?? data, { action: 'billing.coupons.create' })
    } catch (error: any) {
      if (error instanceof SyntaxError) {
        this.outputError('INVALID_JSON', 'Invalid JSON in --data flag')
        this.exit(3)
      }
      this.handleApiError(error)
    }
  }
}
