import { Args, Flags } from '@oclif/core'
import { BooksBaseCommand } from '../../../books-base-command.js'

export default class BooksInvoicesApprove extends BooksBaseCommand<typeof BooksInvoicesApprove> {
  static id = 'books invoices approve'
  static summary = 'Approve an invoice'

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
        this.outputSuccess({ dryRun: true, method: 'POST', path: `/invoices/${args.id}/approve` })
        return
      }
      const data = await this.booksPost(`/invoices/${args.id}/approve`)
      this.outputSuccess(data, { action: 'books.invoices.approve' })
    } catch (error: any) {
      this.handleApiError(error)
    }
  }
}
