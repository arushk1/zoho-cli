import { Args } from '@oclif/core'
import { BooksBaseCommand } from '../../../books-base-command.js'

export default class BooksInvoicesGet extends BooksBaseCommand<typeof BooksInvoicesGet> {
  static id = 'books invoices get'
  static summary = 'Get an invoice by ID'

  static args = {
    id: Args.string({ description: 'Invoice ID', required: true }),
  }

  async run(): Promise<void> {
    const { args } = this
    try {
      const data = await this.booksGet(`/invoices/${args.id}`)
      this.outputSuccess(data.invoice ?? data, { action: 'books.invoices.get' })
    } catch (error: any) {
      this.handleApiError(error)
    }
  }
}
