import { Args } from '@oclif/core'
import { BooksBaseCommand } from '../../../books-base-command.js'

export default class BooksBillsGet extends BooksBaseCommand<typeof BooksBillsGet> {
  static id = 'books bills get'
  static summary = 'Get a bill by ID'

  static args = {
    id: Args.string({ description: 'Bill ID', required: true }),
  }

  async run(): Promise<void> {
    const { args } = this
    try {
      const data = await this.booksGet(`/bills/${args.id}`)
      this.outputSuccess(data.bill ?? data, { action: 'books.bills.get' })
    } catch (error: any) {
      this.handleApiError(error)
    }
  }
}
