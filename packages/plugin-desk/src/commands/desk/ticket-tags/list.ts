import { Flags } from '@oclif/core'
import { DeskBaseCommand } from '../../../desk-base-command.js'

export default class DeskTicketTagsList extends DeskBaseCommand<typeof DeskTicketTagsList> {
  static id = 'desk ticket-tags list'
  static summary = 'List tags for a Zoho Desk ticket'

  static flags = {
    ticket: Flags.string({ description: 'Ticket ID', required: true, char: 't' }),
  }

  async run(): Promise<void> {
    const { flags } = this
    try {
      const data = await this.deskGet(`/tickets/${flags.ticket}/tags`)
      this.outputSuccess(data ?? [], { action: 'desk.ticket-tags.list' })
    } catch (error: any) {
      this.handleApiError(error)
    }
  }
}
