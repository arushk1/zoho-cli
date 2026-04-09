import { Args, Flags } from '@oclif/core'
import { DeskBaseCommand } from '../../../desk-base-command.js'

export default class DeskTicketTagsRemove extends DeskBaseCommand<typeof DeskTicketTagsRemove> {
  static id = 'desk ticket-tags remove'
  static summary = 'Remove a tag from a Zoho Desk ticket'

  static args = {
    id: Args.string({ description: 'Tag ID', required: true }),
  }

  static flags = {
    ticket: Flags.string({ description: 'Ticket ID', required: true, char: 't' }),
  }

  async run(): Promise<void> {
    const { args, flags } = this
    try {
      await this.deskDelete(`/tickets/${flags.ticket}/tags/${args.id}`)
      this.outputSuccess({ removed: true, id: args.id }, { action: 'desk.ticket-tags.remove' })
    } catch (error: any) {
      this.handleApiError(error)
    }
  }
}
