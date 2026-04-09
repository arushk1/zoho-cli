import { Args, Flags } from '@oclif/core'
import { DeskBaseCommand } from '../../../../desk-base-command.js'

export default class DeskTicketsResolutionAdd extends DeskBaseCommand<typeof DeskTicketsResolutionAdd> {
  static id = 'desk tickets resolution add'
  static summary = 'Add a resolution to a ticket'

  static args = {
    id: Args.string({ description: 'Ticket ID', required: true }),
  }

  static flags = {
    data: Flags.string({ description: 'JSON body for the resolution', required: true, char: 'd' }),
  }

  async run(): Promise<void> {
    const { args, flags } = this
    try {
      let body: unknown
      try {
        body = JSON.parse(flags.data)
      } catch (error: any) {
        if (error instanceof SyntaxError) {
          this.outputError('INVALID_JSON', 'Invalid JSON in --data flag')
          this.exit(3)
        }
        this.handleApiError(error)
      }
      const data = await this.deskPost(`/tickets/${args.id}/resolution`, body)
      this.outputSuccess(data ?? {}, { action: 'desk.tickets.resolution.add' })
    } catch (error: any) {
      this.handleApiError(error)
    }
  }
}
