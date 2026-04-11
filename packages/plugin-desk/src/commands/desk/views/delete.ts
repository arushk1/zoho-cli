import { Args, Flags } from '@oclif/core'
import { DeskBaseCommand } from '../../../desk-base-command.js'

export default class DeskViewsDelete extends DeskBaseCommand<typeof DeskViewsDelete> {
  static id = 'desk views delete'
  static summary = 'Delete a Zoho Desk view'

  static args = {
    id: Args.string({ description: 'View ID', required: true }),
  }

  static flags = {
    'dry-run': Flags.boolean({ description: 'Preview without deleting', default: false }),
  }

  async run(): Promise<void> {
    const { args, flags } = this
    try {
      if (flags['dry-run']) {
        this.outputSuccess({ deleted: false, id: args.id, dryRun: true }, { action: 'desk.views.delete.dry-run' })
        return
      }
      await this.deskDelete(`/views/${args.id}`)
      this.outputSuccess(null, { action: 'desk.views.delete' })
    } catch (error: any) {
      this.handleApiError(error)
    }
  }
}
