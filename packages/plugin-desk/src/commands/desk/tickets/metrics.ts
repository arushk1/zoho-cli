import { Args } from '@oclif/core'
import { DeskBaseCommand } from '../../../desk-base-command.js'

export default class DeskTicketsMetrics extends DeskBaseCommand<typeof DeskTicketsMetrics> {
  static id = 'desk tickets metrics'
  static summary = 'Get metrics for a ticket'

  static args = {
    id: Args.string({ description: 'Ticket ID', required: true }),
  }

  async run(): Promise<void> {
    const { args } = this
    try {
      const data = await this.deskGet(`/tickets/${args.id}/metrics`)
      this.outputSuccess(data ?? {}, { action: 'desk.tickets.metrics' })
    } catch (error: any) {
      this.handleApiError(error)
    }
  }
}
