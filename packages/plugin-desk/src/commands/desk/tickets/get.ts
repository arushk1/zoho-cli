import { Args, Flags } from '@oclif/core'
import { DeskBaseCommand } from '../../../desk-base-command.js'

export default class DeskTicketsGet extends DeskBaseCommand<typeof DeskTicketsGet> {
  static id = 'desk tickets get'
  static summary = 'Get a Zoho Desk ticket by ID'

  static args = {
    id: Args.string({ description: 'Ticket ID', required: true }),
  }

  static flags = {
    include: Flags.string({ description: 'Comma-separated list of related data to include (e.g. contacts,products)' }),
  }

  async run(): Promise<void> {
    const { args, flags } = this
    try {
      const params: Record<string, string> = {}
      if (flags.include) params.include = flags.include

      const data = await this.deskGet(`/tickets/${args.id}`, params)
      this.outputSuccess(data, { action: 'desk.tickets.get' })
    } catch (error: any) {
      this.handleApiError(error)
    }
  }
}
