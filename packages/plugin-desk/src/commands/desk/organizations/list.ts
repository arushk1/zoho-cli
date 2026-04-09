import { DeskBaseCommand } from '../../../desk-base-command.js'

export default class DeskOrganizationsList extends DeskBaseCommand<typeof DeskOrganizationsList> {
  static id = 'desk organizations list'
  static summary = 'List Zoho Desk organizations'

  async run(): Promise<void> {
    try {
      const data = await this.deskGet('/organizations')
      this.outputSuccess(data.data ?? [], { action: 'desk.organizations.list' })
    } catch (error: any) {
      this.handleApiError(error)
    }
  }
}
