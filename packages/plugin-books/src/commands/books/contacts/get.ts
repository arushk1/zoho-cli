import { Args } from '@oclif/core'
import { BooksBaseCommand } from '../../../books-base-command.js'

export default class BooksContactsGet extends BooksBaseCommand<typeof BooksContactsGet> {
  static id = 'books contacts get'
  static summary = 'Get a contact by ID'

  static args = {
    id: Args.string({ description: 'Contact ID', required: true }),
  }

  async run(): Promise<void> {
    const { args } = this
    try {
      const data = await this.booksGet(`/contacts/${args.id}`)
      this.outputSuccess(data.contact ?? data, { action: 'books.contacts.get' })
    } catch (error: any) {
      this.handleApiError(error)
    }
  }
}
