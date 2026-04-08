import { Args } from '@oclif/core'
import { PeopleBaseCommand } from '../../../../people-base-command.js'

export default class PeopleTimetrackerJobsGet extends PeopleBaseCommand<typeof PeopleTimetrackerJobsGet> {
  static id = 'people timetracker jobs get'
  static summary = 'Get details of a timetracker job'

  static args = {
    id: Args.string({ description: 'Job ID', required: true }),
  }

  async run(): Promise<void> {
    const { args } = this

    try {
      const result = await this.timetrackerRequest('getjobdetails', { jobId: args.id })
      this.outputSuccess(result, { action: 'timetracker.jobs.get' })
    } catch (error: any) {
      this.handleApiError(error)
    }
  }
}
