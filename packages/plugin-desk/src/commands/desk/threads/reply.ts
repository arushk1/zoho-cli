import { Flags } from '@oclif/core'
import { DeskBaseCommand } from '../../../desk-base-command.js'

export default class DeskThreadsReply extends DeskBaseCommand<typeof DeskThreadsReply> {
  static id = 'desk threads reply'
  static summary = 'Send a reply to a ticket thread'

  static flags = {
    ticket: Flags.string({ description: 'Ticket ID', required: true, char: 't' }),
    data: Flags.string({ description: 'JSON with channel, to, content, contentType', required: true, char: 'd' }),
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

      const data = await this.deskPost(`/tickets/${flags.ticket}/sendReply`, body)
      this.outputSuccess(data, { action: 'desk.threads.reply' })
    } catch (error: any) {
      this.handleApiError(error)
    }
  }
}
