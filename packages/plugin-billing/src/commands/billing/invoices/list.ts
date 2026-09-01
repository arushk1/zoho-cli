import { Args, Flags } from '@oclif/core'
import { BillingBaseCommand } from '../../../billing-base-command.js'

export default class BillingInvoicesList extends BillingBaseCommand<typeof BillingInvoicesList> {
  static id = 'billing invoices list'
  static summary = 'List invoices'

  static flags = {
    'customer-id': Flags.string({ description: 'Filter by customer ID' }),
    'subscription-id': Flags.string({ description: 'Filter by subscription ID' }),
    'filter-by': Flags.string({ description: 'Filter by status (e.g. Status.Paid, Status.Unpaid, Status.Overdue)' }),
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
      if (flags['subscription-id']) params.subscription_id = flags['subscription-id']
      if (flags['filter-by']) params.filter_by = flags['filter-by']

      const data = await this.billingGet('/invoices', params)
      this.outputSuccess(data.invoices ?? [], {
        action: 'billing.invoices.list',
        page: flags.page,
        perPage: flags['per-page'],
        hasMore: data.page_context?.has_more_page ?? false,
        count: data.invoices?.length ?? 0,
      })
    } catch (error: any) {
      this.handleApiError(error)
    }
  }
}
