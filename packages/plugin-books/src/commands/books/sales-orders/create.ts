import { Flags } from '@oclif/core'
import { BooksBaseCommand } from '../../../books-base-command.js'

export default class BooksSalesOrdersCreate extends BooksBaseCommand<typeof BooksSalesOrdersCreate> {
  static id = 'books sales-orders create'
  static summary = 'Create a sales order'

  static flags = {
    data: Flags.string({ description: 'JSON object with sales order fields', required: true, char: 'd' }),
    'dry-run': Flags.boolean({ description: 'Show request without executing', default: false }),
  }

  async run(): Promise<void> {
    const { flags } = this
    try {
      const body = JSON.parse(flags.data)
      if (flags['dry-run']) {
        this.outputSuccess({ dryRun: true, method: 'POST', path: '/salesorders', body })
        return
      }
      const data = await this.booksPost('/salesorders', body)
      this.outputSuccess(data.salesorder ?? data, { action: 'books.sales-orders.create' })
    } catch (error: any) {
      if (error instanceof SyntaxError) {
        this.outputError('INVALID_JSON', 'Invalid JSON in --data flag')
        this.exit(3)
      }
      this.handleApiError(error)
    }
  }
}
