import { Args } from '@oclif/core'
import { BooksBaseCommand } from '../../../books-base-command.js'

export default class BooksItemsGet extends BooksBaseCommand<typeof BooksItemsGet> {
  static id = 'books items get'
  static summary = 'Get an item by ID'

  static args = {
    id: Args.string({ description: 'Item ID', required: true }),
  }

  async run(): Promise<void> {
    const { args } = this
    try {
      const data = await this.booksGet(`/items/${args.id}`)
      this.outputSuccess(data.item ?? data, { action: 'books.items.get' })
    } catch (error: any) {
      this.handleApiError(error)
    }
  }
}
