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
    'dry-run': Flags.boolean({ description: 'Preview without deleting', default: false }),
  }

  async run(): Promise<void> {
    const { args, flags } = this
    try {
      if (flags['dry-run']) {
        this.outputSuccess({ deleted: false, id: args.id, ticket: flags.ticket, dryRun: true }, { action: 'desk.ticket-time-entries.delete.dry-run' })
        return
      }
      await this.deskDelete(`/tickets/${flags.ticket}/timeEntry/${args.id}`)
      this.outputSuccess({ deleted: true, id: args.id }, { action: 'desk.ticket-time-entries.delete' })
    } catch (error: any) {
      this.handleApiError(error)
    }
  }
}
