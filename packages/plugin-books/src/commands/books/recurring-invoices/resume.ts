import { Args, Flags } from '@oclif/core'
import { BooksBaseCommand } from '../../../books-base-command.js'

export default class BooksRecurringInvoicesResume extends BooksBaseCommand<typeof BooksRecurringInvoicesResume> {
  static id = 'books recurring-invoices resume'
  static summary = 'Resume a recurring invoice'

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
        this.outputSuccess({ dryRun: true, method: 'POST', path: `/recurringinvoices/${args.id}/status/resume` })
        return
      }
      const data = await this.booksPost(`/recurringinvoices/${args.id}/status/resume`)
      this.outputSuccess(data, { action: 'books.recurring-invoices.resume' })
    } catch (error: any) {
      this.handleApiError(error)
    }
  }
}
