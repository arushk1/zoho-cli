import { Args, Flags } from '@oclif/core'
import { BooksBaseCommand } from '../../../books-base-command.js'

export default class BooksRecurringBillsResume extends BooksBaseCommand<typeof BooksRecurringBillsResume> {
  static id = 'books recurring-bills resume'
  static summary = 'Resume a recurring bill'

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
        this.outputSuccess({ dryRun: true, method: 'POST', path: `/recurringbills/${args.id}/status/resume` })
        return
      }
      const data = await this.booksPost(`/recurringbills/${args.id}/status/resume`)
      this.outputSuccess(data, { action: 'books.recurring-bills.resume' })
    } catch (error: any) {
      this.handleApiError(error)
    }
  }
}
