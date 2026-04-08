import { Flags } from '@oclif/core'
import { ExpenseBaseCommand } from '../../../expense-base-command.js'

export default class ExpenseCurrenciesList extends ExpenseBaseCommand<typeof ExpenseCurrenciesList> {
  static id = 'expense currencies list'
  static summary = 'List currencies'

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
      const data = await this.expenseGet('/settings/currencies', params)
      this.outputSuccess(data.currencies ?? [], {
        action: 'expense.currencies.list',
        page: flags.page,
        perPage: flags['per-page'],
        count: data.currencies?.length ?? 0,
      })
    } catch (error: any) {
      this.handleApiError(error)
    }
  }
}
