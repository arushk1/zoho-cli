import { Args, Flags } from '@oclif/core'
import { BooksBaseCommand } from '../../../books-base-command.js'

export default class BooksInvoicesDelete extends BooksBaseCommand<typeof BooksInvoicesDelete> {
  static id = 'books invoices delete'
  static summary = 'Delete an invoice'

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
        this.outputSuccess({ dryRun: true, method: 'DELETE', path: `/invoices/${args.id}` })
        return
      }
      const data = await this.booksDelete(`/invoices/${args.id}`)
      this.outputSuccess(data, { action: 'books.invoices.delete' })
    } catch (error: any) {
      this.handleApiError(error)
    }
  }
}
