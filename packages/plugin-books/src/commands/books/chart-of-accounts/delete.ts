import { Args, Flags } from '@oclif/core'
import { BooksBaseCommand } from '../../../books-base-command.js'

export default class BooksChartOfAccountsDelete extends BooksBaseCommand<typeof BooksChartOfAccountsDelete> {
  static id = 'books chart-of-accounts delete'
  static summary = 'Delete a chart of account'

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
        this.outputSuccess({ dryRun: true, method: 'DELETE', path: `/chartofaccounts/${args.id}` })
        return
      }
      const data = await this.booksDelete(`/chartofaccounts/${args.id}`)
      this.outputSuccess(data, { action: 'books.chart-of-accounts.delete' })
    } catch (error: any) {
      this.handleApiError(error)
    }
  }
}
