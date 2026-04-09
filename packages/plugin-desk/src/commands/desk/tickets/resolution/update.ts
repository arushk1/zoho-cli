import { Args, Flags } from '@oclif/core'
import { DeskBaseCommand } from '../../../../desk-base-command.js'

export default class DeskTicketsResolutionUpdate extends DeskBaseCommand<typeof DeskTicketsResolutionUpdate> {
  static id = 'desk tickets resolution update'
  static summary = 'Update the resolution of a ticket'

  static args = {
    id: Args.string({ description: 'Ticket ID', required: true }),
  }

  static flags = {
    data: Flags.string({ description: 'JSON body with resolution updates', required: true, char: 'd' }),
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
      const data = await this.deskPatch(`/tickets/${args.id}/resolution`, body)
      this.outputSuccess(data ?? {}, { action: 'desk.tickets.resolution.update' })
    } catch (error: any) {
      this.handleApiError(error)
    }
  }
}
