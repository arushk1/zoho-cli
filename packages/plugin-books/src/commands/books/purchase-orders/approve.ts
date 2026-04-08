import { Args, Flags } from '@oclif/core'
import { BooksBaseCommand } from '../../../books-base-command.js'

export default class BooksPurchaseOrdersApprove extends BooksBaseCommand<typeof BooksPurchaseOrdersApprove> {
  static id = 'books purchase-orders approve'
  static summary = 'Approve a purchase order'

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
        this.outputSuccess({ dryRun: true, method: 'POST', path: `/purchaseorders/${args.id}/approve` })
        return
      }
      const data = await this.booksPost(`/purchaseorders/${args.id}/approve`)
      this.outputSuccess(data, { action: 'books.purchase-orders.approve' })
    } catch (error: any) {
      this.handleApiError(error)
    }
  }
}
