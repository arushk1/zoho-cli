import { Flags } from '@oclif/core'
import { BooksBaseCommand } from '../../../books-base-command.js'

export default class BooksTimeEntriesList extends BooksBaseCommand<typeof BooksTimeEntriesList> {
  static id = 'books time-entries list'
  static summary = 'List time entries'

  static flags = {
    'project-id': Flags.string({ description: 'Filter by project ID' }),
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
      if (flags['project-id']) params.project_id = flags['project-id']

      const data = await this.booksGet('/projects/timeentries', params)
      this.outputSuccess(data.time_entries ?? [], {
        action: 'books.time-entries.list',
        page: flags.page,
        perPage: flags['per-page'],
        hasMore: data.page_context?.has_more_page ?? false,
        count: data.time_entries?.length ?? 0,
      })
    } catch (error: any) {
      this.handleApiError(error)
    }
  }
}
