import { Args } from '@oclif/core'
import { DeskBaseCommand } from '../../../desk-base-command.js'

export default class DeskEventsGet extends DeskBaseCommand<typeof DeskEventsGet> {
  static id = 'desk events get'
  static summary = 'Get a Zoho Desk event by ID'

  static args = {
    id: Args.string({ description: 'Event ID', required: true }),
  }

  async run(): Promise<void> {
    const { args } = this
    try {
      const data = await this.deskGet(`/events/${args.id}`)
      this.outputSuccess(data, { action: 'desk.events.get' })
    } catch (error: any) {
      this.handleApiError(error)
    }
  }
}
