import { Args, Flags } from '@oclif/core'
import { BooksBaseCommand } from '../../../books-base-command.js'

export default class BooksPurchaseOrdersOpen extends BooksBaseCommand<typeof BooksPurchaseOrdersOpen> {
  static id = 'books purchase-orders open'
  static summary = 'Mark a purchase order as open'

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
        this.outputSuccess({ dryRun: true, method: 'POST', path: `/purchaseorders/${args.id}/status/open` })
        return
      }
      const data = await this.booksPost(`/purchaseorders/${args.id}/status/open`)
      this.outputSuccess(data, { action: 'books.purchase-orders.open' })
    } catch (error: any) {
      this.handleApiError(error)
    }
  }
}
