import { Flags } from '@oclif/core'
import { DeskBaseCommand } from '../../../desk-base-command.js'

export default class DeskLayoutsList extends DeskBaseCommand<typeof DeskLayoutsList> {
  static id = 'desk layouts list'
  static summary = 'List Zoho Desk layouts'

  static flags = {
    department: Flags.string({ description: 'Filter by department ID' }),
  }

  async run(): Promise<void> {
    const { flags } = this
    try {
      const params: Record<string, string> = {}
      if (flags.department) params.departmentId = flags.department
      const data = await this.deskGet('/layouts', params)
      this.outputSuccess(data.data ?? [], { action: 'desk.layouts.list' })
    } catch (error: any) {
      this.handleApiError(error)
    }
  }
}
