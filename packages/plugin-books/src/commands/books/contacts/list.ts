import { Flags } from '@oclif/core'
import { BooksBaseCommand } from '../../../books-base-command.js'

export default class BooksContactsList extends BooksBaseCommand<typeof BooksContactsList> {
  static id = 'books contacts list'
  static summary = 'List contacts (customers and vendors)'

  static flags = {
    'contact-type': Flags.string({ description: 'Filter by contact type', options: ['customer', 'vendor'] }),
    status: Flags.string({ description: 'Filter by status', options: ['active', 'inactive', 'duplicate', 'crm'] }),
    'sort-column': Flags.string({ description: 'Sort column' }),
    page: Flags.integer({ description: 'Page number', default: 1 }),
    'per-page': Flags.integer({ description: 'Results per page', default: 200 }),
  }

  async run(): Promise<void> {
    const { flags } = this
    try {
      const params: Record<string, string> = {
        page: String(flags.page),
        per_page: String(flags['per-page']),
      }
      if (flags['contact-type']) params.contact_type = flags['contact-type']
      if (flags.status) params.status = flags.status
      if (flags['sort-column']) params.sort_column = flags['sort-column']

      const data = await this.booksGet('/contacts', params)
      this.outputSuccess(data.contacts ?? [], {
        action: 'books.contacts.list',
        page: flags.page,
        perPage: flags['per-page'],
        hasMore: data.page_context?.has_more_page ?? false,
        count: data.contacts?.length ?? 0,
      })
    } catch (error: any) {
      this.handleApiError(error)
    }
  }
}
