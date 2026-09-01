import { Args, Flags } from '@oclif/core'
import { BillingBaseCommand } from '../../../billing-base-command.js'

export default class BillingCustomersList extends BillingBaseCommand<typeof BillingCustomersList> {
  static id = 'billing customers list'
  static summary = 'List customers'

  static flags = {
    'email': Flags.string({ description: 'Filter by email' }),
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
      if (flags['email']) params.email = flags['email']

      const data = await this.billingGet('/customers', params)
      this.outputSuccess(data.customers ?? [], {
        action: 'billing.customers.list',
        page: flags.page,
        perPage: flags['per-page'],
        hasMore: data.page_context?.has_more_page ?? false,
        count: data.customers?.length ?? 0,
      })
    } catch (error: any) {
      this.handleApiError(error)
    }
  }
}
