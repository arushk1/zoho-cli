import { Args } from '@oclif/core'
import { DeskBaseCommand } from '../../../../desk-base-command.js'

export default class DeskTicketsResolutionGet extends DeskBaseCommand<typeof DeskTicketsResolutionGet> {
  static id = 'desk tickets resolution get'
  static summary = 'Get the resolution of a ticket'

  static args = {
    id: Args.string({ description: 'Ticket ID', required: true }),
  }

  async run(): Promise<void> {
    const { args } = this
    try {
      const data = await this.deskGet(`/tickets/${args.id}/resolution`)
      this.outputSuccess(data ?? {}, { action: 'desk.tickets.resolution.get' })
    } catch (error: any) {
      this.handleApiError(error)
    }
  }
}
