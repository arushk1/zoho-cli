import { Args } from '@oclif/core'
import { DeskBaseCommand } from '../../../desk-base-command.js'

export default class DeskTimeEntriesGet extends DeskBaseCommand<typeof DeskTimeEntriesGet> {
  static id = 'desk time-entries get'
  static summary = 'Get a Zoho Desk time entry by ID'

  static args = {
    id: Args.string({ description: 'Time entry ID', required: true }),
  }

  async run(): Promise<void> {
    const { args } = this
    try {
      const data = await this.deskGet(`/timeEntries/${args.id}`)
      this.outputSuccess(data, { action: 'desk.time-entries.get' })
    } catch (error: any) {
      this.handleApiError(error)
    }
  }
}
