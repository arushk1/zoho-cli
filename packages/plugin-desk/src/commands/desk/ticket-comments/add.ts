import { Flags } from '@oclif/core'
import { DeskBaseCommand } from '../../../desk-base-command.js'

export default class DeskTicketCommentsAdd extends DeskBaseCommand<typeof DeskTicketCommentsAdd> {
  static id = 'desk ticket-comments add'
  static summary = 'Add a comment to a ticket'

  static flags = {
    ticket: Flags.string({ description: 'Ticket ID', required: true, char: 't' }),
    data: Flags.string({ description: 'JSON with content, contentType, isPublic', required: true, char: 'd' }),
  }

  async run(): Promise<void> {
    const { flags } = this
    try {
      let body: unknown
      try {
        body = JSON.parse(flags.data)
      } catch {
        this.outputError('INVALID_JSON', 'The --data flag must be valid JSON')
        this.exit(3)
      }

      const data = await this.deskPost(`/tickets/${flags.ticket}/comments`, body)
      this.outputSuccess(data, { action: 'desk.ticket-comments.add' })
    } catch (error: any) {
      this.handleApiError(error)
    }
  }
}
