import { Args, Flags } from '@oclif/core'
import { DeskBaseCommand } from '../../../desk-base-command.js'

export default class DeskTicketCommentsDelete extends DeskBaseCommand<typeof DeskTicketCommentsDelete> {
  static id = 'desk ticket-comments delete'
  static summary = 'Delete a comment from a ticket'

  static args = {
    id: Args.string({ description: 'Comment ID', required: true }),
  }

  static flags = {
    ticket: Flags.string({ description: 'Ticket ID', required: true, char: 't' }),
    'dry-run': Flags.boolean({ description: 'Preview without deleting', default: false }),
  }

  async run(): Promise<void> {
    const { args, flags } = this
    try {
      if (flags['dry-run']) {
        this.outputSuccess({ deleted: false, id: args.id, ticket: flags.ticket, dryRun: true }, { action: 'desk.ticket-comments.delete.dry-run' })
        return
      }
      await this.deskDelete(`/tickets/${flags.ticket}/comments/${args.id}`)
      this.outputSuccess({ deleted: true, id: args.id }, { action: 'desk.ticket-comments.delete' })
    } catch (error: any) {
      this.handleApiError(error)
    }
  }
}
