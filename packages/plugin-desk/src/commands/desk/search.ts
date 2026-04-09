import { Flags } from '@oclif/core'
import { DeskBaseCommand } from '../../desk-base-command.js'

export default class DeskSearch extends DeskBaseCommand<typeof DeskSearch> {
  static id = 'desk search'
  static summary = 'Search across Zoho Desk entities'

  static flags = {
    query: Flags.string({ description: 'Search query', required: true }),
    module: Flags.string({ description: 'Module to search in (tickets/contacts/accounts/etc.)' }),
    page: Flags.integer({ description: 'Page number', default: 1 }),
    'per-page': Flags.integer({ description: 'Results per page', default: 100 }),
    'sort-by': Flags.string({ description: 'Field to sort by' }),
  }

  async run(): Promise<void> {
    const { flags } = this
    try {
      const params: Record<string, string> = {
        query: flags.query,
        ...DeskBaseCommand.paginationParams(flags),
      }
      if (flags.module) params.module = flags.module
      if (flags['sort-by']) params.sortBy = flags['sort-by']
      const data = await this.deskGet('/search', params)
      this.outputSuccess(data.data ?? [], { action: 'desk.search' })
    } catch (error: any) {
      this.handleApiError(error)
    }
  }
}
