import { Args } from '@oclif/core'
import { DeskBaseCommand } from '../../../desk-base-command.js'

export default class DeskTicketsBlueprint extends DeskBaseCommand<typeof DeskTicketsBlueprint> {
  static id = 'desk tickets blueprint'
  static summary = 'Get the blueprint of a ticket'

  static args = {
    id: Args.string({ description: 'Ticket ID', required: true }),
  }

  async run(): Promise<void> {
    const { args } = this
    try {
      const data = await this.deskGet(`/tickets/${args.id}/blueprint`)
      this.outputSuccess(data ?? {}, { action: 'desk.tickets.blueprint' })
    } catch (error: any) {
      this.handleApiError(error)
    }
  }
}
