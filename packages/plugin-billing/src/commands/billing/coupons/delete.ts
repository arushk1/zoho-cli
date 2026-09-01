import { Args, Flags } from '@oclif/core'
import { BillingBaseCommand } from '../../../billing-base-command.js'

export default class BillingCouponsDelete extends BillingBaseCommand<typeof BillingCouponsDelete> {
  static id = 'billing coupons delete'
  static summary = 'Delete a coupon'

  static args = {
    id: Args.string({ description: 'Coupon code', required: true }),
  }

  static flags = {
    'dry-run': Flags.boolean({ description: 'Show request without executing', default: false }),
  }

  async run(): Promise<void> {
    const { args, flags } = this
    try {
      if (flags['dry-run']) {
        this.outputSuccess({ dryRun: true, method: 'DELETE', path: `/coupons/${args.id}` })
        return
      }
      const data = await this.billingDelete(`/coupons/${args.id}`)
      this.outputSuccess(data, { action: 'billing.coupons.delete' })
    } catch (error: any) {
      this.handleApiError(error)
    }
  }
}
