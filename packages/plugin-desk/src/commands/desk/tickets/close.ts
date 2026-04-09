import { Flags } from '@oclif/core'
import { DeskBaseCommand } from '../../../desk-base-command.js'

export default class DeskTicketsClose extends DeskBaseCommand<typeof DeskTicketsClose> {
  static id = 'desk tickets close'
  static summary = 'Close multiple tickets by ID'

  static flags = {
    ids: Flags.string({ description: 'Comma-separated ticket IDs to close', required: true }),
  }

  async run(): Promise<void> {
    const { flags } = this
    try {
      const data = await this.deskPost('/tickets/close', { ids: flags.ids.split(',') })
      this.outputSuccess(data ?? {}, { action: 'desk.tickets.close' })
    } catch (error: any) {
      this.handleApiError(error)
    }
  }
}
