import { Args, Flags } from '@oclif/core'
import { BooksBaseCommand } from '../../../books-base-command.js'

export default class BooksEstimatesAccept extends BooksBaseCommand<typeof BooksEstimatesAccept> {
  static id = 'books estimates accept'
  static summary = 'Mark an estimate as accepted'

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
        this.outputSuccess({ dryRun: true, method: 'POST', path: `/estimates/${args.id}/status/accepted` })
        return
      }
      const data = await this.booksPost(`/estimates/${args.id}/status/accepted`)
      this.outputSuccess(data, { action: 'books.estimates.accept' })
    } catch (error: any) {
      this.handleApiError(error)
    }
  }
}
