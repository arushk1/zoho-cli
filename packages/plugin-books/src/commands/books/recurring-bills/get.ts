import { Args } from '@oclif/core'
import { BooksBaseCommand } from '../../../books-base-command.js'

export default class BooksRecurringBillsGet extends BooksBaseCommand<typeof BooksRecurringBillsGet> {
  static id = 'books recurring-bills get'
  static summary = 'Get a recurring bill by ID'

  static args = {
    id: Args.string({ description: 'Recurring bill ID', required: true }),
  }

  async run(): Promise<void> {
    const { args } = this
    try {
      const data = await this.booksGet(`/recurringbills/${args.id}`)
      this.outputSuccess(data.recurring_bill ?? data, { action: 'books.recurring-bills.get' })
    } catch (error: any) {
      this.handleApiError(error)
    }
  }
}
