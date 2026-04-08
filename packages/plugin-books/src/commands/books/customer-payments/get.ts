import { Args } from '@oclif/core'
import { BooksBaseCommand } from '../../../books-base-command.js'

export default class BooksCustomerPaymentsGet extends BooksBaseCommand<typeof BooksCustomerPaymentsGet> {
  static id = 'books customer-payments get'
  static summary = 'Get a customer payment by ID'

  static args = {
    id: Args.string({ description: 'Customer payment ID', required: true }),
  }

  async run(): Promise<void> {
    const { args } = this
    try {
      const data = await this.booksGet(`/customerpayments/${args.id}`)
      this.outputSuccess(data.payment ?? data, { action: 'books.customer-payments.get' })
    } catch (error: any) {
      this.handleApiError(error)
    }
  }
}
