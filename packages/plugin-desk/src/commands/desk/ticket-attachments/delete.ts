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
    'dry-run': Flags.boolean({ description: 'Preview without deleting', default: false }),
  }

  async run(): Promise<void> {
    const { args, flags } = this
    try {
      if (flags['dry-run']) {
        this.outputSuccess({ deleted: false, id: args.id, ticket: flags.ticket, dryRun: true }, { action: 'desk.ticket-attachments.delete.dry-run' })
        return
      }
      await this.deskDelete(`/tickets/${flags.ticket}/attachments/${args.id}`)
      this.outputSuccess({ deleted: true, id: args.id }, { action: 'desk.ticket-attachments.delete' })
    } catch (error: any) {
      this.handleApiError(error)
    }
  }
}
