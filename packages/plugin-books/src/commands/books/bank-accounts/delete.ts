import { Args, Flags } from '@oclif/core'
import { BooksBaseCommand } from '../../../books-base-command.js'

export default class BooksBankAccountsDelete extends BooksBaseCommand<typeof BooksBankAccountsDelete> {
  static id = 'books bank-accounts delete'
  static summary = 'Delete a bank account'

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
        this.outputSuccess({ dryRun: true, method: 'DELETE', path: `/bankaccounts/${args.id}` })
        return
      }
      const data = await this.booksDelete(`/bankaccounts/${args.id}`)
      this.outputSuccess(data, { action: 'books.bank-accounts.delete' })
    } catch (error: any) {
      this.handleApiError(error)
    }
  }
}
