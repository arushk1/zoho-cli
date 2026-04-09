import { Flags } from '@oclif/core'
import { DeskBaseCommand } from '../../../desk-base-command.js'

export default class DeskTicketsUnspam extends DeskBaseCommand<typeof DeskTicketsUnspam> {
  static id = 'desk tickets unspam'
  static summary = 'Unmark tickets as spam'

  static flags = {
    ids: Flags.string({ description: 'Comma-separated ticket IDs to unmark as spam', required: true }),
  }

  async run(): Promise<void> {
    const { flags } = this
    try {
      const data = await this.deskPost('/tickets/unmarkSpam', { ticketIds: flags.ids.split(',') })
      this.outputSuccess(data ?? {}, { action: 'desk.tickets.unspam' })
    } catch (error: any) {
      this.handleApiError(error)
    }
  }
}
