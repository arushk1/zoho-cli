import { Args, Flags } from '@oclif/core'
import { BooksBaseCommand } from '../../../books-base-command.js'

export default class BooksTimeEntriesStartTimer extends BooksBaseCommand<typeof BooksTimeEntriesStartTimer> {
  static id = 'books time-entries start-timer'
  static summary = 'Start a timer for a time entry'

  static args = {
    id: Args.string({ description: 'Time entry ID', required: true }),
  }

  static flags = {
    'dry-run': Flags.boolean({ description: 'Show request without executing', default: false }),
  }

  async run(): Promise<void> {
    const { args, flags } = this
    try {
      if (flags['dry-run']) {
        this.outputSuccess({ dryRun: true, method: 'POST', path: `/projects/timeentries/${args.id}/timer/start` })
        return
      }
      const data = await this.booksPost(`/projects/timeentries/${args.id}/timer/start`)
      this.outputSuccess(data, { action: 'books.time-entries.start-timer' })
    } catch (error: any) {
      this.handleApiError(error)
    }
  }
}
