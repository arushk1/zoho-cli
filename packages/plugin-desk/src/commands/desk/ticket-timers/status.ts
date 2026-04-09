import { Flags } from '@oclif/core'
import { DeskBaseCommand } from '../../../desk-base-command.js'

export default class DeskTicketTimersStatus extends DeskBaseCommand<typeof DeskTicketTimersStatus> {
  static id = 'desk ticket-timers status'
  static summary = 'Get the timer status for a Zoho Desk ticket'

  static flags = {
    ticket: Flags.string({ description: 'Ticket ID', required: true, char: 't' }),
  }

  async run(): Promise<void> {
    const { flags } = this
    try {
      const data = await this.deskGet(`/tickets/${flags.ticket}/timer`)
      this.outputSuccess(data ?? {}, { action: 'desk.ticket-timers.status' })
    } catch (error: any) {
      this.handleApiError(error)
    }
  }
}
