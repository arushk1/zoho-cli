import { Flags } from '@oclif/core'
import { BooksBaseCommand } from '../../../books-base-command.js'

export default class BooksBankAccountsCreate extends BooksBaseCommand<typeof BooksBankAccountsCreate> {
  static id = 'books bank-accounts create'
  static summary = 'Create a bank account'

  static flags = {
    data: Flags.string({ description: 'JSON object with bank account fields', required: true, char: 'd' }),
    'dry-run': Flags.boolean({ description: 'Show request without executing', default: false }),
  }

  async run(): Promise<void> {
    const { flags } = this
    try {
      const body = JSON.parse(flags.data)
      if (flags['dry-run']) {
        this.outputSuccess({ dryRun: true, method: 'POST', path: '/bankaccounts', body })
        return
      }
      const data = await this.booksPost('/bankaccounts', body)
      this.outputSuccess(data.bank_account ?? data, { action: 'books.bank-accounts.create' })
    } catch (error: any) {
      if (error instanceof SyntaxError) {
        this.outputError('INVALID_JSON', 'Invalid JSON in --data flag')
        this.exit(3)
      }
      this.handleApiError(error)
    }
  }
}
