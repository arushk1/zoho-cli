import { Flags } from '@oclif/core'
import { BooksBaseCommand } from '../../../books-base-command.js'

export default class BooksExpensesCreate extends BooksBaseCommand<typeof BooksExpensesCreate> {
  static id = 'books expenses create'
  static summary = 'Create an expense'

  static flags = {
    data: Flags.string({ description: 'JSON object with expense fields', required: true, char: 'd' }),
    'dry-run': Flags.boolean({ description: 'Show request without executing', default: false }),
  }

  async run(): Promise<void> {
    const { flags } = this
    try {
      const body = JSON.parse(flags.data)
      if (flags['dry-run']) {
        this.outputSuccess({ dryRun: true, method: 'POST', path: '/expenses', body })
        return
      }
      const data = await this.booksPost('/expenses', body)
      this.outputSuccess(data.expense ?? data, { action: 'books.expenses.create' })
    } catch (error: any) {
      if (error instanceof SyntaxError) {
        this.outputError('INVALID_JSON', 'Invalid JSON in --data flag')
        this.exit(3)
      }
      this.handleApiError(error)
    }
  }
}
