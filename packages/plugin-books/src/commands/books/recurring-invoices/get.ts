import { Args } from '@oclif/core'
import { BooksBaseCommand } from '../../../books-base-command.js'

export default class BooksRecurringInvoicesGet extends BooksBaseCommand<typeof BooksRecurringInvoicesGet> {
  static id = 'books recurring-invoices get'
  static summary = 'Get a recurring invoice by ID'

  static args = {
    id: Args.string({ description: 'Recurring invoice ID', required: true }),
  }

  async run(): Promise<void> {
    const { args } = this
    try {
      const data = await this.booksGet(`/recurringinvoices/${args.id}`)
      this.outputSuccess(data.recurring_invoice ?? data, { action: 'books.recurring-invoices.get' })
    } catch (error: any) {
      this.handleApiError(error)
    }
  }
}
