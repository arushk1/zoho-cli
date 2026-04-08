import { Flags } from '@oclif/core'
import { BooksBaseCommand } from '../../../books-base-command.js'

export default class BooksJournalsCreate extends BooksBaseCommand<typeof BooksJournalsCreate> {
  static id = 'books journals create'
  static summary = 'Create a journal'

  static flags = {
    data: Flags.string({ description: 'JSON object with journal fields', required: true, char: 'd' }),
    'dry-run': Flags.boolean({ description: 'Show request without executing', default: false }),
  }

  async run(): Promise<void> {
    const { flags } = this
    try {
      const body = JSON.parse(flags.data)
      if (flags['dry-run']) {
        this.outputSuccess({ dryRun: true, method: 'POST', path: '/journals', body })
        return
      }
      const data = await this.booksPost('/journals', body)
      this.outputSuccess(data.journal ?? data, { action: 'books.journals.create' })
    } catch (error: any) {
      if (error instanceof SyntaxError) {
        this.outputError('INVALID_JSON', 'Invalid JSON in --data flag')
        this.exit(3)
      }
      this.handleApiError(error)
    }
  }
}
