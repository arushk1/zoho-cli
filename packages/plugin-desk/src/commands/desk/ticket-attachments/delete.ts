import { Args, Flags } from '@oclif/core'
import { DeskBaseCommand } from '../../../desk-base-command.js'

export default class DeskTicketAttachmentsDelete extends DeskBaseCommand<typeof DeskTicketAttachmentsDelete> {
  static id = 'desk ticket-attachments delete'
  static summary = 'Delete an attachment from a Zoho Desk ticket'

  static args = {
    id: Args.string({ description: 'Attachment ID', required: true }),
  }

  static flags = {
    ticket: Flags.string({ description: 'Ticket ID', required: true, char: 't' }),
  }

  async run(): Promise<void> {
    const { args, flags } = this
    try {
      await this.deskDelete(`/tickets/${flags.ticket}/attachments/${args.id}`)
      this.outputSuccess({ deleted: true, id: args.id }, { action: 'desk.ticket-attachments.delete' })
    } catch (error: any) {
      this.handleApiError(error)
    }
  }
}
