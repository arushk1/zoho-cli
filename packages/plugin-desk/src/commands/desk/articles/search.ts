import { Flags } from '@oclif/core'
import { DeskBaseCommand } from '../../../desk-base-command.js'

export default class DeskArticlesSearch extends DeskBaseCommand<typeof DeskArticlesSearch> {
  static id = 'desk articles search'
  static summary = 'Search Zoho Desk knowledge base articles'

  static flags = {
    query: Flags.string({ description: 'Search query', required: true }),
    page: Flags.integer({ description: 'Page number', default: 1 }),
    'per-page': Flags.integer({ description: 'Results per page', default: 100 }),
  }

  async run(): Promise<void> {
    const { flags } = this
    try {
      const params: Record<string, string> = {
        query: flags.query,
        ...DeskBaseCommand.paginationParams(flags),
      }
      const data = await this.deskGet('/articles/search', params)
      this.outputSuccess(data.data ?? [], { action: 'desk.articles.search' })
    } catch (error: any) {
      this.handleApiError(error)
    }
  }
}
