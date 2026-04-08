import { Args } from '@oclif/core'
import { PeopleBaseCommand } from '../../../../people-base-command.js'

export default class PeopleTimetrackerTimelogsGet extends PeopleBaseCommand<typeof PeopleTimetrackerTimelogsGet> {
  static id = 'people timetracker timelogs get'
  static summary = 'Get details of a timelog'

  static args = {
    id: Args.string({ description: 'Timelog ID', required: true }),
  }

  async run(): Promise<void> {
    const { args } = this

    try {
      const result = await this.timetrackerRequest('gettimelogdetails', { timelogId: args.id })
      this.outputSuccess(result, { action: 'timetracker.timelogs.get' })
    } catch (error: any) {
      this.handleApiError(error)
    }
  }
}
