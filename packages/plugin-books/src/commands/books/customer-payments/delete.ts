import { Args, Flags } from '@oclif/core'
import { BooksBaseCommand } from '../../../books-base-command.js'

export default class BooksCustomerPaymentsDelete extends BooksBaseCommand<typeof BooksCustomerPaymentsDelete> {
  static id = 'books customer-payments delete'
  static summary = 'Delete a customer payment'

  static args = {
    id: Args.string({ description: 'Customer payment ID', required: true }),
  }

  static flags = {
    'dry-run': Flags.boolean({ description: 'Show request without executing', default: false }),
  }

  async run(): Promise<void> {
    const { args, flags } = this
    try {
      if (flags['dry-run']) {
        this.outputSuccess({ dryRun: true, method: 'DELETE', path: `/customerpayments/${args.id}` })
        return
      }
      const data = await this.booksDelete(`/customerpayments/${args.id}`)
      this.outputSuccess(data, { action: 'books.customer-payments.delete' })
    } catch (error: any) {
      this.handleApiError(error)
    }
  }
}
