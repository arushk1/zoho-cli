import { Args, Flags } from '@oclif/core'
import { DeskBaseCommand } from '../../../desk-base-command.js'

export default class DeskTicketTimeEntriesUpdate extends DeskBaseCommand<typeof DeskTicketTimeEntriesUpdate> {
  static id = 'desk ticket-time-entries update'
  static summary = 'Update a time entry for a Zoho Desk ticket'

  static args = {
    id: Args.string({ description: 'Time entry ID', required: true }),
  }

  static flags = {
    ticket: Flags.string({ description: 'Ticket ID', required: true, char: 't' }),
    data: Flags.string({ description: 'JSON data for the time entry update', required: true, char: 'd' }),
    'dry-run': Flags.boolean({ description: 'Preview the request without updating', default: false }),
  }

  async run(): Promise<void> {
    const { args, flags } = this
    try {
      let body: unknown
      try {
        body = JSON.parse(flags.data)
      } catch {
        this.outputError('INVALID_JSON', 'The --data flag must be valid JSON')
        this.exit(3)
      }

      if (flags['dry-run']) {
        this.outputSuccess(body, { action: 'desk.ticket-time-entries.update.dry-run' })
        return
      }

      const data = await this.deskPatch(`/tickets/${flags.ticket}/timeEntry/${args.id}`, body)
      this.outputSuccess(data, { action: 'desk.ticket-time-entries.update' })
    } catch (error: any) {
      this.handleApiError(error)
    }
  }
}
