import { Args, Flags } from '@oclif/core'
import { BooksBaseCommand } from '../../../books-base-command.js'

export default class BooksRecurringBillsDelete extends BooksBaseCommand<typeof BooksRecurringBillsDelete> {
  static id = 'books recurring-bills delete'
  static summary = 'Delete a recurring bill'

  static args = {
    id: Args.string({ description: 'Recurring bill ID', required: true }),
  }

  static flags = {
    'dry-run': Flags.boolean({ description: 'Show request without executing', default: false }),
  }

  async run(): Promise<void> {
    const { args, flags } = this
    try {
      if (flags['dry-run']) {
        this.outputSuccess({ dryRun: true, method: 'DELETE', path: `/recurringbills/${args.id}` })
        return
      }
      const data = await this.booksDelete(`/recurringbills/${args.id}`)
      this.outputSuccess(data, { action: 'books.recurring-bills.delete' })
    } catch (error: any) {
      this.handleApiError(error)
    }
  }
}
