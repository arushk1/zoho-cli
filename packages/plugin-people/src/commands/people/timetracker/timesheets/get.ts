import { Args } from '@oclif/core'
import { PeopleBaseCommand } from '../../../../people-base-command.js'

export default class PeopleTimetrackerTimesheetsGet extends PeopleBaseCommand<typeof PeopleTimetrackerTimesheetsGet> {
  static id = 'people timetracker timesheets get'
  static summary = 'Get details of a timesheet'

  static args = {
    id: Args.string({ description: 'Timesheet ID', required: true }),
  }

  async run(): Promise<void> {
    const { args } = this

    try {
      const result = await this.timetrackerRequest('gettimesheetdetails', { timesheetId: args.id })
      this.outputSuccess(result, { action: 'timetracker.timesheets.get' })
    } catch (error: any) {
      this.handleApiError(error)
    }
  }
}
