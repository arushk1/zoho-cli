import { Args, Flags } from '@oclif/core'
import { BooksBaseCommand } from '../../../books-base-command.js'

export default class BooksInvoicesSend extends BooksBaseCommand<typeof BooksInvoicesSend> {
  static id = 'books invoices send'
  static summary = 'Send an invoice by email'

  static args = {
    id: Args.string({ description: 'Invoice ID', required: true }),
  }

  static flags = {
    data: Flags.string({ description: 'JSON object with email recipients', char: 'd' }),
    'dry-run': Flags.boolean({ description: 'Show request without executing', default: false }),
  }

  async run(): Promise<void> {
    const { args, flags } = this
    try {
      if (flags['dry-run']) {
        this.outputSuccess({ dryRun: true, method: 'POST', path: `/invoices/${args.id}/email` })
        return
      }
      const body = flags.data ? JSON.parse(flags.data) : {}
      const data = await this.booksPost(`/invoices/${args.id}/email`, body)
      this.outputSuccess(data, { action: 'books.invoices.send' })
    } catch (error: any) {
      if (error instanceof SyntaxError) {
        this.outputError('INVALID_JSON', 'Invalid JSON in --data flag')
        this.exit(3)
      }
      this.handleApiError(error)
    }
  }
}
