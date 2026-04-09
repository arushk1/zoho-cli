import { Flags } from '@oclif/core'
import { DeskBaseCommand } from '../../../desk-base-command.js'

export default class DeskTicketTimersPause extends DeskBaseCommand<typeof DeskTicketTimersPause> {
  static id = 'desk ticket-timers pause'
  static summary = 'Pause the timer for a Zoho Desk ticket'

  static flags = {
    ticket: Flags.string({ description: 'Ticket ID', required: true, char: 't' }),
  }

  async run(): Promise<void> {
    const { flags } = this
    try {
      const data = await this.deskPost(`/tickets/${flags.ticket}/timer/pause`)
      this.outputSuccess(data ?? {}, { action: 'desk.ticket-timers.pause' })
    } catch (error: any) {
      this.handleApiError(error)
    }
  }
}
