import { Args, Flags } from '@oclif/core'
import { DeskBaseCommand } from '../../../desk-base-command.js'

export default class DeskCallsDelete extends DeskBaseCommand<typeof DeskCallsDelete> {
  static id = 'desk calls delete'
  static summary = 'Delete a Zoho Desk call by ID'

  static args = {
    id: Args.string({ description: 'Call ID', required: true }),
  }

  static flags = {
    'dry-run': Flags.boolean({ description: 'Preview without deleting', default: false }),
  }

  async run(): Promise<void> {
    const { args, flags } = this
    try {
      if (flags['dry-run']) {
        this.outputSuccess({ deleted: false, id: args.id, dryRun: true }, { action: 'desk.calls.delete.dry-run' })
        return
      }
      await this.deskDelete(`/calls/${args.id}`)
      this.outputSuccess({ deleted: true, id: args.id }, { action: 'desk.calls.delete' })
    } catch (error: any) {
      this.handleApiError(error)
    }
  }
}
