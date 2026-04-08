import { Args } from '@oclif/core'
import { ExpenseBaseCommand } from '../../../expense-base-command.js'

export default class ExpenseReportsGet extends ExpenseBaseCommand<typeof ExpenseReportsGet> {
  static id = 'expense reports get'
  static summary = 'Get an expense report by ID'

  static args = {
    id: Args.string({ description: 'Expense report ID', required: true }),
  }

  async run(): Promise<void> {
    const { args } = this
    try {
      const data = await this.expenseGet(`/expensereports/${args.id}`)
      this.outputSuccess(data.expense_report ?? data, { action: 'expense.reports.get' })
    } catch (error: any) {
      this.handleApiError(error)
    }
  }
}
