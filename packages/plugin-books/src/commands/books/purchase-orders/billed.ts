import { Args, Flags } from '@oclif/core'
import { BooksBaseCommand } from '../../../books-base-command.js'

export default class BooksPurchaseOrdersBilled extends BooksBaseCommand<typeof BooksPurchaseOrdersBilled> {
  static id = 'books purchase-orders billed'
  static summary = 'Mark a purchase order as billed'

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
        this.outputSuccess({ dryRun: true, method: 'POST', path: `/purchaseorders/${args.id}/status/billed` })
        return
      }
      const data = await this.booksPost(`/purchaseorders/${args.id}/status/billed`)
      this.outputSuccess(data, { action: 'books.purchase-orders.billed' })
    } catch (error: any) {
      this.handleApiError(error)
    }
  }
}
