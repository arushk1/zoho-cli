import { Flags } from '@oclif/core'
import { DeskBaseCommand } from '../../../desk-base-command.js'

export default class DeskTicketTimeEntriesCreate extends DeskBaseCommand<typeof DeskTicketTimeEntriesCreate> {
  static id = 'desk ticket-time-entries create'
  static summary = 'Create a time entry for a Zoho Desk ticket'

  static flags = {
    ticket: Flags.string({ description: 'Ticket ID', required: true, char: 't' }),
    data: Flags.string({ description: 'JSON data for the time entry', required: true, char: 'd' }),
    'dry-run': Flags.boolean({ description: 'Preview the request without creating', default: false }),
  }

  async run(): Promise<void> {
    const { flags } = this
    try {
      let body: unknown
      try {
        body = JSON.parse(flags.data)
      } catch {
        this.outputError('INVALID_JSON', 'The --data flag must be valid JSON')
        this.exit(3)
      }

      if (flags['dry-run']) {
        this.outputSuccess(body, { action: 'desk.ticket-time-entries.create.dry-run' })
        return
      }

      const data = await this.deskPost(`/tickets/${flags.ticket}/timeEntry`, body)
      this.outputSuccess(data, { action: 'desk.ticket-time-entries.create' })
    } catch (error: any) {
      this.handleApiError(error)
    }
  }
}
