import { Args } from '@oclif/core'
import { DeskBaseCommand } from '../../../desk-base-command.js'

export default class DeskTimeEntriesDelete extends DeskBaseCommand<typeof DeskTimeEntriesDelete> {
  static id = 'desk time-entries delete'
  static summary = 'Delete a Zoho Desk time entry by ID'

  static args = {
    id: Args.string({ description: 'Time entry ID', required: true }),
  }

  async run(): Promise<void> {
    const { args } = this
    try {
      await this.deskDelete(`/timeEntries/${args.id}`)
      this.outputSuccess({ deleted: true, id: args.id }, { action: 'desk.time-entries.delete' })
    } catch (error: any) {
      this.handleApiError(error)
    }
  }
}
