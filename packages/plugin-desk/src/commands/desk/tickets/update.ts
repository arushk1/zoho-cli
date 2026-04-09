import { Args, Flags } from '@oclif/core'
import { DeskBaseCommand } from '../../../desk-base-command.js'

export default class DeskTicketsUpdate extends DeskBaseCommand<typeof DeskTicketsUpdate> {
  static id = 'desk tickets update'
  static summary = 'Update an existing Zoho Desk ticket'

  static args = {
    id: Args.string({ description: 'Ticket ID', required: true }),
  }

  static flags = {
    data: Flags.string({ description: 'JSON data to update on the ticket', required: true, char: 'd' }),
    'dry-run': Flags.boolean({ description: 'Preview the request without updating', default: false }),
  }

  async run(): Promise<void> {
    const { args, flags } = this
    try {
      let body: unknown
      try {
        body = JSON.parse(flags.data)
      } catch {
        this.outputError('INVALID_JSON', 'The --data flag must be valid JSON')
        this.exit(3)
      }

      if (flags['dry-run']) {
        this.outputSuccess({ id: args.id, ...( body as object) }, { action: 'desk.tickets.update.dry-run' })
        return
      }

      const data = await this.deskPatch(`/tickets/${args.id}`, body)
      this.outputSuccess(data, { action: 'desk.tickets.update' })
    } catch (error: any) {
      this.handleApiError(error)
    }
  }
}
