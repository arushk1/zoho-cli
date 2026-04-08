import { Args } from '@oclif/core'
import { BooksBaseCommand } from '../../../books-base-command.js'

export default class BooksSalesOrdersGet extends BooksBaseCommand<typeof BooksSalesOrdersGet> {
  static id = 'books sales-orders get'
  static summary = 'Get a sales order by ID'

  static args = {
    id: Args.string({ description: 'Sales Order ID', required: true }),
  }

  async run(): Promise<void> {
    const { args } = this
    try {
      const data = await this.booksGet(`/salesorders/${args.id}`)
      this.outputSuccess(data.salesorder ?? data, { action: 'books.sales-orders.get' })
    } catch (error: any) {
      this.handleApiError(error)
    }
  }
}
