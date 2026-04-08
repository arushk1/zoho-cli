import { Flags } from '@oclif/core'
import { ExpenseBaseCommand } from '../../../expense-base-command.js'

export default class ExpenseCategoriesList extends ExpenseBaseCommand<typeof ExpenseCategoriesList> {
  static id = 'expense categories list'
  static summary = 'List expense categories'

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
      const data = await this.expenseGet('/expensecategories', params)
      this.outputSuccess(data.expense_accounts ?? [], {
        action: 'expense.categories.list',
        page: flags.page,
        perPage: flags['per-page'],
        count: data.expense_accounts?.length ?? 0,
      })
    } catch (error: any) {
      this.handleApiError(error)
    }
  }
}
