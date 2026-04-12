import { Flags } from '@oclif/core'
import { DeskBaseCommand } from '../../../desk-base-command.js'

export default class DeskTicketsCount extends DeskBaseCommand<typeof DeskTicketsCount> {
  static id = 'desk tickets count'
  static summary = 'Get ticket count grouped by status'

  static flags = {
    'view-id': Flags.string({ description: 'View ID (required by Desk API)', required: true }),
    department: Flags.string({ description: 'Filter by department ID' }),
    status: Flags.string({ description: 'Filter by ticket status' }),
  }

  async run(): Promise<void> {
    const { flags } = this
    try {
      const params: Record<string, string> = {
        viewId: flags['view-id'],
      }
      if (flags.department) params.departmentId = flags.department
      if (flags.status) params.status = flags.status

      const data = await this.deskGet('/tickets/count', params)
      this.outputSuccess(data ?? {}, { action: 'desk.tickets.count' })
    } catch (error: any) {
      this.handleApiError(error)
    }
  }
}
