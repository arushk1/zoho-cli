import { DeskBaseCommand } from '../../../desk-base-command.js'

export default class DeskBusinessHoursList extends DeskBaseCommand<typeof DeskBusinessHoursList> {
  static id = 'desk business-hours list'
  static summary = 'List Zoho Desk business hours'

  async run(): Promise<void> {
    try {
      const data = await this.deskGet('/businessHours')
      this.outputSuccess(data.data ?? [], { action: 'desk.business-hours.list' })
    } catch (error: any) {
      this.handleApiError(error)
    }
  }
}
