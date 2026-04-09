import { Args, Flags } from '@oclif/core'
import { DeskBaseCommand } from '../../../desk-base-command.js'

export default class DeskTicketsMerge extends DeskBaseCommand<typeof DeskTicketsMerge> {
  static id = 'desk tickets merge'
  static summary = 'Merge tickets into a target ticket'

  static args = {
    id: Args.string({ description: 'Target ticket ID', required: true }),
  }

  static flags = {
    data: Flags.string({ description: 'JSON body with { ids: [...] }', required: true, char: 'd' }),
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
      const data = await this.deskPost(`/tickets/${args.id}/merge`, body)
      this.outputSuccess(data ?? {}, { action: 'desk.tickets.merge' })
    } catch (error: any) {
      this.handleApiError(error)
    }
  }
}
