import { DeskBaseCommand } from '../../../desk-base-command.js'

export default class DeskTagsCount extends DeskBaseCommand<typeof DeskTagsCount> {
  static id = 'desk tags count'
  static summary = 'Get count of Zoho Desk ticket tags'

  async run(): Promise<void> {
    try {
      const data = await this.deskGet('/ticketTags/count')
      this.outputSuccess(data, { action: 'desk.tags.count' })
    } catch (error: any) {
      this.handleApiError(error)
    }
  }
}
