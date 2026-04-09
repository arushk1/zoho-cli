import { DeskBaseCommand } from '../../../desk-base-command.js'

export default class DeskTeamsList extends DeskBaseCommand<typeof DeskTeamsList> {
  static id = 'desk teams list'
  static summary = 'List Zoho Desk teams'

  async run(): Promise<void> {
    try {
      const data = await this.deskGet('/teams')
      this.outputSuccess(data.data ?? [], { action: 'desk.teams.list' })
    } catch (error: any) {
      this.handleApiError(error)
    }
  }
}
