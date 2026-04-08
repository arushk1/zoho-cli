import { Args } from '@oclif/core'
import { BooksBaseCommand } from '../../../books-base-command.js'

export default class BooksCreditNotesGet extends BooksBaseCommand<typeof BooksCreditNotesGet> {
  static id = 'books credit-notes get'
  static summary = 'Get a credit note by ID'

  static args = {
    id: Args.string({ description: 'Credit Note ID', required: true }),
  }

  async run(): Promise<void> {
    const { args } = this
    try {
      const data = await this.booksGet(`/creditnotes/${args.id}`)
      this.outputSuccess(data.creditnote ?? data, { action: 'books.credit-notes.get' })
    } catch (error: any) {
      this.handleApiError(error)
    }
  }
}
