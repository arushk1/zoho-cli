import { Flags } from '@oclif/core'
import { ExpenseBaseCommand } from '../../../expense-base-command.js'

export default class ExpenseExpensesList extends ExpenseBaseCommand<typeof ExpenseExpensesList> {
  static id = 'expense expenses list'
  static summary = 'List expenses'

  static flags = {
    status: Flags.string({ description: 'Filter by status' }),
    'user-id': Flags.string({ description: 'Filter by user ID' }),
    'category-id': Flags.string({ description: 'Filter by category ID' }),
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
      if (flags['user-id']) params.user_id = flags['user-id']
      if (flags['category-id']) params.category_id = flags['category-id']

      const data = await this.expenseGet('/reports/expensedetails', params)
      this.outputSuccess(data.expenses ?? [], {
        action: 'expense.expenses.list',
        page: flags.page,
        perPage: flags['per-page'],
        count: data.expenses?.length ?? 0,
      })
    } catch (error: any) {
      this.handleApiError(error)
    }
  }
}
