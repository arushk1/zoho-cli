import { Flags } from '@oclif/core'
import { BooksBaseCommand } from '../../../books-base-command.js'

export default class BooksVendorCreditsList extends BooksBaseCommand<typeof BooksVendorCreditsList> {
  static id = 'books vendor-credits list'
  static summary = 'List vendor credits'

  static flags = {
    status: Flags.string({
      description: 'Filter by status',
      options: ['draft', 'open', 'closed', 'void'],
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

      const data = await this.booksGet('/vendorcredits', params)
      this.outputSuccess(data.vendor_credits ?? [], {
        action: 'books.vendor-credits.list',
        page: flags.page,
        perPage: flags['per-page'],
        hasMore: data.page_context?.has_more_page ?? false,
        count: data.vendor_credits?.length ?? 0,
      })
    } catch (error: any) {
      this.handleApiError(error)
    }
  }
}
