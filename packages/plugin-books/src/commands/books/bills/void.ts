import { Args, Flags } from '@oclif/core'
import { BooksBaseCommand } from '../../../books-base-command.js'

export default class BooksBillsVoid extends BooksBaseCommand<typeof BooksBillsVoid> {
  static id = 'books bills void'
  static summary = 'Void a bill'

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
        this.outputSuccess({ dryRun: true, method: 'POST', path: `/bills/${args.id}/status/void` })
        return
      }
      const data = await this.booksPost(`/bills/${args.id}/status/void`)
      this.outputSuccess(data, { action: 'books.bills.void' })
    } catch (error: any) {
      this.handleApiError(error)
    }
  }
}
