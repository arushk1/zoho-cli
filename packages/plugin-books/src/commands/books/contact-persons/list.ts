import { Args, Flags } from '@oclif/core'
import { BooksBaseCommand } from '../../../books-base-command.js'

export default class BooksContactPersonsList extends BooksBaseCommand<typeof BooksContactPersonsList> {
  static id = 'books contact-persons list'
  static summary = 'List contact persons for a contact'

  static args = {
    'contact-id': Args.string({ description: 'Contact ID', required: true }),
  }

  static flags = {
    page: Flags.integer({ description: 'Page number', default: 1 }),
    'per-page': Flags.integer({ description: 'Results per page', default: 200 }),
  }

  async run(): Promise<void> {
    const { args, flags } = this
    try {
      const params: Record<string, string> = {
        page: String(flags.page),
        per_page: String(flags['per-page']),
      }

      const data = await this.booksGet(`/contacts/${args['contact-id']}/contactpersons`, params)
      this.outputSuccess(data.contact_persons ?? [], {
        action: 'books.contact-persons.list',
        page: flags.page,
        perPage: flags['per-page'],
        hasMore: data.page_context?.has_more_page ?? false,
        count: data.contact_persons?.length ?? 0,
      })
    } catch (error: any) {
      this.handleApiError(error)
    }
  }
}
