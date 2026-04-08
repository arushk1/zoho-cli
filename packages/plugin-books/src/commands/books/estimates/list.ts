import { Flags } from '@oclif/core'
import { BooksBaseCommand } from '../../../books-base-command.js'

export default class BooksEstimatesList extends BooksBaseCommand<typeof BooksEstimatesList> {
  static id = 'books estimates list'
  static summary = 'List estimates'

  static flags = {
    status: Flags.string({
      description: 'Filter by status',
      options: ['draft', 'sent', 'invoiced', 'accepted', 'declined', 'expired'],
    }),
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
      if (flags.status) params.status = flags.status
      if (flags['customer-id']) params.customer_id = flags['customer-id']

      const data = await this.booksGet('/estimates', params)
      this.outputSuccess(data.estimates ?? [], {
        action: 'books.estimates.list',
        page: flags.page,
        perPage: flags['per-page'],
        hasMore: data.page_context?.has_more_page ?? false,
        count: data.estimates?.length ?? 0,
      })
    } catch (error: any) {
      this.handleApiError(error)
    }
  }
}
