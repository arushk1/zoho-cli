import { DeskBaseCommand } from '../../../desk-base-command.js'

export default class DeskAgentsMe extends DeskBaseCommand<typeof DeskAgentsMe> {
  static id = 'desk agents me'
  static summary = 'Get the currently authenticated agent\'s info'

  async run(): Promise<void> {
    try {
      const data = await this.deskGet('/myinfo')
      this.outputSuccess(data, { action: 'desk.agents.me' })
    } catch (error: any) {
      this.handleApiError(error)
    }
  }
}
