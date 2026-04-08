import { Flags } from '@oclif/core'
import { BooksBaseCommand } from '../../../books-base-command.js'

export default class BooksProjectsList extends BooksBaseCommand<typeof BooksProjectsList> {
  static id = 'books projects list'
  static summary = 'List projects'

  static flags = {
    'customer-id': Flags.string({ description: 'Filter by customer ID' }),
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
      if (flags['customer-id']) params.customer_id = flags['customer-id']

      const data = await this.booksGet('/projects', params)
      this.outputSuccess(data.projects ?? [], {
        action: 'books.projects.list',
        page: flags.page,
        perPage: flags['per-page'],
        hasMore: data.page_context?.has_more_page ?? false,
        count: data.projects?.length ?? 0,
      })
    } catch (error: any) {
      this.handleApiError(error)
    }
  }
}
