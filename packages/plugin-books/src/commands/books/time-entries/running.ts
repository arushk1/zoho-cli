import { BooksBaseCommand } from '../../../books-base-command.js'

export default class BooksTimeEntriesRunning extends BooksBaseCommand<typeof BooksTimeEntriesRunning> {
  static id = 'books time-entries running'
  static summary = 'Get the currently running timer'

  async run(): Promise<void> {
    try {
      const data = await this.booksGet('/projects/timeentries/runningtimer/me')
      this.outputSuccess(data.time_entry ?? data, { action: 'books.time-entries.running' })
    } catch (error: any) {
      this.handleApiError(error)
    }
  }
}
