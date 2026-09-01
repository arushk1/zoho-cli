import { Args, Flags } from '@oclif/core'
import { BillingBaseCommand } from '../../../billing-base-command.js'

export default class BillingCouponsList extends BillingBaseCommand<typeof BillingCouponsList> {
  static id = 'billing coupons list'
  static summary = 'List coupons'

  static flags = {
    page: Flags.integer({ description: 'Page number', default: 1 }),
    'per-page': Flags.integer({ description: 'Results per page', default: 200 }),
  }

  async run(): Promise<void> {
    const { flags } = this
    try {
      const params: Record<string, string> = {
        page: String(flags.page),
        per_page: String(flags['per-page']),
      }

      const data = await this.billingGet('/coupons', params)
      this.outputSuccess(data.coupons ?? [], {
        action: 'billing.coupons.list',
        page: flags.page,
        perPage: flags['per-page'],
        hasMore: data.page_context?.has_more_page ?? false,
        count: data.coupons?.length ?? 0,
      })
    } catch (error: any) {
      this.handleApiError(error)
    }
  }
}
