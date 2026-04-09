import { Flags } from '@oclif/core'
import { DeskBaseCommand } from '../../../desk-base-command.js'

export default class DeskTicketsSpam extends DeskBaseCommand<typeof DeskTicketsSpam> {
  static id = 'desk tickets spam'
  static summary = 'Mark tickets as spam'

  static flags = {
    ids: Flags.string({ description: 'Comma-separated ticket IDs to mark as spam', required: true }),
  }

  async run(): Promise<void> {
    const { flags } = this
    try {
      const data = await this.deskPost('/tickets/markSpam', { ticketIds: flags.ids.split(',') })
      this.outputSuccess(data ?? {}, { action: 'desk.tickets.spam' })
    } catch (error: any) {
      this.handleApiError(error)
    }
  }
}
