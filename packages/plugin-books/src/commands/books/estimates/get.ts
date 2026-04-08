import { Args } from '@oclif/core'
import { BooksBaseCommand } from '../../../books-base-command.js'

export default class BooksEstimatesGet extends BooksBaseCommand<typeof BooksEstimatesGet> {
  static id = 'books estimates get'
  static summary = 'Get an estimate by ID'

  static args = {
    id: Args.string({ description: 'Estimate ID', required: true }),
  }

  async run(): Promise<void> {
    const { args } = this
    try {
      const data = await this.booksGet(`/estimates/${args.id}`)
      this.outputSuccess(data.estimate ?? data, { action: 'books.estimates.get' })
    } catch (error: any) {
      this.handleApiError(error)
    }
  }
}
