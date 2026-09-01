import { Args, Flags } from '@oclif/core'
import { PaymentsBaseCommand } from '../../payments-base-command.js'

export default class PayList extends PaymentsBaseCommand<typeof PayList> {
  static id = 'payments list'
  static summary = 'List payments'

  static flags = {
    'status': Flags.string({ description: 'Filter by status (Status.All|Failed|Succeeded|Cancelled|Refunded|Disputed)' }),
    'filter-by': Flags.string({ description: 'Date filter (ChargeDate.Today|ThisMonth|ThisYear|PreviousMonth|PreviousYear|Last_30_Days|CustomDate)' }),
    'from-date': Flags.string({ description: 'Start date YYYY-MM-DD (required with ChargeDate.CustomDate)' }),
    'to-date': Flags.string({ description: 'End date YYYY-MM-DD (required with ChargeDate.CustomDate)' }),
    'search-text': Flags.string({ description: 'Free-text search' }),
    'payment-method-type': Flags.string({ description: 'Filter by method (all|upi|card|bank_transfer|net_banking)' }),
    page: Flags.integer({ description: 'Page number', default: 1 }),
    'per-page': Flags.integer({ description: 'Results per page (max 200)', default: 25 }),
  }

  async run(): Promise<void> {
    const { flags } = this
    try {
      const params: Record<string, string> = {
        page: String(flags.page),
        per_page: String(flags['per-page']),
      }
      if (flags['status']) params.status = flags['status']
      if (flags['filter-by']) params.filter_by = flags['filter-by']
      if (flags['from-date']) params.from_date = flags['from-date']
      if (flags['to-date']) params.to_date = flags['to-date']
      if (flags['search-text']) params.search_text = flags['search-text']
      if (flags['payment-method-type']) params.payment_method_type = flags['payment-method-type']

      const data = await this.paymentsGet('/payments', params)
      this.outputSuccess(data.payments ?? [], {
        action: 'payments.list',
        page: flags.page,
        perPage: flags['per-page'],
        count: data.payments?.length ?? 0,
      })
    } catch (error: any) {
      this.handleApiError(error)
    }
  }
}
