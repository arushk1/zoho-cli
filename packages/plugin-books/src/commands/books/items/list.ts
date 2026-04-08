import { Flags } from '@oclif/core'
import { BooksBaseCommand } from '../../../books-base-command.js'

export default class BooksItemsList extends BooksBaseCommand<typeof BooksItemsList> {
  static id = 'books items list'
  static summary = 'List items'

  static flags = {
    name: Flags.string({ description: 'Filter by item name' }),
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
      if (flags.name) params.name = flags.name

      const data = await this.booksGet('/items', params)
      this.outputSuccess(data.items ?? [], {
        action: 'books.items.list',
        page: flags.page,
        perPage: flags['per-page'],
        hasMore: data.page_context?.has_more_page ?? false,
        count: data.items?.length ?? 0,
      })
    } catch (error: any) {
      this.handleApiError(error)
    }
  }
}
