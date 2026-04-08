import { Args, Flags } from '@oclif/core'
import { BooksBaseCommand } from '../../../books-base-command.js'

export default class BooksRecurringInvoicesDelete extends BooksBaseCommand<typeof BooksRecurringInvoicesDelete> {
  static id = 'books recurring-invoices delete'
  static summary = 'Delete a recurring invoice'

  static args = {
    id: Args.string({ description: 'Recurring invoice ID', required: true }),
  }

  static flags = {
    'dry-run': Flags.boolean({ description: 'Show request without executing', default: false }),
  }

  async run(): Promise<void> {
    const { args, flags } = this
    try {
      if (flags['dry-run']) {
        this.outputSuccess({ dryRun: true, method: 'DELETE', path: `/recurringinvoices/${args.id}` })
        return
      }
      const data = await this.booksDelete(`/recurringinvoices/${args.id}`)
      this.outputSuccess(data, { action: 'books.recurring-invoices.delete' })
    } catch (error: any) {
      this.handleApiError(error)
    }
  }
}
