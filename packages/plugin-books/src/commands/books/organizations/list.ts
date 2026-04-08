import { BooksBaseCommand } from '../../../books-base-command.js'

export default class BooksOrganizationsList extends BooksBaseCommand<typeof BooksOrganizationsList> {
  static id = 'books organizations list'
  static summary = 'List organizations'

  async run(): Promise<void> {
    try {
      const data = await this.booksGet('/organizations')
      this.outputSuccess(data.organizations ?? [], {
        action: 'books.organizations.list',
        count: data.organizations?.length ?? 0,
      })
    } catch (error: any) {
      this.handleApiError(error)
    }
  }
}
