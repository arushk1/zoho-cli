import { Args, Flags } from '@oclif/core'
import { BooksBaseCommand } from '../../../books-base-command.js'

export default class BooksBillsOpen extends BooksBaseCommand<typeof BooksBillsOpen> {
  static id = 'books bills open'
  static summary = 'Mark a bill as open'

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
        this.outputSuccess({ dryRun: true, method: 'POST', path: `/bills/${args.id}/status/open` })
        return
      }
      const data = await this.booksPost(`/bills/${args.id}/status/open`)
      this.outputSuccess(data, { action: 'books.bills.open' })
    } catch (error: any) {
      this.handleApiError(error)
    }
  }
}
