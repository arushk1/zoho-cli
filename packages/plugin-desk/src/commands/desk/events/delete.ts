import { Args, Flags } from '@oclif/core'
import { DeskBaseCommand } from '../../../desk-base-command.js'

export default class DeskEventsDelete extends DeskBaseCommand<typeof DeskEventsDelete> {
  static id = 'desk events delete'
  static summary = 'Delete a Zoho Desk event by ID'

  static args = {
    id: Args.string({ description: 'Event ID', required: true }),
  }

  static flags = {
    'dry-run': Flags.boolean({ description: 'Preview without deleting', default: false }),
  }

  async run(): Promise<void> {
    const { args, flags } = this
    try {
      if (flags['dry-run']) {
        this.outputSuccess({ deleted: false, id: args.id, dryRun: true }, { action: 'desk.events.delete.dry-run' })
        return
      }
      await this.deskDelete(`/events/${args.id}`)
      this.outputSuccess({ deleted: true, id: args.id }, { action: 'desk.events.delete' })
    } catch (error: any) {
      this.handleApiError(error)
    }
  }
}
