import { Flags } from '@oclif/core'
import { DeskBaseCommand } from '../../../desk-base-command.js'

export default class DeskBlueprintsList extends DeskBaseCommand<typeof DeskBlueprintsList> {
  static id = 'desk blueprints list'
  static summary = 'List Zoho Desk blueprints'

  static flags = {
    department: Flags.string({ description: 'Filter by department ID' }),
  }

  async run(): Promise<void> {
    const { flags } = this
    try {
      const params: Record<string, string> = {}
      if (flags.department) params.departmentId = flags.department
      const data = await this.deskGet('/blueprints', params)
      this.outputSuccess(data.data ?? [], { action: 'desk.blueprints.list' })
    } catch (error: any) {
      this.handleApiError(error)
    }
  }
}
