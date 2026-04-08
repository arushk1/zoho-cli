import { Args } from '@oclif/core'
import { ExpenseBaseCommand } from '../../../expense-base-command.js'

export default class ExpenseCurrenciesGet extends ExpenseBaseCommand<typeof ExpenseCurrenciesGet> {
  static id = 'expense currencies get'
  static summary = 'Get a currency by ID'

  static args = {
    id: Args.string({ description: 'Currency ID', required: true }),
  }

  async run(): Promise<void> {
    const { args } = this
    try {
      const data = await this.expenseGet(`/settings/currencies/${args.id}`)
      this.outputSuccess(data.currency ?? data, { action: 'expense.currencies.get' })
    } catch (error: any) {
      this.handleApiError(error)
    }
  }
}
