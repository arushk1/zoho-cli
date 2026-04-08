import { Args, Flags } from '@oclif/core'
import { BooksBaseCommand } from '../../../books-base-command.js'

export default class BooksItemsActivate extends BooksBaseCommand<typeof BooksItemsActivate> {
  static id = 'books items activate'
  static summary = 'Mark an item as active'

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
        this.outputSuccess({ dryRun: true, method: 'POST', path: `/items/${args.id}/active` })
        return
      }
      const data = await this.booksPost(`/items/${args.id}/active`)
      this.outputSuccess(data, { action: 'books.items.activate' })
    } catch (error: any) {
      this.handleApiError(error)
    }
  }
}
