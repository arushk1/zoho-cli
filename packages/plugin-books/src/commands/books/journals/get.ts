import { Args } from '@oclif/core'
import { BooksBaseCommand } from '../../../books-base-command.js'

export default class BooksJournalsGet extends BooksBaseCommand<typeof BooksJournalsGet> {
  static id = 'books journals get'
  static summary = 'Get a journal by ID'

  static args = {
    id: Args.string({ description: 'Journal ID', required: true }),
  }

  async run(): Promise<void> {
    const { args } = this
    try {
      const data = await this.booksGet(`/journals/${args.id}`)
      this.outputSuccess(data.journal ?? data, { action: 'books.journals.get' })
    } catch (error: any) {
      this.handleApiError(error)
    }
  }
}
