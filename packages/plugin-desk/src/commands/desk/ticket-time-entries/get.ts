import { Args, Flags } from '@oclif/core'
import { DeskBaseCommand } from '../../../desk-base-command.js'

export default class DeskTicketTimeEntriesGet extends DeskBaseCommand<typeof DeskTicketTimeEntriesGet> {
  static id = 'desk ticket-time-entries get'
  static summary = 'Get a specific time entry for a Zoho Desk ticket'

  static args = {
    id: Args.string({ description: 'Time entry ID', required: true }),
  }

  static flags = {
    ticket: Flags.string({ description: 'Ticket ID', required: true, char: 't' }),
  }

  async run(): Promise<void> {
    const { args, flags } = this
    try {
      const data = await this.deskGet(`/tickets/${flags.ticket}/timeEntry/${args.id}`)
      this.outputSuccess(data, { action: 'desk.ticket-time-entries.get' })
    } catch (error: any) {
      this.handleApiError(error)
    }
  }
}
