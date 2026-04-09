import { Flags } from '@oclif/core'
import { DeskBaseCommand } from '../../../desk-base-command.js'

export default class DeskArticlesList extends DeskBaseCommand<typeof DeskArticlesList> {
  static id = 'desk articles list'
  static summary = 'List Zoho Desk knowledge base articles'

  static flags = {
    page: Flags.integer({ description: 'Page number', default: 1 }),
    'per-page': Flags.integer({ description: 'Results per page', default: 100 }),
    'category-id': Flags.string({ description: 'Filter by category ID' }),
    'section-id': Flags.string({ description: 'Filter by section ID' }),
    status: Flags.string({ description: 'Filter by article status' }),
  }

  async run(): Promise<void> {
    const { flags } = this
    try {
      const params: Record<string, string> = {
        ...DeskBaseCommand.paginationParams(flags),
      }
      if (flags['category-id']) params.categoryId = flags['category-id']
      if (flags['section-id']) params.sectionId = flags['section-id']
      if (flags.status) params.status = flags.status

      const data = await this.deskGet('/articles', params)
      this.outputSuccess(data.data ?? [], { action: 'desk.articles.list' })
    } catch (error: any) {
      this.handleApiError(error)
    }
  }
}
