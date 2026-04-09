import { Args, Flags } from '@oclif/core'
import { DeskBaseCommand } from '../../../desk-base-command.js'

export default class DeskTicketsHistory extends DeskBaseCommand<typeof DeskTicketsHistory> {
  static id = 'desk tickets history'
  static summary = 'Get the history of a ticket'

  static args = {
    id: Args.string({ description: 'Ticket ID', required: true }),
  }

  static flags = {
    page: Flags.integer({ description: 'Page number', default: 1 }),
    'per-page': Flags.integer({ description: 'Results per page', default: 100 }),
  }

  async run(): Promise<void> {
    const { args, flags } = this
    try {
      const params: Record<string, string> = {
        ...DeskBaseCommand.paginationParams(flags),
      }

      const data = await this.deskGet(`/tickets/${args.id}/history`, params)
      this.outputSuccess(data.data ?? [], { action: 'desk.tickets.history' })
    } catch (error: any) {
      this.handleApiError(error)
    }
  }
}
