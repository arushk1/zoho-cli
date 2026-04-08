import { Flags } from '@oclif/core'
import { BooksBaseCommand } from '../../../books-base-command.js'

export default class BooksTimeEntriesStopTimer extends BooksBaseCommand<typeof BooksTimeEntriesStopTimer> {
  static id = 'books time-entries stop-timer'
  static summary = 'Stop the currently running timer'

  static flags = {
    'dry-run': Flags.boolean({ description: 'Show request without executing', default: false }),
  }

  async run(): Promise<void> {
    const { flags } = this
    try {
      if (flags['dry-run']) {
        this.outputSuccess({ dryRun: true, method: 'POST', path: '/projects/timeentries/timer/stop' })
        return
      }
      const data = await this.booksPost('/projects/timeentries/timer/stop')
      this.outputSuccess(data, { action: 'books.time-entries.stop-timer' })
    } catch (error: any) {
      this.handleApiError(error)
    }
  }
}
