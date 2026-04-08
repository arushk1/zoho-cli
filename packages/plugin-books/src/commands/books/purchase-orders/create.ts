import { Flags } from '@oclif/core'
import { BooksBaseCommand } from '../../../books-base-command.js'

export default class BooksPurchaseOrdersCreate extends BooksBaseCommand<typeof BooksPurchaseOrdersCreate> {
  static id = 'books purchase-orders create'
  static summary = 'Create a purchase order'

  static flags = {
    data: Flags.string({ description: 'JSON object with purchase order fields', required: true, char: 'd' }),
    'dry-run': Flags.boolean({ description: 'Show request without executing', default: false }),
  }

  async run(): Promise<void> {
    const { flags } = this
    try {
      const body = JSON.parse(flags.data)
      if (flags['dry-run']) {
        this.outputSuccess({ dryRun: true, method: 'POST', path: '/purchaseorders', body })
        return
      }
      const data = await this.booksPost('/purchaseorders', body)
      this.outputSuccess(data.purchaseorder ?? data, { action: 'books.purchase-orders.create' })
    } catch (error: any) {
      if (error instanceof SyntaxError) {
        this.outputError('INVALID_JSON', 'Invalid JSON in --data flag')
        this.exit(3)
      }
      this.handleApiError(error)
    }
  }
}
