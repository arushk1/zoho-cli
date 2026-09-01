import { Args, Flags } from '@oclif/core'
import { BillingBaseCommand } from '../../../billing-base-command.js'

export default class BillingSubscriptionsList extends BillingBaseCommand<typeof BillingSubscriptionsList> {
  static id = 'billing subscriptions list'
  static summary = 'List subscriptions'

  static flags = {
    'customer-id': Flags.string({ description: 'Filter by customer ID' }),
    'filter-by': Flags.string({ description: 'Filter by status (e.g. SubscriptionStatus.ACTIVE, SubscriptionStatus.CANCELLED)' }),
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
      if (flags['customer-id']) params.customer_id = flags['customer-id']
      if (flags['filter-by']) params.filter_by = flags['filter-by']

      const data = await this.billingGet('/subscriptions', params)
      this.outputSuccess(data.subscriptions ?? [], {
        action: 'billing.subscriptions.list',
        page: flags.page,
        perPage: flags['per-page'],
        hasMore: data.page_context?.has_more_page ?? false,
        count: data.subscriptions?.length ?? 0,
      })
    } catch (error: any) {
      this.handleApiError(error)
    }
  }
}
