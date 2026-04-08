import { Args, Flags } from '@oclif/core'
import { BooksBaseCommand } from '../../../books-base-command.js'

export default class BooksChartOfAccountsActivate extends BooksBaseCommand<typeof BooksChartOfAccountsActivate> {
  static id = 'books chart-of-accounts activate'
  static summary = 'Mark a chart of account as active'

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
        this.outputSuccess({ dryRun: true, method: 'POST', path: `/chartofaccounts/${args.id}/active` })
        return
      }
      const data = await this.booksPost(`/chartofaccounts/${args.id}/active`)
      this.outputSuccess(data, { action: 'books.chart-of-accounts.activate' })
    } catch (error: any) {
      this.handleApiError(error)
    }
  }
}
