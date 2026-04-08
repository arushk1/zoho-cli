import { Flags } from '@oclif/core'
import { BooksBaseCommand } from '../../../books-base-command.js'

export default class BooksBillsCreate extends BooksBaseCommand<typeof BooksBillsCreate> {
  static id = 'books bills create'
  static summary = 'Create a bill'

  static flags = {
    data: Flags.string({ description: 'JSON object with bill fields', required: true, char: 'd' }),
    'dry-run': Flags.boolean({ description: 'Show request without executing', default: false }),
  }

  async run(): Promise<void> {
    const { flags } = this
    try {
      const body = JSON.parse(flags.data)
      if (flags['dry-run']) {
        this.outputSuccess({ dryRun: true, method: 'POST', path: '/bills', body })
        return
      }
      const data = await this.booksPost('/bills', body)
      this.outputSuccess(data.bill ?? data, { action: 'books.bills.create' })
    } catch (error: any) {
      if (error instanceof SyntaxError) {
        this.outputError('INVALID_JSON', 'Invalid JSON in --data flag')
        this.exit(3)
      }
      this.handleApiError(error)
    }
  }
}
