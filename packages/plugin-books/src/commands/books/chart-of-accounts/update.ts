import { Args, Flags } from '@oclif/core'
import { BooksBaseCommand } from '../../../books-base-command.js'

export default class BooksChartOfAccountsUpdate extends BooksBaseCommand<typeof BooksChartOfAccountsUpdate> {
  static id = 'books chart-of-accounts update'
  static summary = 'Update a chart of account'

  static args = {
    id: Args.string({ description: 'Chart of account ID', required: true }),
  }

  static flags = {
    data: Flags.string({ description: 'JSON object with fields to update', required: true, char: 'd' }),
    'dry-run': Flags.boolean({ description: 'Show request without executing', default: false }),
  }

  async run(): Promise<void> {
    const { args, flags } = this
    try {
      const body = JSON.parse(flags.data)
      if (flags['dry-run']) {
        this.outputSuccess({ dryRun: true, method: 'PUT', path: `/chartofaccounts/${args.id}`, body })
        return
      }
      const data = await this.booksPut(`/chartofaccounts/${args.id}`, body)
      this.outputSuccess(data.chart_of_account ?? data, { action: 'books.chart-of-accounts.update' })
    } catch (error: any) {
      if (error instanceof SyntaxError) {
        this.outputError('INVALID_JSON', 'Invalid JSON in --data flag')
        this.exit(3)
      }
      this.handleApiError(error)
    }
  }
}
