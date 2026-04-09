import { Flags } from '@oclif/core'
import { DeskBaseCommand } from '../../../desk-base-command.js'

export default class DeskEventsList extends DeskBaseCommand<typeof DeskEventsList> {
  static id = 'desk events list'
  static summary = 'List Zoho Desk events'

  static flags = {
    page: Flags.integer({ description: 'Page number', default: 1 }),
    'per-page': Flags.integer({ description: 'Results per page', default: 100 }),
    department: Flags.string({ description: 'Filter by department ID' }),
    assignee: Flags.string({ description: 'Filter by assignee' }),
  }

  async run(): Promise<void> {
    const { flags } = this
    try {
      const params: Record<string, string> = {
        ...DeskBaseCommand.paginationParams(flags),
      }
      if (flags.department) params.departmentId = flags.department
      if (flags.assignee) params.assignee = flags.assignee

      const data = await this.deskGet('/events', params)
      this.outputSuccess(data.data ?? [], { action: 'desk.events.list' })
    } catch (error: any) {
      this.handleApiError(error)
    }
  }
}
