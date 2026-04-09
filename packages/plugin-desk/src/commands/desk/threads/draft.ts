import { Flags } from '@oclif/core'
import { DeskBaseCommand } from '../../../desk-base-command.js'

export default class DeskThreadsDraft extends DeskBaseCommand<typeof DeskThreadsDraft> {
  static id = 'desk threads draft'
  static summary = 'Save a draft reply for a ticket thread'

  static flags = {
    ticket: Flags.string({ description: 'Ticket ID', required: true, char: 't' }),
    data: Flags.string({ description: 'JSON with draft reply content', required: true, char: 'd' }),
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

      const data = await this.deskPost(`/tickets/${flags.ticket}/draftReply`, body)
      this.outputSuccess(data, { action: 'desk.threads.draft' })
    } catch (error: any) {
      this.handleApiError(error)
    }
  }
}
