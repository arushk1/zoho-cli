import { Args, Flags } from '@oclif/core'
import { DeskBaseCommand } from '../../../desk-base-command.js'

export default class DeskTagsDelete extends DeskBaseCommand<typeof DeskTagsDelete> {
  static id = 'desk tags delete'
  static summary = 'Delete a Zoho Desk ticket tag'

  static args = {
    id: Args.string({ description: 'Tag ID', required: true }),
  }

  static flags = {
    'dry-run': Flags.boolean({ description: 'Preview without deleting', default: false }),
  }

  async run(): Promise<void> {
    const { args, flags } = this
    try {
      if (flags['dry-run']) {
        this.outputSuccess({ deleted: false, id: args.id, dryRun: true }, { action: 'desk.tags.delete.dry-run' })
        return
      }
      await this.deskDelete(`/ticketTags/${args.id}`)
      this.outputSuccess(null, { action: 'desk.tags.delete' })
    } catch (error: any) {
      this.handleApiError(error)
    }
  }
}
