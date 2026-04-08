import { Args, Flags } from '@oclif/core'
import { BooksBaseCommand } from '../../../books-base-command.js'

export default class BooksSalesOrdersDelete extends BooksBaseCommand<typeof BooksSalesOrdersDelete> {
  static id = 'books sales-orders delete'
  static summary = 'Delete a sales order'

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
        this.outputSuccess({ dryRun: true, method: 'DELETE', path: `/salesorders/${args.id}` })
        return
      }
      const data = await this.booksDelete(`/salesorders/${args.id}`)
      this.outputSuccess(data, { action: 'books.sales-orders.delete' })
    } catch (error: any) {
      this.handleApiError(error)
    }
  }
}
