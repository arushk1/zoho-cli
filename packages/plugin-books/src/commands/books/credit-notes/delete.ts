import { Args, Flags } from '@oclif/core'
import { BooksBaseCommand } from '../../../books-base-command.js'

export default class BooksCreditNotesDelete extends BooksBaseCommand<typeof BooksCreditNotesDelete> {
  static id = 'books credit-notes delete'
  static summary = 'Delete a credit note'

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
        this.outputSuccess({ dryRun: true, method: 'DELETE', path: `/creditnotes/${args.id}` })
        return
      }
      const data = await this.booksDelete(`/creditnotes/${args.id}`)
      this.outputSuccess(data, { action: 'books.credit-notes.delete' })
    } catch (error: any) {
      this.handleApiError(error)
    }
  }
}
