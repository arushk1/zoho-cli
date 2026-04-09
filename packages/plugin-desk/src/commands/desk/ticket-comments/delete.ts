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
  }

  async run(): Promise<void> {
    const { args, flags } = this
    try {
      await this.deskDelete(`/tickets/${flags.ticket}/comments/${args.id}`)
      this.outputSuccess({ deleted: true, id: args.id }, { action: 'desk.ticket-comments.delete' })
    } catch (error: any) {
      this.handleApiError(error)
    }
  }
}
