import { Args, Flags } from '@oclif/core'
import { BooksBaseCommand } from '../../../books-base-command.js'

export default class BooksEstimatesDecline extends BooksBaseCommand<typeof BooksEstimatesDecline> {
  static id = 'books estimates decline'
  static summary = 'Mark an estimate as declined'

  static args = {
    id: Args.string({ description: 'Estimate ID', required: true }),
  }

  static flags = {
    'dry-run': Flags.boolean({ description: 'Show request without executing', default: false }),
  }

  async run(): Promise<void> {
    const { args, flags } = this
    try {
      if (flags['dry-run']) {
        this.outputSuccess({ dryRun: true, method: 'POST', path: `/estimates/${args.id}/status/declined` })
        return
      }
      const data = await this.booksPost(`/estimates/${args.id}/status/declined`)
      this.outputSuccess(data, { action: 'books.estimates.decline' })
    } catch (error: any) {
      this.handleApiError(error)
    }
  }
}
