import { Args, Flags } from '@oclif/core'
import { DeskBaseCommand } from '../../../desk-base-command.js'

export default class DeskTimeEntriesUpdate extends DeskBaseCommand<typeof DeskTimeEntriesUpdate> {
  static id = 'desk time-entries update'
  static summary = 'Update a Zoho Desk time entry by ID'

  static args = {
    id: Args.string({ description: 'Time entry ID', required: true }),
  }

  static flags = {
    data: Flags.string({ description: 'JSON data for the time entry update', required: true, char: 'd' }),
    'dry-run': Flags.boolean({ description: 'Preview the request without updating', default: false }),
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
        this.outputSuccess(body, { action: 'desk.time-entries.update.dry-run' })
        return
      }

      const data = await this.deskPatch(`/timeEntries/${args.id}`, body)
      this.outputSuccess(data, { action: 'desk.time-entries.update' })
    } catch (error: any) {
      this.handleApiError(error)
    }
  }
}
