import { Args } from '@oclif/core'
import { BooksBaseCommand } from '../../../books-base-command.js'

export default class BooksExpensesGet extends BooksBaseCommand<typeof BooksExpensesGet> {
  static id = 'books expenses get'
  static summary = 'Get an expense by ID'

  static args = {
    id: Args.string({ description: 'Expense ID', required: true }),
  }

  async run(): Promise<void> {
    const { args } = this
    try {
      const data = await this.booksGet(`/expenses/${args.id}`)
      this.outputSuccess(data.expense ?? data, { action: 'books.expenses.get' })
    } catch (error: any) {
      this.handleApiError(error)
    }
  }
}
