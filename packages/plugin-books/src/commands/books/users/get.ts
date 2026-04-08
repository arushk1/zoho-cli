import { Args } from '@oclif/core'
import { BooksBaseCommand } from '../../../books-base-command.js'

export default class BooksUsersGet extends BooksBaseCommand<typeof BooksUsersGet> {
  static id = 'books users get'
  static summary = 'Get a user by ID'

  static args = {
    id: Args.string({ description: 'User ID', required: true }),
  }

  async run(): Promise<void> {
    const { args } = this
    try {
      const data = await this.booksGet(`/users/${args.id}`)
      this.outputSuccess(data.user ?? data, { action: 'books.users.get' })
    } catch (error: any) {
      this.handleApiError(error)
    }
  }
}
