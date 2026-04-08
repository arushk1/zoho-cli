import { Args, Flags } from '@oclif/core'
import { BooksBaseCommand } from '../../../books-base-command.js'

export default class BooksJournalsDelete extends BooksBaseCommand<typeof BooksJournalsDelete> {
  static id = 'books journals delete'
  static summary = 'Delete a journal'

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
        this.outputSuccess({ dryRun: true, method: 'DELETE', path: `/journals/${args.id}` })
        return
      }
      const data = await this.booksDelete(`/journals/${args.id}`)
      this.outputSuccess(data, { action: 'books.journals.delete' })
    } catch (error: any) {
      this.handleApiError(error)
    }
  }
}
