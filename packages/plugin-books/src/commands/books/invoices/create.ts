import { Flags } from '@oclif/core'
import { BooksBaseCommand } from '../../../books-base-command.js'

export default class BooksInvoicesCreate extends BooksBaseCommand<typeof BooksInvoicesCreate> {
  static id = 'books invoices create'
  static summary = 'Create an invoice'

  static flags = {
    data: Flags.string({ description: 'JSON object with invoice fields', required: true, char: 'd' }),
    'dry-run': Flags.boolean({ description: 'Show request without executing', default: false }),
  }

  async run(): Promise<void> {
    const { flags } = this
    try {
      const body = JSON.parse(flags.data)
      if (flags['dry-run']) {
        this.outputSuccess({ dryRun: true, method: 'POST', path: '/invoices', body })
        return
      }
      const data = await this.booksPost('/invoices', body)
      this.outputSuccess(data.invoice ?? data, { action: 'books.invoices.create' })
    } catch (error: any) {
      if (error instanceof SyntaxError) {
        this.outputError('INVALID_JSON', 'Invalid JSON in --data flag')
        this.exit(3)
      }
      this.handleApiError(error)
    }
  }
}
