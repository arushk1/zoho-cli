import { Args, Flags } from '@oclif/core'
import { BooksBaseCommand } from '../../../books-base-command.js'

export default class BooksBillsDelete extends BooksBaseCommand<typeof BooksBillsDelete> {
  static id = 'books bills delete'
  static summary = 'Delete a bill'

  static args = {
    id: Args.string({ description: 'Bill ID', required: true }),
  }

  static flags = {
    'dry-run': Flags.boolean({ description: 'Show request without executing', default: false }),
  }

  async run(): Promise<void> {
    const { args, flags } = this
    try {
      if (flags['dry-run']) {
        this.outputSuccess({ dryRun: true, method: 'DELETE', path: `/bills/${args.id}` })
        return
      }
      const data = await this.booksDelete(`/bills/${args.id}`)
      this.outputSuccess(data, { action: 'books.bills.delete' })
    } catch (error: any) {
      this.handleApiError(error)
    }
  }
}
