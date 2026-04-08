import { Args } from '@oclif/core'
import { ExpenseBaseCommand } from '../../../expense-base-command.js'

export default class ExpenseCategoriesGet extends ExpenseBaseCommand<typeof ExpenseCategoriesGet> {
  static id = 'expense categories get'
  static summary = 'Get an expense category by ID'

  static args = {
    id: Args.string({ description: 'Expense category ID', required: true }),
  }

  async run(): Promise<void> {
    const { args } = this
    try {
      const data = await this.expenseGet(`/expensecategories/${args.id}`)
      this.outputSuccess(data.expense_category ?? data, { action: 'expense.categories.get' })
    } catch (error: any) {
      this.handleApiError(error)
    }
  }
}
