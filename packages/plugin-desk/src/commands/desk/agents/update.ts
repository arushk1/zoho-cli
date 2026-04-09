import { Args, Flags } from '@oclif/core'
import { DeskBaseCommand } from '../../../desk-base-command.js'

export default class DeskAgentsUpdate extends DeskBaseCommand<typeof DeskAgentsUpdate> {
  static id = 'desk agents update'
  static summary = 'Update a Zoho Desk agent'

  static args = {
    id: Args.string({ description: 'Agent ID', required: true }),
  }

  static flags = {
    data: Flags.string({ description: 'JSON data to update the agent', required: true, char: 'd' }),
    'dry-run': Flags.boolean({ description: 'Preview the request without updating', default: false }),
  }

  async run(): Promise<void> {
    const { args, flags } = this
    try {
      let body: unknown
      try {
        body = JSON.parse(flags.data)
      } catch {
        this.outputError('INVALID_JSON', 'The --data flag must be valid JSON')
        this.exit(3)
      }

      if (flags['dry-run']) {
        this.outputSuccess(body, { action: 'desk.agents.update.dry-run' })
        return
      }

      const data = await this.deskPatch(`/agents/${args.id}`, body)
      this.outputSuccess(data, { action: 'desk.agents.update' })
    } catch (error: any) {
      this.handleApiError(error)
    }
  }
}
