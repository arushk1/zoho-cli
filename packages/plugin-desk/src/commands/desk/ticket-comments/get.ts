import { Args, Flags } from '@oclif/core'
import { DeskBaseCommand } from '../../../desk-base-command.js'

export default class DeskTicketCommentsGet extends DeskBaseCommand<typeof DeskTicketCommentsGet> {
  static id = 'desk ticket-comments get'
  static summary = 'Get a specific comment for a ticket'

  static args = {
    id: Args.string({ description: 'Comment ID', required: true }),
  }

  static flags = {
    ticket: Flags.string({ description: 'Ticket ID', required: true, char: 't' }),
  }

  async run(): Promise<void> {
    const { args, flags } = this
    try {
      const data = await this.deskGet(`/tickets/${flags.ticket}/comments/${args.id}`)
      this.outputSuccess(data, { action: 'desk.ticket-comments.get' })
    } catch (error: any) {
      this.handleApiError(error)
    }
  }
}
