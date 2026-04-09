import { Flags } from '@oclif/core'
import { DeskBaseCommand } from '../../../desk-base-command.js'

export default class DeskKbCategoriesList extends DeskBaseCommand<typeof DeskKbCategoriesList> {
  static id = 'desk kb-categories list'
  static summary = 'List Zoho Desk knowledge base categories'

  static flags = {
    page: Flags.integer({ description: 'Page number', default: 1 }),
    'per-page': Flags.integer({ description: 'Results per page', default: 100 }),
  }

  async run(): Promise<void> {
    const { flags } = this
    try {
      const params = DeskBaseCommand.paginationParams(flags)
      const data = await this.deskGet('/kbCategories', params)
      this.outputSuccess(data.data ?? [], { action: 'desk.kb-categories.list' })
    } catch (error: any) {
      this.handleApiError(error)
    }
  }
}
