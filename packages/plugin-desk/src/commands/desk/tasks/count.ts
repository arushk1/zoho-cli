import { Flags } from '@oclif/core'
import { DeskBaseCommand } from '../../../desk-base-command.js'

export default class DeskTasksCount extends DeskBaseCommand<typeof DeskTasksCount> {
  static id = 'desk tasks count'
  static summary = 'Get count of Zoho Desk tasks'

  static flags = {
    department: Flags.string({ description: 'Filter by department ID' }),
    status: Flags.string({ description: 'Filter by task status' }),
  }

  async run(): Promise<void> {
    const { flags } = this
    try {
      const params: Record<string, string> = {}
      if (flags.department) params.departmentId = flags.department
      if (flags.status) params.status = flags.status

      const data = await this.deskGet('/tasks/count', params)
      this.outputSuccess(data, { action: 'desk.tasks.count' })
    } catch (error: any) {
      this.handleApiError(error)
    }
  }
}
