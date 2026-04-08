import { Args, Flags } from '@oclif/core'
import { BooksBaseCommand } from '../../../books-base-command.js'

export default class BooksPurchaseOrdersDelete extends BooksBaseCommand<typeof BooksPurchaseOrdersDelete> {
  static id = 'books purchase-orders delete'
  static summary = 'Delete a purchase order'

  static args = {
    id: Args.string({ description: 'Purchase Order ID', required: true }),
  }

  static flags = {
    'dry-run': Flags.boolean({ description: 'Show request without executing', default: false }),
  }

  async run(): Promise<void> {
    const { args, flags } = this
    try {
      if (flags['dry-run']) {
        this.outputSuccess({ dryRun: true, method: 'DELETE', path: `/purchaseorders/${args.id}` })
        return
      }
      const data = await this.booksDelete(`/purchaseorders/${args.id}`)
      this.outputSuccess(data, { action: 'books.purchase-orders.delete' })
    } catch (error: any) {
      this.handleApiError(error)
    }
  }
}
