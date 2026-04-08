import { BooksBaseCommand } from '../../../books-base-command.js'

export default class BooksUsersMe extends BooksBaseCommand<typeof BooksUsersMe> {
  static id = 'books users me'
  static summary = 'Get the current authenticated user'

  async run(): Promise<void> {
    try {
      const data = await this.booksGet('/users/me')
      this.outputSuccess(data.user ?? data, { action: 'books.users.me' })
    } catch (error: any) {
      this.handleApiError(error)
    }
  }
}
