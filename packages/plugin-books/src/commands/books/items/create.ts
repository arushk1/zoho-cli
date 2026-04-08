import { Flags } from '@oclif/core'
import { BooksBaseCommand } from '../../../books-base-command.js'

export default class BooksItemsCreate extends BooksBaseCommand<typeof BooksItemsCreate> {
  static id = 'books items create'
  static summary = 'Create an item'

  static flags = {
    data: Flags.string({ description: 'JSON object with item fields', required: true, char: 'd' }),
    'dry-run': Flags.boolean({ description: 'Show request without executing', default: false }),
  }

  async run(): Promise<void> {
    const { flags } = this
    try {
      const body = JSON.parse(flags.data)
      if (flags['dry-run']) {
        this.outputSuccess({ dryRun: true, method: 'POST', path: '/items', body })
        return
      }
      const data = await this.booksPost('/items', body)
      this.outputSuccess(data.item ?? data, { action: 'books.items.create' })
    } catch (error: any) {
      if (error instanceof SyntaxError) {
        this.outputError('INVALID_JSON', 'Invalid JSON in --data flag')
        this.exit(3)
      }
      this.handleApiError(error)
    }
  }
}
