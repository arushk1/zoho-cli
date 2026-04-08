import { Args, Flags } from '@oclif/core'
import { BooksBaseCommand } from '../../../books-base-command.js'

export default class BooksInvoicesDraft extends BooksBaseCommand<typeof BooksInvoicesDraft> {
  static id = 'books invoices draft'
  static summary = 'Move an invoice to draft status'

  static args = {
    id: Args.string({ description: 'Invoice ID', required: true }),
  }

  static flags = {
    'dry-run': Flags.boolean({ description: 'Show request without executing', default: false }),
  }

  async run(): Promise<void> {
    const { args, flags } = this
    try {
      if (flags['dry-run']) {
        this.outputSuccess({ dryRun: true, method: 'POST', path: `/invoices/${args.id}/status/draft` })
        return
      }
      const data = await this.booksPost(`/invoices/${args.id}/status/draft`)
      this.outputSuccess(data, { action: 'books.invoices.draft' })
    } catch (error: any) {
      this.handleApiError(error)
    }
  }
}
