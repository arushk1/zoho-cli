import { DeskBaseCommand } from '../../../desk-base-command.js'

export default class DeskAgentsCount extends DeskBaseCommand<typeof DeskAgentsCount> {
  static id = 'desk agents count'
  static summary = 'Get the count of Zoho Desk agents'

  async run(): Promise<void> {
    try {
      const data = await this.deskGet('/agents/count')
      this.outputSuccess(data, { action: 'desk.agents.count' })
    } catch (error: any) {
      this.handleApiError(error)
    }
  }
}
