import { Flags } from '@oclif/core'
import { DeskBaseCommand } from '../../../desk-base-command.js'

export default class DeskTicketsSearch extends DeskBaseCommand<typeof DeskTicketsSearch> {
  static id = 'desk tickets search'
  static summary = 'Search Zoho Desk tickets'

  static flags = {
    query: Flags.string({ description: 'Search query string', required: true }),
    page: Flags.integer({ description: 'Page number', default: 1 }),
    'per-page': Flags.integer({ description: 'Results per page', default: 100 }),
    department: Flags.string({ description: 'Filter by department ID' }),
    'sort-by': Flags.string({ description: 'Field to sort by' }),
  }

  async run(): Promise<void> {
    const { flags } = this
    try {
      const params: Record<string, string> = {
        ...DeskBaseCommand.paginationParams(flags),
        query: flags.query,
      }
      if (flags.department) params.departmentId = flags.department
      if (flags['sort-by']) params.sortBy = flags['sort-by']

      const data = await this.deskGet('/tickets/search', params)
      this.outputSuccess(data.data ?? [], { action: 'desk.tickets.search' })
    } catch (error: any) {
      this.handleApiError(error)
    }
  }
}
