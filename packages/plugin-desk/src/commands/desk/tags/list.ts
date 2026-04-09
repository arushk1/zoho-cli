import { Flags } from '@oclif/core'
import { DeskBaseCommand } from '../../../desk-base-command.js'

export default class DeskTagsList extends DeskBaseCommand<typeof DeskTagsList> {
  static id = 'desk tags list'
  static summary = 'List Zoho Desk ticket tags'

  static flags = {
    page: Flags.integer({ description: 'Page number', default: 1 }),
    'per-page': Flags.integer({ description: 'Results per page', default: 100 }),
    department: Flags.string({ description: 'Filter by department ID' }),
  }

  async run(): Promise<void> {
    const { flags } = this
    try {
      const params: Record<string, string> = {
        ...DeskBaseCommand.paginationParams(flags),
      }
      if (flags.department) params.departmentId = flags.department
      const data = await this.deskGet('/ticketTags', params)
      this.outputSuccess(data.data ?? [], { action: 'desk.tags.list' })
    } catch (error: any) {
      this.handleApiError(error)
    }
  }
}
