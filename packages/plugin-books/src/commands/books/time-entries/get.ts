import { Args } from '@oclif/core'
import { BooksBaseCommand } from '../../../books-base-command.js'

export default class BooksTimeEntriesGet extends BooksBaseCommand<typeof BooksTimeEntriesGet> {
  static id = 'books time-entries get'
  static summary = 'Get a time entry by ID'

  static args = {
    id: Args.string({ description: 'Time entry ID', required: true }),
  }

  async run(): Promise<void> {
    const { args } = this
    try {
      const data = await this.booksGet(`/projects/timeentries/${args.id}`)
      this.outputSuccess(data.time_entry ?? data, { action: 'books.time-entries.get' })
    } catch (error: any) {
      this.handleApiError(error)
    }
  }
}
