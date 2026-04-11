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
        this.outputSuccess({ id: args.id, body, dryRun: true }, { action: 'desk.tickets.resolution.update.dry-run' })
        return
      }

      const data = await this.deskPatch(`/tickets/${args.id}/resolution`, body)
      this.outputSuccess(data ?? {}, { action: 'desk.tickets.resolution.update' })
    } catch (error: any) {
      this.handleApiError(error)
    }
  }
}
