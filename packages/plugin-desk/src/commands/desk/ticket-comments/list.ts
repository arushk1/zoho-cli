import { Flags } from '@oclif/core'
import { DeskBaseCommand } from '../../../desk-base-command.js'

export default class DeskTicketCommentsList extends DeskBaseCommand<typeof DeskTicketCommentsList> {
  static id = 'desk ticket-comments list'
  static summary = 'List comments for a ticket'

  static flags = {
    ticket: Flags.string({ description: 'Ticket ID', required: true, char: 't' }),
    page: Flags.integer({ description: 'Page number', default: 1 }),
    'per-page': Flags.integer({ description: 'Records per page (max 100)', default: 100 }),
  }

  async run(): Promise<void> {
    const { flags } = this
    try {
      const params = { ...DeskBaseCommand.paginationParams(flags) }
      const data = await this.deskGet(`/tickets/${flags.ticket}/comments`, params)
      this.outputSuccess(data.data ?? [], { action: 'desk.ticket-comments.list', page: flags.page, perPage: flags['per-page'], count: data.data?.length ?? 0 })
    } catch (error: any) {
      this.handleApiError(error)
    }
  }
}
