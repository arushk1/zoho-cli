import { Args, Flags } from '@oclif/core'
import { DeskBaseCommand } from '../../../desk-base-command.js'

export default class DeskTicketAttachmentsGet extends DeskBaseCommand<typeof DeskTicketAttachmentsGet> {
  static id = 'desk ticket-attachments get'
  static summary = 'Get a specific attachment for a Zoho Desk ticket'

  static args = {
    id: Args.string({ description: 'Attachment ID', required: true }),
  }

  static flags = {
    ticket: Flags.string({ description: 'Ticket ID', required: true, char: 't' }),
  }

  async run(): Promise<void> {
    const { args, flags } = this
    try {
      const data = await this.deskGet(`/tickets/${flags.ticket}/attachments/${args.id}`)
      this.outputSuccess(data, { action: 'desk.ticket-attachments.get' })
    } catch (error: any) {
      this.handleApiError(error)
    }
  }
}
