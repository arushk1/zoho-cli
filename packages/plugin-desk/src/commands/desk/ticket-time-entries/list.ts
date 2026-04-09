import { Flags } from '@oclif/core'
import { DeskBaseCommand } from '../../../desk-base-command.js'

export default class DeskTicketTimeEntriesList extends DeskBaseCommand<typeof DeskTicketTimeEntriesList> {
  static id = 'desk ticket-time-entries list'
  static summary = 'List time entries for a Zoho Desk ticket'

  static flags = {
    ticket: Flags.string({ description: 'Ticket ID', required: true, char: 't' }),
    page: Flags.integer({ description: 'Page number', default: 1 }),
    'per-page': Flags.integer({ description: 'Results per page', default: 100 }),
  }

  async run(): Promise<void> {
    const { flags } = this
    try {
      const params = DeskBaseCommand.paginationParams(flags)
      const data = await this.deskGet(`/tickets/${flags.ticket}/timeEntry`, params)
      this.outputSuccess(data.data ?? [], { action: 'desk.ticket-time-entries.list' })
    } catch (error: any) {
      this.handleApiError(error)
    }
  }
}
