import { Args, Flags } from '@oclif/core'
import { BooksBaseCommand } from '../../../books-base-command.js'

export default class BooksRecurringBillsStop extends BooksBaseCommand<typeof BooksRecurringBillsStop> {
  static id = 'books recurring-bills stop'
  static summary = 'Stop a recurring bill'

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
        this.outputSuccess({ dryRun: true, method: 'POST', path: `/recurringbills/${args.id}/status/stop` })
        return
      }
      const data = await this.booksPost(`/recurringbills/${args.id}/status/stop`)
      this.outputSuccess(data, { action: 'books.recurring-bills.stop' })
    } catch (error: any) {
      this.handleApiError(error)
    }
  }
}
