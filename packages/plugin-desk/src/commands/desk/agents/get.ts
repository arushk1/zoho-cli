import { Args } from '@oclif/core'
import { DeskBaseCommand } from '../../../desk-base-command.js'

export default class DeskAgentsGet extends DeskBaseCommand<typeof DeskAgentsGet> {
  static id = 'desk agents get'
  static summary = 'Get a Zoho Desk agent by ID'

  static args = {
    id: Args.string({ description: 'Agent ID', required: true }),
  }

  async run(): Promise<void> {
    const { args } = this
    try {
      const data = await this.deskGet(`/agents/${args.id}`)
      this.outputSuccess(data, { action: 'desk.agents.get' })
    } catch (error: any) {
      this.handleApiError(error)
    }
  }
}
