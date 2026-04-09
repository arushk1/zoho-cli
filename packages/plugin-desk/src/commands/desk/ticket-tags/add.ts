import { Flags } from '@oclif/core'
import { DeskBaseCommand } from '../../../desk-base-command.js'

export default class DeskTicketTagsAdd extends DeskBaseCommand<typeof DeskTicketTagsAdd> {
  static id = 'desk ticket-tags add'
  static summary = 'Add tags to a Zoho Desk ticket'

  static flags = {
    ticket: Flags.string({ description: 'Ticket ID', required: true, char: 't' }),
    data: Flags.string({ description: 'JSON data with tagIds, e.g. {"tagIds":["123"]}', required: true, char: 'd' }),
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

      const data = await this.deskPost(`/tickets/${flags.ticket}/tags`, body)
      this.outputSuccess(data ?? {}, { action: 'desk.ticket-tags.add' })
    } catch (error: any) {
      this.handleApiError(error)
    }
  }
}
