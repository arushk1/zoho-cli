import { Args, Flags } from '@oclif/core'
import { DeskBaseCommand } from '../../../desk-base-command.js'

export default class DeskAgentsGet extends DeskBaseCommand<typeof DeskAgentsGet> {
  static id = 'desk agents get'
  static summary = 'Get a Zoho Desk agent by ID'

  static args = {
    id: Args.string({ description: 'Agent ID', required: true }),
  }

  static flags = {
    fields: Flags.string({ description: 'Comma-separated list of fields to return' }),
  }

  async run(): Promise<void> {
    const { args, flags } = this
    try {
      const params: Record<string, string> = {}
      if (flags.fields) params.fields = flags.fields

      const data = await this.deskGet(`/agents/${args.id}`, params)
      this.outputSuccess(data, { action: 'desk.agents.get' })
    } catch (error: any) {
      this.handleApiError(error)
    }
  }
}
