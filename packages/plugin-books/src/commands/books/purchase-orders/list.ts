import { Flags } from '@oclif/core'
import { BooksBaseCommand } from '../../../books-base-command.js'

export default class BooksPurchaseOrdersList extends BooksBaseCommand<typeof BooksPurchaseOrdersList> {
  static id = 'books purchase-orders list'
  static summary = 'List purchase orders'

  static flags = {
    status: Flags.string({
      description: 'Filter by status',
      options: ['draft', 'open', 'billed', 'cancelled', 'partially_billed'],
    }),
    'vendor-id': Flags.string({ description: 'Filter by vendor ID' }),
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
      if (flags['vendor-id']) params.vendor_id = flags['vendor-id']

      const data = await this.booksGet('/purchaseorders', params)
      this.outputSuccess(data.purchaseorders ?? [], {
        action: 'books.purchase-orders.list',
        page: flags.page,
        perPage: flags['per-page'],
        hasMore: data.page_context?.has_more_page ?? false,
        count: data.purchaseorders?.length ?? 0,
      })
    } catch (error: any) {
      this.handleApiError(error)
    }
  }
}
