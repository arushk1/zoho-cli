import { DeskBaseCommand } from '../../../desk-base-command.js'

export default class DeskContactsCount extends DeskBaseCommand<typeof DeskContactsCount> {
  static id = 'desk contacts count'
  static summary = 'Get the count of Zoho Desk contacts'

  async run(): Promise<void> {
    try {
      const data = await this.deskGet('/contacts/count')
      this.outputSuccess(data, { action: 'desk.contacts.count' })
    } catch (error: any) {
      this.handleApiError(error)
    }
  }
}
