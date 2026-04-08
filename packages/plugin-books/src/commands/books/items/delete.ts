import { Args, Flags } from '@oclif/core'
import { BooksBaseCommand } from '../../../books-base-command.js'

export default class BooksItemsDelete extends BooksBaseCommand<typeof BooksItemsDelete> {
  static id = 'books items delete'
  static summary = 'Delete an item'

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
        this.outputSuccess({ dryRun: true, method: 'DELETE', path: `/items/${args.id}` })
        return
      }
      const data = await this.booksDelete(`/items/${args.id}`)
      this.outputSuccess(data, { action: 'books.items.delete' })
    } catch (error: any) {
      this.handleApiError(error)
    }
  }
}
