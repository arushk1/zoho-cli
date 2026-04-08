import { Args } from '@oclif/core'
import { BooksBaseCommand } from '../../../books-base-command.js'

export default class BooksContactPersonsGet extends BooksBaseCommand<typeof BooksContactPersonsGet> {
  static id = 'books contact-persons get'
  static summary = 'Get a contact person by ID'

  static args = {
    'contact-id': Args.string({ description: 'Contact ID', required: true }),
    id: Args.string({ description: 'Contact person ID', required: true }),
  }

  async run(): Promise<void> {
    const { args } = this
    try {
      const data = await this.booksGet(`/contacts/${args['contact-id']}/contactpersons/${args.id}`)
      this.outputSuccess(data.contact_person ?? data, { action: 'books.contact-persons.get' })
    } catch (error: any) {
      this.handleApiError(error)
    }
  }
}
