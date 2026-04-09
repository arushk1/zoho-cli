import { Flags } from '@oclif/core'
import { DeskBaseCommand } from '../../../desk-base-command.js'

export default class DeskTicketAttachmentsList extends DeskBaseCommand<typeof DeskTicketAttachmentsList> {
  static id = 'desk ticket-attachments list'
  static summary = 'List attachments for a Zoho Desk ticket'

  static flags = {
    ticket: Flags.string({ description: 'Ticket ID', required: true, char: 't' }),
  }

  async run(): Promise<void> {
    const { flags } = this
    try {
      const data = await this.deskGet(`/tickets/${flags.ticket}/attachments`)
      this.outputSuccess(data.data ?? [], { action: 'desk.ticket-attachments.list' })
    } catch (error: any) {
      this.handleApiError(error)
    }
  }
}
