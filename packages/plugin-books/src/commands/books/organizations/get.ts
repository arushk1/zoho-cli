import { Args } from '@oclif/core'
import { BooksBaseCommand } from '../../../books-base-command.js'

export default class BooksOrganizationsGet extends BooksBaseCommand<typeof BooksOrganizationsGet> {
  static id = 'books organizations get'
  static summary = 'Get an organization by ID'

  static args = {
    id: Args.string({ description: 'Organization ID', required: true }),
  }

  async run(): Promise<void> {
    const { args } = this
    try {
      const data = await this.booksGet(`/organizations/${args.id}`)
      this.outputSuccess(data.organization ?? data, { action: 'books.organizations.get' })
    } catch (error: any) {
      this.handleApiError(error)
    }
  }
}
