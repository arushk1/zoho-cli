import { Flags } from '@oclif/core'
import { DeskBaseCommand } from '../../../desk-base-command.js'

export default class DeskTasksList extends DeskBaseCommand<typeof DeskTasksList> {
  static id = 'desk tasks list'
  static summary = 'List Zoho Desk tasks'

  static flags = {
    page: Flags.integer({ description: 'Page number', default: 1 }),
    'per-page': Flags.integer({ description: 'Results per page', default: 100 }),
    department: Flags.string({ description: 'Filter by department ID' }),
    status: Flags.string({ description: 'Filter by task status' }),
    assignee: Flags.string({ description: 'Filter by assignee' }),
    'sort-by': Flags.string({ description: 'Field to sort by' }),
    fields: Flags.string({ description: 'Comma-separated list of fields to return' }),
  }

  async run(): Promise<void> {
    const { flags } = this
    try {
      const params: Record<string, string> = {
        ...DeskBaseCommand.paginationParams(flags),
      }
      if (flags.department) params.departmentId = flags.department
      if (flags.status) params.status = flags.status
      if (flags.assignee) params.assignee = flags.assignee
      if (flags['sort-by']) params.sortBy = flags['sort-by']
      if (flags.fields) params.fields = flags.fields

      const data = await this.deskGet('/tasks', params)
      this.outputSuccess(data.data ?? [], { action: 'desk.tasks.list' })
    } catch (error: any) {
      this.handleApiError(error)
    }
  }
}
