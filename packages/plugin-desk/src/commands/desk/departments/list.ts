import { Flags } from '@oclif/core'
import { DeskBaseCommand } from '../../../desk-base-command.js'

export default class DeskDepartmentsList extends DeskBaseCommand<typeof DeskDepartmentsList> {
  static id = 'desk departments list'
  static summary = 'List Zoho Desk departments'

  static flags = {
    page: Flags.integer({ description: 'Page number', default: 1 }),
    'per-page': Flags.integer({ description: 'Results per page', default: 100 }),
  }

  async run(): Promise<void> {
    const { flags } = this
    try {
      const params: Record<string, string> = {
        ...DeskBaseCommand.paginationParams(flags),
      }

      const data = await this.deskGet('/departments', params)
      this.outputSuccess(data.data ?? [], { action: 'desk.departments.list' })
    } catch (error: any) {
      this.handleApiError(error)
    }
  }
}
