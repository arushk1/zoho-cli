import { DeskBaseCommand } from '../../../desk-base-command.js'

export default class DeskAccountsCount extends DeskBaseCommand<typeof DeskAccountsCount> {
  static id = 'desk accounts count'
  static summary = 'Get the count of Zoho Desk accounts'

  async run(): Promise<void> {
    try {
      const data = await this.deskGet('/accounts/count')
      this.outputSuccess(data, { action: 'desk.accounts.count' })
    } catch (error: any) {
      this.handleApiError(error)
    }
  }
}
