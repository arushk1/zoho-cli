import { Flags } from '@oclif/core'
import { DeskBaseCommand } from '../../../desk-base-command.js'

export default class DeskTicketTimersResume extends DeskBaseCommand<typeof DeskTicketTimersResume> {
  static id = 'desk ticket-timers resume'
  static summary = 'Resume the timer for a Zoho Desk ticket'

  static flags = {
    ticket: Flags.string({ description: 'Ticket ID', required: true, char: 't' }),
  }

  async run(): Promise<void> {
    const { flags } = this
    try {
      const data = await this.deskPost(`/tickets/${flags.ticket}/timer/resume`)
      this.outputSuccess(data ?? {}, { action: 'desk.ticket-timers.resume' })
    } catch (error: any) {
      this.handleApiError(error)
    }
  }
}
