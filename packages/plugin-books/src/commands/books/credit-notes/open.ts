import { Args, Flags } from '@oclif/core'
import { BooksBaseCommand } from '../../../books-base-command.js'

export default class BooksCreditNotesOpen extends BooksBaseCommand<typeof BooksCreditNotesOpen> {
  static id = 'books credit-notes open'
  static summary = 'Mark a credit note as open'

  static args = {
    id: Args.string({ description: 'Credit Note ID', required: true }),
  }

  static flags = {
    'dry-run': Flags.boolean({ description: 'Show request without executing', default: false }),
  }

  async run(): Promise<void> {
    const { args, flags } = this
    try {
      if (flags['dry-run']) {
        this.outputSuccess({ dryRun: true, method: 'POST', path: `/creditnotes/${args.id}/status/open` })
        return
      }
      const data = await this.booksPost(`/creditnotes/${args.id}/status/open`)
      this.outputSuccess(data, { action: 'books.credit-notes.open' })
    } catch (error: any) {
      this.handleApiError(error)
    }
  }
}
