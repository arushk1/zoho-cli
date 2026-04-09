import { Args, Flags } from '@oclif/core'
import { DeskBaseCommand } from '../../../desk-base-command.js'

export default class DeskTicketsMove extends DeskBaseCommand<typeof DeskTicketsMove> {
  static id = 'desk tickets move'
  static summary = 'Move a ticket to a different department'

  static args = {
    id: Args.string({ description: 'Ticket ID', required: true }),
  }

  static flags = {
    department: Flags.string({ description: 'Target department ID', required: true }),
  }

  async run(): Promise<void> {
    const { args, flags } = this
    try {
      const data = await this.deskPost(`/tickets/${args.id}/move`, { departmentId: flags.department })
      this.outputSuccess(data ?? {}, { action: 'desk.tickets.move' })
    } catch (error: any) {
      this.handleApiError(error)
    }
  }
}
