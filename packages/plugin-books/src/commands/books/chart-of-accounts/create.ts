import { Flags } from '@oclif/core'
import { BooksBaseCommand } from '../../../books-base-command.js'

export default class BooksChartOfAccountsCreate extends BooksBaseCommand<typeof BooksChartOfAccountsCreate> {
  static id = 'books chart-of-accounts create'
  static summary = 'Create a chart of account'

  static flags = {
    data: Flags.string({ description: 'JSON object with chart of account fields', required: true, char: 'd' }),
    'dry-run': Flags.boolean({ description: 'Show request without executing', default: false }),
  }

  async run(): Promise<void> {
    const { flags } = this
    try {
      const body = JSON.parse(flags.data)
      if (flags['dry-run']) {
        this.outputSuccess({ dryRun: true, method: 'POST', path: '/chartofaccounts', body })
        return
      }
      const data = await this.booksPost('/chartofaccounts', body)
      this.outputSuccess(data.chart_of_account ?? data, { action: 'books.chart-of-accounts.create' })
    } catch (error: any) {
      if (error instanceof SyntaxError) {
        this.outputError('INVALID_JSON', 'Invalid JSON in --data flag')
        this.exit(3)
      }
      this.handleApiError(error)
    }
  }
}
