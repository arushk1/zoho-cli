import { Args, Flags } from '@oclif/core'
import { BooksBaseCommand } from '../../../books-base-command.js'

export default class BooksEstimatesApprove extends BooksBaseCommand<typeof BooksEstimatesApprove> {
  static id = 'books estimates approve'
  static summary = 'Approve an estimate'

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
        this.outputSuccess({ dryRun: true, method: 'POST', path: `/estimates/${args.id}/approve` })
        return
      }
      const data = await this.booksPost(`/estimates/${args.id}/approve`)
      this.outputSuccess(data, { action: 'books.estimates.approve' })
    } catch (error: any) {
      this.handleApiError(error)
    }
  }
}
