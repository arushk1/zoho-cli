import { Flags } from '@oclif/core'
import { DeskBaseCommand } from '../../../desk-base-command.js'

export default class DeskKbSectionsList extends DeskBaseCommand<typeof DeskKbSectionsList> {
  static id = 'desk kb-sections list'
  static summary = 'List Zoho Desk knowledge base sections'

  static flags = {
    page: Flags.integer({ description: 'Page number', default: 1 }),
    'per-page': Flags.integer({ description: 'Results per page', default: 100 }),
    'category-id': Flags.string({ description: 'Filter by category ID' }),
  }

  async run(): Promise<void> {
    const { flags } = this
    try {
      const params: Record<string, string> = {
        ...DeskBaseCommand.paginationParams(flags),
      }
      if (flags['category-id']) params.categoryId = flags['category-id']
      const data = await this.deskGet('/kbSections', params)
      this.outputSuccess(data.data ?? [], { action: 'desk.kb-sections.list' })
    } catch (error: any) {
      this.handleApiError(error)
    }
  }
}
