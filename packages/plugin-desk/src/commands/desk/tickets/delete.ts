import { Args } from '@oclif/core'
import { DeskBaseCommand } from '../../../desk-base-command.js'

export default class DeskTicketsDelete extends DeskBaseCommand<typeof DeskTicketsDelete> {
  static id = 'desk tickets delete'
  static summary = 'Delete a Zoho Desk ticket by ID'

  static args = {
    id: Args.string({ description: 'Ticket ID', required: true }),
  }

  async run(): Promise<void> {
    const { args } = this
    try {
      await this.deskDelete(`/tickets/${args.id}`)
      this.outputSuccess({ deleted: true, id: args.id }, { action: 'desk.tickets.delete' })
    } catch (error: any) {
      this.handleApiError(error)
    }
  }
}
