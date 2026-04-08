import { Flags } from '@oclif/core'
import { BooksBaseCommand } from '../../../books-base-command.js'

export default class BooksUsersCreate extends BooksBaseCommand<typeof BooksUsersCreate> {
  static id = 'books users create'
  static summary = 'Create a user'

  static flags = {
    data: Flags.string({ description: 'JSON object with user fields', required: true, char: 'd' }),
    'dry-run': Flags.boolean({ description: 'Show request without executing', default: false }),
  }

  async run(): Promise<void> {
    const { flags } = this
    try {
      const body = JSON.parse(flags.data)
      if (flags['dry-run']) {
        this.outputSuccess({ dryRun: true, method: 'POST', path: '/users', body })
        return
      }
      const data = await this.booksPost('/users', body)
      this.outputSuccess(data.user ?? data, { action: 'books.users.create' })
    } catch (error: any) {
      if (error instanceof SyntaxError) {
        this.outputError('INVALID_JSON', 'Invalid JSON in --data flag')
        this.exit(3)
      }
      this.handleApiError(error)
    }
  }
}
