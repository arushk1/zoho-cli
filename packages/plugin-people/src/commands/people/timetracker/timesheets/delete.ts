import { Args, Flags } from '@oclif/core'
import { PeopleBaseCommand } from '../../../../people-base-command.js'

export default class PeopleTimetrackerTimesheetsDelete extends PeopleBaseCommand<typeof PeopleTimetrackerTimesheetsDelete> {
  static id = 'people timetracker timesheets delete'
  static summary = 'Delete a timesheet'

  static args = {
    id: Args.string({ description: 'Timesheet ID', required: true }),
  }

  static flags = {
    'dry-run': Flags.boolean({ description: 'Show request without executing', default: false }),
  }

  async run(): Promise<void> {
    const { args, flags } = this

    try {
      if (flags['dry-run']) {
        this.outputSuccess({ dryRun: true, method: 'GET', endpoint: 'deletetimesheet', timesheetId: args.id }, { action: 'timetracker.timesheets.delete' })
        return
      }

      const result = await this.timetrackerRequest('deletetimesheet', { timesheetId: args.id })
      this.outputSuccess(result, { action: 'timetracker.timesheets.delete' })
    } catch (error: any) {
      this.handleApiError(error)
    }
  }
}
