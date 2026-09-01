import { Args, Flags } from '@oclif/core'
import { BillingBaseCommand } from '../../../billing-base-command.js'

export default class BillingCouponsGet extends BillingBaseCommand<typeof BillingCouponsGet> {
  static id = 'billing coupons get'
  static summary = 'Get a coupon by coupon code'

  static args = {
    id: Args.string({ description: 'Coupon code', required: true }),
  }

  async run(): Promise<void> {
    const { args } = this
    try {
      const data = await this.billingGet(`/coupons/${args.id}`)
      this.outputSuccess(data.coupon ?? data, { action: 'billing.coupons.get' })
    } catch (error: any) {
      this.handleApiError(error)
    }
  }
}
