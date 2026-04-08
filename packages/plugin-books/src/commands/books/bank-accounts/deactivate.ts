import { Args, Flags } from '@oclif/core'
import { BooksBaseCommand } from '../../../books-base-command.js'

export default class BooksBankAccountsDeactivate extends BooksBaseCommand<typeof BooksBankAccountsDeactivate> {
  static id = 'books bank-accounts deactivate'
  static summary = 'Mark a bank account as inactive'

  static args = {
    id: Args.string({ description: 'Bank account ID', required: true }),
  }

  static flags = {
    'dry-run': Flags.boolean({ description: 'Show request without executing', default: false }),
  }

  async run(): Promise<void> {
    const { args, flags } = this
    try {
      if (flags['dry-run']) {
        this.outputSuccess({ dryRun: true, method: 'POST', path: `/bankaccounts/${args.id}/inactive` })
        return
      }
      const data = await this.booksPost(`/bankaccounts/${args.id}/inactive`)
      this.outputSuccess(data, { action: 'books.bank-accounts.deactivate' })
    } catch (error: any) {
      this.handleApiError(error)
    }
  }
}
