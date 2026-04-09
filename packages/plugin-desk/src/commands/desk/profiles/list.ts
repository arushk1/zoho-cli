import { DeskBaseCommand } from '../../../desk-base-command.js'

export default class DeskProfilesList extends DeskBaseCommand<typeof DeskProfilesList> {
  static id = 'desk profiles list'
  static summary = 'List Zoho Desk profiles'

  async run(): Promise<void> {
    try {
      const data = await this.deskGet('/profiles')
      this.outputSuccess(data.data ?? [], { action: 'desk.profiles.list' })
    } catch (error: any) {
      this.handleApiError(error)
    }
  }
}
