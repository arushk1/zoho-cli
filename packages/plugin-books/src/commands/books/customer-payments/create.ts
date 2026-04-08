import { Flags } from '@oclif/core'
import { BooksBaseCommand } from '../../../books-base-command.js'

export default class BooksCustomerPaymentsCreate extends BooksBaseCommand<typeof BooksCustomerPaymentsCreate> {
  static id = 'books customer-payments create'
  static summary = 'Create a customer payment'

  static flags = {
    data: Flags.string({ description: 'JSON object with customer payment fields', required: true, char: 'd' }),
    'dry-run': Flags.boolean({ description: 'Show request without executing', default: false }),
  }

  async run(): Promise<void> {
    const { flags } = this
    try {
      const body = JSON.parse(flags.data)
      if (flags['dry-run']) {
        this.outputSuccess({ dryRun: true, method: 'POST', path: '/customerpayments', body })
        return
      }
      const data = await this.booksPost('/customerpayments', body)
      this.outputSuccess(data.payment ?? data, { action: 'books.customer-payments.create' })
    } catch (error: any) {
      if (error instanceof SyntaxError) {
        this.outputError('INVALID_JSON', 'Invalid JSON in --data flag')
        this.exit(3)
      }
      this.handleApiError(error)
    }
  }
}
