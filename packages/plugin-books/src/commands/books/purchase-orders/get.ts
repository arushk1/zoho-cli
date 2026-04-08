import { Args } from '@oclif/core'
import { BooksBaseCommand } from '../../../books-base-command.js'

export default class BooksPurchaseOrdersGet extends BooksBaseCommand<typeof BooksPurchaseOrdersGet> {
  static id = 'books purchase-orders get'
  static summary = 'Get a purchase order by ID'

  static args = {
    id: Args.string({ description: 'Purchase Order ID', required: true }),
  }

  async run(): Promise<void> {
    const { args } = this
    try {
      const data = await this.booksGet(`/purchaseorders/${args.id}`)
      this.outputSuccess(data.purchaseorder ?? data, { action: 'books.purchase-orders.get' })
    } catch (error: any) {
      this.handleApiError(error)
    }
  }
}
