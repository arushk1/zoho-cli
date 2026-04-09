import { DeskBaseCommand } from '../../../desk-base-command.js'

export default class DeskRolesList extends DeskBaseCommand<typeof DeskRolesList> {
  static id = 'desk roles list'
  static summary = 'List Zoho Desk roles'

  async run(): Promise<void> {
    try {
      const data = await this.deskGet('/roles')
      this.outputSuccess(data.data ?? [], { action: 'desk.roles.list' })
    } catch (error: any) {
      this.handleApiError(error)
    }
  }
}
