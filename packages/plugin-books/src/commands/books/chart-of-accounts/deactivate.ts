import { Args, Flags } from '@oclif/core'
import { BooksBaseCommand } from '../../../books-base-command.js'

export default class BooksChartOfAccountsDeactivate extends BooksBaseCommand<typeof BooksChartOfAccountsDeactivate> {
  static id = 'books chart-of-accounts deactivate'
  static summary = 'Mark a chart of account as inactive'

  static args = {
    id: Args.string({ description: 'Chart of account ID', required: true }),
  }

  static flags = {
    'dry-run': Flags.boolean({ description: 'Show request without executing', default: false }),
  }

  async run(): Promise<void> {
    const { args, flags } = this
    try {
      if (flags['dry-run']) {
        this.outputSuccess({ dryRun: true, method: 'POST', path: `/chartofaccounts/${args.id}/inactive` })
        return
      }
      const data = await this.booksPost(`/chartofaccounts/${args.id}/inactive`)
      this.outputSuccess(data, { action: 'books.chart-of-accounts.deactivate' })
    } catch (error: any) {
      this.handleApiError(error)
    }
  }
}
