import { Flags } from '@oclif/core'
import { BooksBaseCommand } from '../../../books-base-command.js'

export default class BooksRecurringBillsList extends BooksBaseCommand<typeof BooksRecurringBillsList> {
  static id = 'books recurring-bills list'
  static summary = 'List recurring bills'

  static flags = {
    status: Flags.string({
      description: 'Filter by status',
      options: ['active', 'stopped', 'expired'],
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

      const data = await this.booksGet('/recurringbills', params)
      this.outputSuccess(data.recurring_bills ?? [], {
        action: 'books.recurring-bills.list',
        page: flags.page,
        perPage: flags['per-page'],
        hasMore: data.page_context?.has_more_page ?? false,
        count: data.recurring_bills?.length ?? 0,
      })
    } catch (error: any) {
      this.handleApiError(error)
    }
  }
}
