import { Args, Flags } from '@oclif/core'
import { DeskBaseCommand } from '../../../desk-base-command.js'

export default class DeskTimeEntriesDelete extends DeskBaseCommand<typeof DeskTimeEntriesDelete> {
  static id = 'desk time-entries delete'
  static summary = 'Delete a Zoho Desk time entry by ID'

  static args = {
    id: Args.string({ description: 'Time entry ID', required: true }),
  }

  static flags = {
    'dry-run': Flags.boolean({ description: 'Preview without deleting', default: false }),
  }

  async run(): Promise<void> {
    const { args, flags } = this
    try {
      if (flags['dry-run']) {
        this.outputSuccess({ deleted: false, id: args.id, dryRun: true }, { action: 'desk.time-entries.delete.dry-run' })
        return
      }
      await this.deskDelete(`/timeEntries/${args.id}`)
      this.outputSuccess({ deleted: true, id: args.id }, { action: 'desk.time-entries.delete' })
    } catch (error: any) {
      this.handleApiError(error)
    }
  }
}
