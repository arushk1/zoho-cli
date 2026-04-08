import { Args, Flags } from '@oclif/core'
import { BooksBaseCommand } from '../../../books-base-command.js'

export default class BooksCurrenciesDelete extends BooksBaseCommand<typeof BooksCurrenciesDelete> {
  static id = 'books currencies delete'
  static summary = 'Delete a currency'

  static args = {
    id: Args.string({ description: 'Currency ID', required: true }),
  }

  static flags = {
    'dry-run': Flags.boolean({ description: 'Show request without executing', default: false }),
  }

  async run(): Promise<void> {
    const { args, flags } = this
    try {
      if (flags['dry-run']) {
        this.outputSuccess({ dryRun: true, method: 'DELETE', path: `/settings/currencies/${args.id}` })
        return
      }
      const data = await this.booksDelete(`/settings/currencies/${args.id}`)
      this.outputSuccess(data, { action: 'books.currencies.delete' })
    } catch (error: any) {
      this.handleApiError(error)
    }
  }
}
