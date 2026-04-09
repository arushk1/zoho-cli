import { Flags } from '@oclif/core'
import { DeskBaseCommand } from '../../../desk-base-command.js'

export default class DeskTicketTimersStart extends DeskBaseCommand<typeof DeskTicketTimersStart> {
  static id = 'desk ticket-timers start'
  static summary = 'Start a timer for a Zoho Desk ticket'

  static flags = {
    ticket: Flags.string({ description: 'Ticket ID', required: true, char: 't' }),
  }

  async run(): Promise<void> {
    const { flags } = this
    try {
      const data = await this.deskPost(`/tickets/${flags.ticket}/timer/start`)
      this.outputSuccess(data ?? {}, { action: 'desk.ticket-timers.start' })
    } catch (error: any) {
      this.handleApiError(error)
    }
  }
}
