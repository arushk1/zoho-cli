import { Flags } from '@oclif/core'
import { BooksBaseCommand } from '../../../books-base-command.js'

export default class BooksRecurringBillsCreate extends BooksBaseCommand<typeof BooksRecurringBillsCreate> {
  static id = 'books recurring-bills create'
  static summary = 'Create a recurring bill'

  static flags = {
    data: Flags.string({ description: 'JSON object with recurring bill fields', required: true, char: 'd' }),
    'dry-run': Flags.boolean({ description: 'Show request without executing', default: false }),
  }

  async run(): Promise<void> {
    const { flags } = this
    try {
      const body = JSON.parse(flags.data)
      if (flags['dry-run']) {
        this.outputSuccess({ dryRun: true, method: 'POST', path: '/recurringbills', body })
        return
      }
      const data = await this.booksPost('/recurringbills', body)
      this.outputSuccess(data.recurring_bill ?? data, { action: 'books.recurring-bills.create' })
    } catch (error: any) {
      if (error instanceof SyntaxError) {
        this.outputError('INVALID_JSON', 'Invalid JSON in --data flag')
        this.exit(3)
      }
      this.handleApiError(error)
    }
  }
}
