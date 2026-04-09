import { Args, Flags } from '@oclif/core'
import { DeskBaseCommand } from '../../../desk-base-command.js'

export default class DeskTicketAttachmentsDownload extends DeskBaseCommand<typeof DeskTicketAttachmentsDownload> {
  static id = 'desk ticket-attachments download'
  static summary = 'Download an attachment from a Zoho Desk ticket'

  static args = {
    id: Args.string({ description: 'Attachment ID', required: true }),
  }

  static flags = {
    ticket: Flags.string({ description: 'Ticket ID', required: true, char: 't' }),
    output: Flags.string({ description: 'Output file path', required: true, char: 'o' }),
  }

  async run(): Promise<void> {
    const { args, flags } = this
    try {
      await this.deskDownload(`/tickets/${flags.ticket}/attachments/${args.id}/content`, flags.output)
      this.outputSuccess({ downloaded: true, path: flags.output }, { action: 'desk.ticket-attachments.download' })
    } catch (error: any) {
      this.handleApiError(error)
    }
  }
}
