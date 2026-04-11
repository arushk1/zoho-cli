import { Args, Flags } from '@oclif/core'
import { DeskBaseCommand } from '../../../desk-base-command.js'

export default class DeskTicketsSplit extends DeskBaseCommand<typeof DeskTicketsSplit> {
  static id = 'desk tickets split'
  static summary = 'Split a thread from a ticket into a new ticket'

  static args = {
    id: Args.string({ description: 'Ticket ID', required: true }),
  }

  static flags = {
    data: Flags.string({ description: 'JSON body with { threadId, subject, departmentId }', required: true, char: 'd' }),
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

      const data = await this.deskPost(`/tickets/${args.id}/split`, body)
      this.outputSuccess(data ?? {}, { action: 'desk.tickets.split' })
    } catch (error: any) {
      this.handleApiError(error)
    }
  }
}
