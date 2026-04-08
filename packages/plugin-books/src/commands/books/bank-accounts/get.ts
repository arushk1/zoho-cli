import { Args } from '@oclif/core'
import { BooksBaseCommand } from '../../../books-base-command.js'

export default class BooksBankAccountsGet extends BooksBaseCommand<typeof BooksBankAccountsGet> {
  static id = 'books bank-accounts get'
  static summary = 'Get a bank account by ID'

  static args = {
    id: Args.string({ description: 'Bank account ID', required: true }),
  }

  async run(): Promise<void> {
    const { args } = this
    try {
      const data = await this.booksGet(`/bankaccounts/${args.id}`)
      this.outputSuccess(data.bankaccount ?? data, { action: 'books.bank-accounts.get' })
    } catch (error: any) {
      this.handleApiError(error)
    }
  }
}
