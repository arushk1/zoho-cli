import { Args, Flags } from '@oclif/core'
import { BooksBaseCommand } from '../../../books-base-command.js'

export default class BooksUsersActivate extends BooksBaseCommand<typeof BooksUsersActivate> {
  static id = 'books users activate'
  static summary = 'Mark a user as active'

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
        this.outputSuccess({ dryRun: true, method: 'POST', path: `/users/${args.id}/active` })
        return
      }
      const data = await this.booksPost(`/users/${args.id}/active`)
      this.outputSuccess(data, { action: 'books.users.activate' })
    } catch (error: any) {
      this.handleApiError(error)
    }
  }
}
