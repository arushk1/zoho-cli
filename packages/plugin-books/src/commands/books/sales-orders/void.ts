import { Args, Flags } from '@oclif/core'
import { BooksBaseCommand } from '../../../books-base-command.js'

export default class BooksSalesOrdersVoid extends BooksBaseCommand<typeof BooksSalesOrdersVoid> {
  static id = 'books sales-orders void'
  static summary = 'Void a sales order'

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
        this.outputSuccess({ dryRun: true, method: 'POST', path: `/salesorders/${args.id}/status/void` })
        return
      }
      const data = await this.booksPost(`/salesorders/${args.id}/status/void`)
      this.outputSuccess(data, { action: 'books.sales-orders.void' })
    } catch (error: any) {
      this.handleApiError(error)
    }
  }
}
