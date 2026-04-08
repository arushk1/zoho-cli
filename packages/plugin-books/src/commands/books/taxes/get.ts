import { Args } from '@oclif/core'
import { BooksBaseCommand } from '../../../books-base-command.js'

export default class BooksTaxesGet extends BooksBaseCommand<typeof BooksTaxesGet> {
  static id = 'books taxes get'
  static summary = 'Get a tax by ID'

  static args = {
    id: Args.string({ description: 'Tax ID', required: true }),
  }

  async run(): Promise<void> {
    const { args } = this
    try {
      const data = await this.booksGet(`/settings/taxes/${args.id}`)
      this.outputSuccess(data.tax ?? data, { action: 'books.taxes.get' })
    } catch (error: any) {
      this.handleApiError(error)
    }
  }
}
