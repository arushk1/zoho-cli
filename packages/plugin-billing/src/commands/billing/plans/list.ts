import { Args, Flags } from '@oclif/core'
import { BillingBaseCommand } from '../../../billing-base-command.js'

export default class BillingPlansList extends BillingBaseCommand<typeof BillingPlansList> {
  static id = 'billing plans list'
  static summary = 'List plans'

  static flags = {
    'product-id': Flags.string({ description: 'Filter by product ID' }),
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
      if (flags['product-id']) params.product_id = flags['product-id']

      const data = await this.billingGet('/plans', params)
      this.outputSuccess(data.plans ?? [], {
        action: 'billing.plans.list',
        page: flags.page,
        perPage: flags['per-page'],
        hasMore: data.page_context?.has_more_page ?? false,
        count: data.plans?.length ?? 0,
      })
    } catch (error: any) {
      this.handleApiError(error)
    }
  }
}
