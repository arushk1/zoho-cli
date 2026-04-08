import { Args, Flags } from '@oclif/core'
import { BooksBaseCommand } from '../../../books-base-command.js'

export default class BooksJournalsPublish extends BooksBaseCommand<typeof BooksJournalsPublish> {
  static id = 'books journals publish'
  static summary = 'Publish a journal'

  static args = {
    id: Args.string({ description: 'Journal ID', required: true }),
  }

  static flags = {
    'dry-run': Flags.boolean({ description: 'Show request without executing', default: false }),
  }

  async run(): Promise<void> {
    const { args, flags } = this
    try {
      if (flags['dry-run']) {
        this.outputSuccess({ dryRun: true, method: 'POST', path: `/journals/${args.id}/status/publish` })
        return
      }
      const data = await this.booksPost(`/journals/${args.id}/status/publish`)
      this.outputSuccess(data, { action: 'books.journals.publish' })
    } catch (error: any) {
      this.handleApiError(error)
    }
  }
}
