import { Args } from '@oclif/core'
import { BooksBaseCommand } from '../../../books-base-command.js'

export default class BooksCurrenciesGet extends BooksBaseCommand<typeof BooksCurrenciesGet> {
  static id = 'books currencies get'
  static summary = 'Get a currency by ID'

  static args = {
    id: Args.string({ description: 'Currency ID', required: true }),
  }

  async run(): Promise<void> {
    const { args } = this
    try {
      const data = await this.booksGet(`/settings/currencies/${args.id}`)
      this.outputSuccess(data.currency ?? data, { action: 'books.currencies.get' })
    } catch (error: any) {
      this.handleApiError(error)
    }
  }
}
