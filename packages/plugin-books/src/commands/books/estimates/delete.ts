import { Args, Flags } from '@oclif/core'
import { BooksBaseCommand } from '../../../books-base-command.js'

export default class BooksEstimatesDelete extends BooksBaseCommand<typeof BooksEstimatesDelete> {
  static id = 'books estimates delete'
  static summary = 'Delete an estimate'

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
        this.outputSuccess({ dryRun: true, method: 'DELETE', path: `/estimates/${args.id}` })
        return
      }
      const data = await this.booksDelete(`/estimates/${args.id}`)
      this.outputSuccess(data, { action: 'books.estimates.delete' })
    } catch (error: any) {
      this.handleApiError(error)
    }
  }
}
