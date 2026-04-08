import { Args, Flags } from '@oclif/core'
import { BooksBaseCommand } from '../../../books-base-command.js'

export default class BooksRecurringInvoicesUpdate extends BooksBaseCommand<typeof BooksRecurringInvoicesUpdate> {
  static id = 'books recurring-invoices update'
  static summary = 'Update a recurring invoice'

  static args = {
    id: Args.string({ description: 'Recurring invoice ID', required: true }),
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
        this.outputSuccess({ dryRun: true, method: 'PUT', path: `/recurringinvoices/${args.id}`, body })
        return
      }
      const data = await this.booksPut(`/recurringinvoices/${args.id}`, body)
      this.outputSuccess(data.recurring_invoice ?? data, { action: 'books.recurring-invoices.update' })
    } catch (error: any) {
      if (error instanceof SyntaxError) {
        this.outputError('INVALID_JSON', 'Invalid JSON in --data flag')
        this.exit(3)
      }
      this.handleApiError(error)
    }
  }
}
