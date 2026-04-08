import { Args, Flags } from '@oclif/core'
import { BooksBaseCommand } from '../../../books-base-command.js'

export default class BooksCurrenciesUpdate extends BooksBaseCommand<typeof BooksCurrenciesUpdate> {
  static id = 'books currencies update'
  static summary = 'Update a currency'

  static args = {
    id: Args.string({ description: 'Currency ID', required: true }),
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
        this.outputSuccess({ dryRun: true, method: 'PUT', path: `/settings/currencies/${args.id}`, body })
        return
      }
      const data = await this.booksPut(`/settings/currencies/${args.id}`, body)
      this.outputSuccess(data.currency ?? data, { action: 'books.currencies.update' })
    } catch (error: any) {
      if (error instanceof SyntaxError) {
        this.outputError('INVALID_JSON', 'Invalid JSON in --data flag')
        this.exit(3)
      }
      this.handleApiError(error)
    }
  }
}
