import { Flags } from '@oclif/core'
import { BooksBaseCommand } from '../../../books-base-command.js'

export default class BooksVendorPaymentsList extends BooksBaseCommand<typeof BooksVendorPaymentsList> {
  static id = 'books vendor-payments list'
  static summary = 'List vendor payments'

  static flags = {
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
      if (flags['vendor-id']) params.vendor_id = flags['vendor-id']

      const data = await this.booksGet('/vendorpayments', params)
      this.outputSuccess(data.vendorpayments ?? [], {
        action: 'books.vendor-payments.list',
        page: flags.page,
        perPage: flags['per-page'],
        hasMore: data.page_context?.has_more_page ?? false,
        count: data.vendorpayments?.length ?? 0,
      })
    } catch (error: any) {
      this.handleApiError(error)
    }
  }
}
