import { Args, Flags } from '@oclif/core'
import { PaymentsBaseCommand } from '../../../payments-base-command.js'

export default class PayPayoutsList extends PaymentsBaseCommand<typeof PayPayoutsList> {
  static id = 'payments payouts list'
  static summary = 'List payouts'

  static flags = {
    'status': Flags.string({ description: 'Filter by status (Status.All|Initiated|Paid|Failed)' }),
    'filter-by': Flags.string({ description: 'Date filter (PayoutDate.*, incl. CustomDate with --from-date/--to-date)' }),
    'from-date': Flags.string({ description: 'Start date YYYY-MM-DD' }),
    'to-date': Flags.string({ description: 'End date YYYY-MM-DD' }),
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

      const data = await this.paymentsGet('/payouts', params)
      this.outputSuccess(data.payouts ?? [], {
        action: 'payments.payouts.list',
        page: flags.page,
        perPage: flags['per-page'],
        count: data.payouts?.length ?? 0,
      })
    } catch (error: any) {
      this.handleApiError(error)
    }
  }
}
