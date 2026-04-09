import { DeskBaseCommand } from '../../../desk-base-command.js'

export default class DeskActivitiesCount extends DeskBaseCommand<typeof DeskActivitiesCount> {
  static id = 'desk activities count'
  static summary = 'Get count of Zoho Desk activities'

  async run(): Promise<void> {
    try {
      const data = await this.deskGet('/activities/count')
      this.outputSuccess(data, { action: 'desk.activities.count' })
    } catch (error: any) {
      this.handleApiError(error)
    }
  }
}
