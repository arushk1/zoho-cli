import { DeskBaseCommand } from '../../../desk-base-command.js'

export default class DeskCallsCount extends DeskBaseCommand<typeof DeskCallsCount> {
  static id = 'desk calls count'
  static summary = 'Get count of Zoho Desk calls'

  async run(): Promise<void> {
    try {
      const data = await this.deskGet('/calls/count')
      this.outputSuccess(data, { action: 'desk.calls.count' })
    } catch (error: any) {
      this.handleApiError(error)
    }
  }
}
