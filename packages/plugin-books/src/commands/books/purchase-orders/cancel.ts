import { Args, Flags } from '@oclif/core'
import { BooksBaseCommand } from '../../../books-base-command.js'

export default class BooksPurchaseOrdersCancel extends BooksBaseCommand<typeof BooksPurchaseOrdersCancel> {
  static id = 'books purchase-orders cancel'
  static summary = 'Cancel a purchase order'

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
        this.outputSuccess({ dryRun: true, method: 'POST', path: `/purchaseorders/${args.id}/status/cancelled` })
        return
      }
      const data = await this.booksPost(`/purchaseorders/${args.id}/status/cancelled`)
      this.outputSuccess(data, { action: 'books.purchase-orders.cancel' })
    } catch (error: any) {
      this.handleApiError(error)
    }
  }
}
