import { Flags } from '@oclif/core'
import { DeskBaseCommand } from '../../../desk-base-command.js'

export default class DeskAgentsList extends DeskBaseCommand<typeof DeskAgentsList> {
  static id = 'desk agents list'
  static summary = 'List Zoho Desk agents'

  static flags = {
    page: Flags.integer({ description: 'Page number', default: 1 }),
    'per-page': Flags.integer({ description: 'Results per page', default: 100 }),
    department: Flags.string({ description: 'Filter by department ID' }),
    status: Flags.string({ description: 'Filter by agent status' }),
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
      if (flags.fields) params.fields = flags.fields

      const data = await this.deskGet('/agents', params)
      this.outputSuccess(data.data ?? [], { action: 'desk.agents.list' })
    } catch (error: any) {
      this.handleApiError(error)
    }
  }
}
