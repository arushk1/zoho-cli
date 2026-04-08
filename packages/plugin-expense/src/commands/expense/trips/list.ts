import { Flags } from '@oclif/core'
import { ExpenseBaseCommand } from '../../../expense-base-command.js'

export default class ExpenseTripsList extends ExpenseBaseCommand<typeof ExpenseTripsList> {
  static id = 'expense trips list'
  static summary = 'List trips'

  static flags = {
    status: Flags.string({
      description: 'Filter by trip status',
      options: ['Submitted', 'Approved', 'Rejected', 'Closed', 'Cancelled'],
    }),
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
      if (flags.status) params.status = flags.status

      const data = await this.expenseGet('/trips', params)
      this.outputSuccess(data.trips ?? [], {
        action: 'expense.trips.list',
        page: flags.page,
        perPage: flags['per-page'],
        count: data.trips?.length ?? 0,
      })
    } catch (error: any) {
      this.handleApiError(error)
    }
  }
}
