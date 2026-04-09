import { Flags } from '@oclif/core'
import { DeskBaseCommand } from '../../../desk-base-command.js'

export default class DeskActivitiesList extends DeskBaseCommand<typeof DeskActivitiesList> {
  static id = 'desk activities list'
  static summary = 'List Zoho Desk activities'

  static flags = {
    page: Flags.integer({ description: 'Page number', default: 1 }),
    'per-page': Flags.integer({ description: 'Results per page', default: 100 }),
    department: Flags.string({ description: 'Filter by department ID' }),
    type: Flags.string({ description: 'Filter by activity type (TASK, CALL, EVENT)' }),
  }

  async run(): Promise<void> {
    const { flags } = this
    try {
      const params: Record<string, string> = {
        ...DeskBaseCommand.paginationParams(flags),
      }
      if (flags.department) params.departmentId = flags.department
      if (flags.type) params.type = flags.type

      const data = await this.deskGet('/activities', params)
      this.outputSuccess(data.data ?? [], { action: 'desk.activities.list' })
    } catch (error: any) {
      this.handleApiError(error)
    }
  }
}
