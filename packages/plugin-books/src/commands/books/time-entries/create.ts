import { Flags } from '@oclif/core'
import { BooksBaseCommand } from '../../../books-base-command.js'

export default class BooksTimeEntriesCreate extends BooksBaseCommand<typeof BooksTimeEntriesCreate> {
  static id = 'books time-entries create'
  static summary = 'Create a time entry'

  static flags = {
    data: Flags.string({ description: 'JSON object with time entry fields', required: true, char: 'd' }),
    'dry-run': Flags.boolean({ description: 'Show request without executing', default: false }),
  }

  async run(): Promise<void> {
    const { flags } = this
    try {
      const body = JSON.parse(flags.data)
      if (flags['dry-run']) {
        this.outputSuccess({ dryRun: true, method: 'POST', path: '/projects/timeentries', body })
        return
      }
      const data = await this.booksPost('/projects/timeentries', body)
      this.outputSuccess(data.time_entry ?? data, { action: 'books.time-entries.create' })
    } catch (error: any) {
      if (error instanceof SyntaxError) {
        this.outputError('INVALID_JSON', 'Invalid JSON in --data flag')
        this.exit(3)
      }
      this.handleApiError(error)
    }
  }
}
