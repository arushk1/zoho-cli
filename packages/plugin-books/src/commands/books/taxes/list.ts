import { Flags } from '@oclif/core'
import { BooksBaseCommand } from '../../../books-base-command.js'

export default class BooksTaxesList extends BooksBaseCommand<typeof BooksTaxesList> {
  static id = 'books taxes list'
  static summary = 'List taxes'

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
      const data = await this.booksGet('/settings/taxes', params)
      this.outputSuccess(data.taxes ?? [], {
        action: 'books.taxes.list',
        page: flags.page,
        perPage: flags['per-page'],
        hasMore: data.page_context?.has_more_page ?? false,
        count: data.taxes?.length ?? 0,
      })
    } catch (error: any) {
      this.handleApiError(error)
    }
  }
}
