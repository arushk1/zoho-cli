import { Args } from '@oclif/core'
import { DeskBaseCommand } from '../../../../desk-base-command.js'

export default class DeskTicketsResolutionDelete extends DeskBaseCommand<typeof DeskTicketsResolutionDelete> {
  static id = 'desk tickets resolution delete'
  static summary = 'Delete the resolution of a ticket'

  static args = {
    id: Args.string({ description: 'Ticket ID', required: true }),
  }

  async run(): Promise<void> {
    const { args } = this
    try {
      const data = await this.deskDelete(`/tickets/${args.id}/resolution`)
      this.outputSuccess(data ?? {}, { action: 'desk.tickets.resolution.delete' })
    } catch (error: any) {
      this.handleApiError(error)
    }
  }
}
