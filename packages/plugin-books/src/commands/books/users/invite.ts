import { Args, Flags } from '@oclif/core'
import { BooksBaseCommand } from '../../../books-base-command.js'

export default class BooksUsersInvite extends BooksBaseCommand<typeof BooksUsersInvite> {
  static id = 'books users invite'
  static summary = 'Invite a user'

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
        this.outputSuccess({ dryRun: true, method: 'POST', path: `/users/${args.id}/invite` })
        return
      }
      const data = await this.booksPost(`/users/${args.id}/invite`)
      this.outputSuccess(data, { action: 'books.users.invite' })
    } catch (error: any) {
      this.handleApiError(error)
    }
  }
}
