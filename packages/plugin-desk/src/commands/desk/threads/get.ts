import { Args, Flags } from '@oclif/core'
import { DeskBaseCommand } from '../../../desk-base-command.js'

export default class DeskThreadsGet extends DeskBaseCommand<typeof DeskThreadsGet> {
  static id = 'desk threads get'
  static summary = 'Get a specific thread for a ticket'

  static args = {
    id: Args.string({ description: 'Thread ID', required: true }),
  }

  static flags = {
    ticket: Flags.string({ description: 'Ticket ID', required: true, char: 't' }),
  }

  async run(): Promise<void> {
    const { args, flags } = this
    try {
      const data = await this.deskGet(`/tickets/${flags.ticket}/threads/${args.id}`)
      this.outputSuccess(data, { action: 'desk.threads.get' })
    } catch (error: any) {
      this.handleApiError(error)
    }
  }
}
