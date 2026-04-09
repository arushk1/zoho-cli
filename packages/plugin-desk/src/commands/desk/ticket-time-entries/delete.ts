import { Args, Flags } from '@oclif/core'
import { DeskBaseCommand } from '../../../desk-base-command.js'

export default class DeskTicketTimeEntriesDelete extends DeskBaseCommand<typeof DeskTicketTimeEntriesDelete> {
  static id = 'desk ticket-time-entries delete'
  static summary = 'Delete a time entry from a Zoho Desk ticket'

  static args = {
    id: Args.string({ description: 'Time entry ID', required: true }),
  }

  static flags = {
    ticket: Flags.string({ description: 'Ticket ID', required: true, char: 't' }),
  }

  async run(): Promise<void> {
    const { args, flags } = this
    try {
      await this.deskDelete(`/tickets/${flags.ticket}/timeEntry/${args.id}`)
      this.outputSuccess({ deleted: true, id: args.id }, { action: 'desk.ticket-time-entries.delete' })
    } catch (error: any) {
      this.handleApiError(error)
    }
  }
}
