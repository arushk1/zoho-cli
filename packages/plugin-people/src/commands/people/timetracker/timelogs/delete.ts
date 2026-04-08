import { Args, Flags } from '@oclif/core'
import { PeopleBaseCommand } from '../../../../people-base-command.js'

export default class PeopleTimetrackerTimelogsDelete extends PeopleBaseCommand<typeof PeopleTimetrackerTimelogsDelete> {
  static id = 'people timetracker timelogs delete'
  static summary = 'Delete a timelog'

  static args = {
    id: Args.string({ description: 'Timelog ID', required: true }),
  }

  static flags = {
    'dry-run': Flags.boolean({ description: 'Show request without executing', default: false }),
  }

  async run(): Promise<void> {
    const { args, flags } = this

    try {
      if (flags['dry-run']) {
        this.outputSuccess({ dryRun: true, method: 'GET', endpoint: 'deletetimelog', timelogId: args.id }, { action: 'timetracker.timelogs.delete' })
        return
      }

      const result = await this.timetrackerRequest('deletetimelog', { timelogId: args.id })
      this.outputSuccess(result, { action: 'timetracker.timelogs.delete' })
    } catch (error: any) {
      this.handleApiError(error)
    }
  }
}
