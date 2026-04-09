import { Args } from '@oclif/core'
import { DeskBaseCommand } from '../../../desk-base-command.js'

export default class DeskAgentsDelete extends DeskBaseCommand<typeof DeskAgentsDelete> {
  static id = 'desk agents delete'
  static summary = 'Delete a Zoho Desk agent'

  static args = {
    id: Args.string({ description: 'Agent ID', required: true }),
  }

  async run(): Promise<void> {
    const { args } = this
    try {
      await this.deskDelete(`/agents/${args.id}`)
      this.outputSuccess(null, { action: 'desk.agents.delete' })
    } catch (error: any) {
      this.handleApiError(error)
    }
  }
}
