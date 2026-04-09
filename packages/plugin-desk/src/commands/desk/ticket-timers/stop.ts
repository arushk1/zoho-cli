import { Flags } from '@oclif/core'
import { DeskBaseCommand } from '../../../desk-base-command.js'

export default class DeskTicketTimersStop extends DeskBaseCommand<typeof DeskTicketTimersStop> {
  static id = 'desk ticket-timers stop'
  static summary = 'Stop the timer for a Zoho Desk ticket'

  static flags = {
    ticket: Flags.string({ description: 'Ticket ID', required: true, char: 't' }),
  }

  async run(): Promise<void> {
    const { flags } = this
    try {
      const data = await this.deskPost(`/tickets/${flags.ticket}/timer/stop`)
      this.outputSuccess(data ?? {}, { action: 'desk.ticket-timers.stop' })
    } catch (error: any) {
      this.handleApiError(error)
    }
  }
}
