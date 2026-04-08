import { Args } from '@oclif/core'
import { BooksBaseCommand } from '../../../books-base-command.js'

export default class BooksChartOfAccountsGet extends BooksBaseCommand<typeof BooksChartOfAccountsGet> {
  static id = 'books chart-of-accounts get'
  static summary = 'Get a chart of account by ID'

  static args = {
    id: Args.string({ description: 'Chart of account ID', required: true }),
  }

  async run(): Promise<void> {
    const { args } = this
    try {
      const data = await this.booksGet(`/chartofaccounts/${args.id}`)
      this.outputSuccess(data.chart_of_account ?? data, { action: 'books.chart-of-accounts.get' })
    } catch (error: any) {
      this.handleApiError(error)
    }
  }
}
