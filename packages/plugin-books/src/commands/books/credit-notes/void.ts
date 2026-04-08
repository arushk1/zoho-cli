import { Args, Flags } from '@oclif/core'
import { BooksBaseCommand } from '../../../books-base-command.js'

export default class BooksCreditNotesVoid extends BooksBaseCommand<typeof BooksCreditNotesVoid> {
  static id = 'books credit-notes void'
  static summary = 'Void a credit note'

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
        this.outputSuccess({ dryRun: true, method: 'POST', path: `/creditnotes/${args.id}/status/void` })
        return
      }
      const data = await this.booksPost(`/creditnotes/${args.id}/status/void`)
      this.outputSuccess(data, { action: 'books.credit-notes.void' })
    } catch (error: any) {
      this.handleApiError(error)
    }
  }
}
