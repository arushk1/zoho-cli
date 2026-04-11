import { Args, Flags } from '@oclif/core'
import { DeskBaseCommand } from '../../../desk-base-command.js'

export default class DeskAgentsDelete extends DeskBaseCommand<typeof DeskAgentsDelete> {
  static id = 'desk agents delete'
  static summary = 'Delete a Zoho Desk agent'

  static args = {
    id: Args.string({ description: 'Agent ID', required: true }),
  }

  static flags = {
    'dry-run': Flags.boolean({ description: 'Preview without deleting', default: false }),
  }

  async run(): Promise<void> {
    const { args, flags } = this
    try {
      if (flags['dry-run']) {
        this.outputSuccess({ deleted: false, id: args.id, dryRun: true }, { action: 'desk.agents.delete.dry-run' })
        return
      }
      await this.deskDelete(`/agents/${args.id}`)
      this.outputSuccess(null, { action: 'desk.agents.delete' })
    } catch (error: any) {
      this.handleApiError(error)
    }
  }
}
