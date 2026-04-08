import { Flags } from '@oclif/core'
import { BooksBaseCommand } from '../../../books-base-command.js'

export default class BooksEstimatesCreate extends BooksBaseCommand<typeof BooksEstimatesCreate> {
  static id = 'books estimates create'
  static summary = 'Create an estimate'

  static flags = {
    data: Flags.string({ description: 'JSON object with estimate fields', required: true, char: 'd' }),
    'dry-run': Flags.boolean({ description: 'Show request without executing', default: false }),
  }

  async run(): Promise<void> {
    const { flags } = this
    try {
      const body = JSON.parse(flags.data)
      if (flags['dry-run']) {
        this.outputSuccess({ dryRun: true, method: 'POST', path: '/estimates', body })
        return
      }
      const data = await this.booksPost('/estimates', body)
      this.outputSuccess(data.estimate ?? data, { action: 'books.estimates.create' })
    } catch (error: any) {
      if (error instanceof SyntaxError) {
        this.outputError('INVALID_JSON', 'Invalid JSON in --data flag')
        this.exit(3)
      }
      this.handleApiError(error)
    }
  }
}
