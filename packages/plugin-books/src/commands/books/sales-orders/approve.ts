import { Args, Flags } from '@oclif/core'
import { BooksBaseCommand } from '../../../books-base-command.js'

export default class BooksSalesOrdersApprove extends BooksBaseCommand<typeof BooksSalesOrdersApprove> {
  static id = 'books sales-orders approve'
  static summary = 'Approve a sales order'

  static args = {
    id: Args.string({ description: 'Sales Order ID', required: true }),
  }

  static flags = {
    'dry-run': Flags.boolean({ description: 'Show request without executing', default: false }),
  }

  async run(): Promise<void> {
    const { args, flags } = this
    try {
      if (flags['dry-run']) {
        this.outputSuccess({ dryRun: true, method: 'POST', path: `/salesorders/${args.id}/approve` })
        return
      }
      const data = await this.booksPost(`/salesorders/${args.id}/approve`)
      this.outputSuccess(data, { action: 'books.sales-orders.approve' })
    } catch (error: any) {
      this.handleApiError(error)
    }
  }
}
