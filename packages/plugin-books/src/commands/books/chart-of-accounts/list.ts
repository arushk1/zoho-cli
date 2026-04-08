import { Flags } from '@oclif/core'
import { BooksBaseCommand } from '../../../books-base-command.js'

export default class BooksChartOfAccountsList extends BooksBaseCommand<typeof BooksChartOfAccountsList> {
  static id = 'books chart-of-accounts list'
  static summary = 'List chart of accounts'

  static flags = {
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
      const data = await this.booksGet('/chartofaccounts', params)
      this.outputSuccess(data.chartofaccounts ?? [], {
        action: 'books.chart-of-accounts.list',
        page: flags.page,
        perPage: flags['per-page'],
        hasMore: data.page_context?.has_more_page ?? false,
        count: data.chartofaccounts?.length ?? 0,
      })
    } catch (error: any) {
      this.handleApiError(error)
    }
  }
}
