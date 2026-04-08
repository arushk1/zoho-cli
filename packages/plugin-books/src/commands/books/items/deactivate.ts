import { Args, Flags } from '@oclif/core'
import { BooksBaseCommand } from '../../../books-base-command.js'

export default class BooksItemsDeactivate extends BooksBaseCommand<typeof BooksItemsDeactivate> {
  static id = 'books items deactivate'
  static summary = 'Mark an item as inactive'

  static args = {
    id: Args.string({ description: 'Item ID', required: true }),
  }

  static flags = {
    'dry-run': Flags.boolean({ description: 'Show request without executing', default: false }),
  }

  async run(): Promise<void> {
    const { args, flags } = this
    try {
      if (flags['dry-run']) {
        this.outputSuccess({ dryRun: true, method: 'POST', path: `/items/${args.id}/inactive` })
        return
      }
      const data = await this.booksPost(`/items/${args.id}/inactive`)
      this.outputSuccess(data, { action: 'books.items.deactivate' })
    } catch (error: any) {
      this.handleApiError(error)
    }
  }
}
