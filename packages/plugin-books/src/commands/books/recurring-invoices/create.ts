import { Flags } from '@oclif/core'
import { BooksBaseCommand } from '../../../books-base-command.js'

export default class BooksRecurringInvoicesCreate extends BooksBaseCommand<typeof BooksRecurringInvoicesCreate> {
  static id = 'books recurring-invoices create'
  static summary = 'Create a recurring invoice'

  static flags = {
    data: Flags.string({ description: 'JSON object with recurring invoice fields', required: true, char: 'd' }),
    'dry-run': Flags.boolean({ description: 'Show request without executing', default: false }),
  }

  async run(): Promise<void> {
    const { flags } = this
    try {
      const body = JSON.parse(flags.data)
      if (flags['dry-run']) {
        this.outputSuccess({ dryRun: true, method: 'POST', path: '/recurringinvoices', body })
        return
      }
      const data = await this.booksPost('/recurringinvoices', body)
      this.outputSuccess(data.recurring_invoice ?? data, { action: 'books.recurring-invoices.create' })
    } catch (error: any) {
      if (error instanceof SyntaxError) {
        this.outputError('INVALID_JSON', 'Invalid JSON in --data flag')
        this.exit(3)
      }
      this.handleApiError(error)
    }
  }
}
