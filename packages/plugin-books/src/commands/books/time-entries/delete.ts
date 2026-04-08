import { Args, Flags } from '@oclif/core'
import { BooksBaseCommand } from '../../../books-base-command.js'

export default class BooksTimeEntriesDelete extends BooksBaseCommand<typeof BooksTimeEntriesDelete> {
  static id = 'books time-entries delete'
  static summary = 'Delete a time entry'

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
        this.outputSuccess({ dryRun: true, method: 'DELETE', path: `/projects/timeentries/${args.id}` })
        return
      }
      const data = await this.booksDelete(`/projects/timeentries/${args.id}`)
      this.outputSuccess(data, { action: 'books.time-entries.delete' })
    } catch (error: any) {
      this.handleApiError(error)
    }
  }
}
