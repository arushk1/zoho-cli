import { Args, Flags } from '@oclif/core'
import { DeskBaseCommand } from '../../../../desk-base-command.js'

export default class DeskTicketsResolutionDelete extends DeskBaseCommand<typeof DeskTicketsResolutionDelete> {
  static id = 'desk tickets resolution delete'
  static summary = 'Delete the resolution of a ticket'

  static args = {
    id: Args.string({ description: 'Ticket ID', required: true }),
  }

  static flags = {
    'dry-run': Flags.boolean({ description: 'Preview without deleting', default: false }),
  }

  async run(): Promise<void> {
    const { args, flags } = this
    try {
      if (flags['dry-run']) {
        this.outputSuccess({ deleted: false, id: args.id, dryRun: true }, { action: 'desk.tickets.resolution.delete.dry-run' })
        return
      }
      const data = await this.deskDelete(`/tickets/${args.id}/resolution`)
      this.outputSuccess(data ?? {}, { action: 'desk.tickets.resolution.delete' })
    } catch (error: any) {
      this.handleApiError(error)
    }
  }
}
