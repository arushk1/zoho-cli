import { Args } from '@oclif/core'
import { DeskBaseCommand } from '../../../desk-base-command.js'

export default class DeskAgentsActivate extends DeskBaseCommand<typeof DeskAgentsActivate> {
  static id = 'desk agents activate'
  static summary = 'Activate a Zoho Desk agent'

  static args = {
    id: Args.string({ description: 'Agent ID', required: true }),
  }

  async run(): Promise<void> {
    const { args } = this
    try {
      const data = await this.deskPost(`/agents/${args.id}/activate`)
      this.outputSuccess(data, { action: 'desk.agents.activate' })
    } catch (error: any) {
      this.handleApiError(error)
    }
  }
}
