import { Args, Flags } from '@oclif/core'
import { BooksBaseCommand } from '../../../books-base-command.js'

export default class BooksBillsApprove extends BooksBaseCommand<typeof BooksBillsApprove> {
  static id = 'books bills approve'
  static summary = 'Approve a bill'

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
        this.outputSuccess({ dryRun: true, method: 'POST', path: `/bills/${args.id}/approve` })
        return
      }
      const data = await this.booksPost(`/bills/${args.id}/approve`)
      this.outputSuccess(data, { action: 'books.bills.approve' })
    } catch (error: any) {
      this.handleApiError(error)
    }
  }
}
