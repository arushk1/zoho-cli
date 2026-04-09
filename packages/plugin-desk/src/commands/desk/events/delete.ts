import { Args } from '@oclif/core'
import { DeskBaseCommand } from '../../../desk-base-command.js'

export default class DeskEventsDelete extends DeskBaseCommand<typeof DeskEventsDelete> {
  static id = 'desk events delete'
  static summary = 'Delete a Zoho Desk event by ID'

  static args = {
    id: Args.string({ description: 'Event ID', required: true }),
  }

  async run(): Promise<void> {
    const { args } = this
    try {
      await this.deskDelete(`/events/${args.id}`)
      this.outputSuccess({ deleted: true, id: args.id }, { action: 'desk.events.delete' })
    } catch (error: any) {
      this.handleApiError(error)
    }
  }
}
