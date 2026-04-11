import { Flags } from '@oclif/core'
import { DeskBaseCommand } from '../../../desk-base-command.js'

export default class DeskTicketsList extends DeskBaseCommand<typeof DeskTicketsList> {
  static id = 'desk tickets list'
  static summary = 'List Zoho Desk tickets'

  static flags = {
    page: Flags.integer({ description: 'Page number', default: 1 }),
    'per-page': Flags.integer({ description: 'Results per page', default: 100 }),
    department: Flags.string({ description: 'Filter by department ID' }),
    assignee: Flags.string({ description: 'Filter by assignee' }),
    status: Flags.string({ description: 'Filter by ticket status' }),
    'sort-by': Flags.string({ description: 'Field to sort by' }),
    'sort-order': Flags.string({ description: 'Sort order', options: ['asc', 'desc'] }),
    'view-id': Flags.string({ description: 'Filter by view ID' }),
    fields: Flags.string({ description: 'Comma-separated list of fields to return' }),
  }

  async run(): Promise<void> {
    const { flags } = this
    try {
      const params: Record<string, string> = {
        ...DeskBaseCommand.paginationParams(flags),
      }
      if (flags.department) params.departmentId = flags.department
      if (flags.assignee) params.assignee = flags.assignee
      if (flags.status) params.status = flags.status
      if (flags['sort-by']) params.sortBy = flags['sort-by']
      if (flags['sort-order']) params.sortOrder = flags['sort-order']
      if (flags['view-id']) params.viewId = flags['view-id']
      if (flags.fields) params.fields = flags.fields

      const data = await this.deskGet('/tickets', params)
      this.outputSuccess(data.data ?? [], { action: 'desk.tickets.list' })
    } catch (error: any) {
      this.handleApiError(error)
    }
  }
}
