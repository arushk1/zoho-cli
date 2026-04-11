import { Args, Flags } from '@oclif/core'
import { DeskBaseCommand } from '../../../desk-base-command.js'

export default class DeskTicketCommentsUpdate extends DeskBaseCommand<typeof DeskTicketCommentsUpdate> {
  static id = 'desk ticket-comments update'
  static summary = 'Update a comment on a ticket'

  static args = {
    id: Args.string({ description: 'Comment ID', required: true }),
  }

  static flags = {
    ticket: Flags.string({ description: 'Ticket ID', required: true, char: 't' }),
    data: Flags.string({ description: 'JSON with updated comment fields', required: true, char: 'd' }),
    'dry-run': Flags.boolean({ description: 'Preview without updating', default: false }),
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
        this.outputSuccess({ id: args.id, ticket: flags.ticket, body, dryRun: true }, { action: 'desk.ticket-comments.update.dry-run' })
        return
      }

      const data = await this.deskPatch(`/tickets/${flags.ticket}/comments/${args.id}`, body)
      this.outputSuccess(data, { action: 'desk.ticket-comments.update' })
    } catch (error: any) {
      this.handleApiError(error)
    }
  }
}
