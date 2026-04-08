import { Args, Flags } from '@oclif/core'
import { BooksBaseCommand } from '../../../books-base-command.js'

export default class BooksSalesOrdersOpen extends BooksBaseCommand<typeof BooksSalesOrdersOpen> {
  static id = 'books sales-orders open'
  static summary = 'Mark a sales order as open'

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
        this.outputSuccess({ dryRun: true, method: 'POST', path: `/salesorders/${args.id}/status/open` })
        return
      }
      const data = await this.booksPost(`/salesorders/${args.id}/status/open`)
      this.outputSuccess(data, { action: 'books.sales-orders.open' })
    } catch (error: any) {
      this.handleApiError(error)
    }
  }
}
