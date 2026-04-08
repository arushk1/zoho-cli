import { Args, Flags } from '@oclif/core'
import { BooksBaseCommand } from '../../../books-base-command.js'

export default class BooksInvoicesVoid extends BooksBaseCommand<typeof BooksInvoicesVoid> {
  static id = 'books invoices void'
  static summary = 'Void an invoice'

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
        this.outputSuccess({ dryRun: true, method: 'POST', path: `/invoices/${args.id}/status/void` })
        return
      }
      const data = await this.booksPost(`/invoices/${args.id}/status/void`)
      this.outputSuccess(data, { action: 'books.invoices.void' })
    } catch (error: any) {
      this.handleApiError(error)
    }
  }
}
