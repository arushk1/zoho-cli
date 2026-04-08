import { Args, Flags } from '@oclif/core'
import { BooksBaseCommand } from '../../../books-base-command.js'

export default class BooksExpensesDelete extends BooksBaseCommand<typeof BooksExpensesDelete> {
  static id = 'books expenses delete'
  static summary = 'Delete an expense'

  static args = {
    id: Args.string({ description: 'Expense ID', required: true }),
  }

  static flags = {
    'dry-run': Flags.boolean({ description: 'Show request without executing', default: false }),
  }

  async run(): Promise<void> {
    const { args, flags } = this
    try {
      if (flags['dry-run']) {
        this.outputSuccess({ dryRun: true, method: 'DELETE', path: `/expenses/${args.id}` })
        return
      }
      const data = await this.booksDelete(`/expenses/${args.id}`)
      this.outputSuccess(data, { action: 'books.expenses.delete' })
    } catch (error: any) {
      this.handleApiError(error)
    }
  }
}
