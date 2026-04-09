import { DeskBaseCommand } from '../../../desk-base-command.js'

export default class DeskEventsCount extends DeskBaseCommand<typeof DeskEventsCount> {
  static id = 'desk events count'
  static summary = 'Get count of Zoho Desk events'

  async run(): Promise<void> {
    try {
      const data = await this.deskGet('/events/count')
      this.outputSuccess(data, { action: 'desk.events.count' })
    } catch (error: any) {
      this.handleApiError(error)
    }
  }
}
