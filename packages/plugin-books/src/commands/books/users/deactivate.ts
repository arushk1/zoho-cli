import { Args, Flags } from '@oclif/core'
import { BooksBaseCommand } from '../../../books-base-command.js'

export default class BooksUsersDeactivate extends BooksBaseCommand<typeof BooksUsersDeactivate> {
  static id = 'books users deactivate'
  static summary = 'Mark a user as inactive'

  static args = {
    id: Args.string({ description: 'User ID', required: true }),
  }

  static flags = {
    'dry-run': Flags.boolean({ description: 'Show request without executing', default: false }),
  }

  async run(): Promise<void> {
    const { args, flags } = this
    try {
      if (flags['dry-run']) {
        this.outputSuccess({ dryRun: true, method: 'POST', path: `/users/${args.id}/inactive` })
        return
      }
      const data = await this.booksPost(`/users/${args.id}/inactive`)
      this.outputSuccess(data, { action: 'books.users.deactivate' })
    } catch (error: any) {
      this.handleApiError(error)
    }
  }
}
