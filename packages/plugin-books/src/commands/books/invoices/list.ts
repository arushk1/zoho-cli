import { Flags } from '@oclif/core'
import { BooksBaseCommand } from '../../../books-base-command.js'

export default class BooksInvoicesList extends BooksBaseCommand<typeof BooksInvoicesList> {
  static id = 'books invoices list'
  static summary = 'List invoices'

  static flags = {
    status: Flags.string({
      description: 'Filter by status',
      options: ['draft', 'sent', 'overdue', 'paid', 'void', 'unpaid', 'partially_paid', 'viewed'],
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

      const data = await this.booksGet('/invoices', params)
      this.outputSuccess(data.invoices ?? [], {
        action: 'books.invoices.list',
        page: flags.page,
        perPage: flags['per-page'],
        hasMore: data.page_context?.has_more_page ?? false,
        count: data.invoices?.length ?? 0,
      })
    } catch (error: any) {
      this.handleApiError(error)
    }
  }
}
