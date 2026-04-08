import { Args, Flags } from '@oclif/core'
import { BooksBaseCommand } from '../../../books-base-command.js'

export default class BooksBankAccountsActivate extends BooksBaseCommand<typeof BooksBankAccountsActivate> {
  static id = 'books bank-accounts activate'
  static summary = 'Mark a bank account as active'

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
        this.outputSuccess({ dryRun: true, method: 'POST', path: `/bankaccounts/${args.id}/active` })
        return
      }
      const data = await this.booksPost(`/bankaccounts/${args.id}/active`)
      this.outputSuccess(data, { action: 'books.bank-accounts.activate' })
    } catch (error: any) {
      this.handleApiError(error)
    }
  }
}
