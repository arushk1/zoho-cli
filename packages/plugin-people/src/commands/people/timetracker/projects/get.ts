import { Args } from '@oclif/core'
import { PeopleBaseCommand } from '../../../../people-base-command.js'

export default class PeopleTimetrackerProjectsGet extends PeopleBaseCommand<typeof PeopleTimetrackerProjectsGet> {
  static id = 'people timetracker projects get'
  static summary = 'Get details of a timetracker project'

  static args = {
    id: Args.string({ description: 'Project ID', required: true }),
  }

  async run(): Promise<void> {
    const { args } = this

    try {
      const result = await this.timetrackerRequest('getprojectdetails', { projectId: args.id })
      this.outputSuccess(result, { action: 'timetracker.projects.get' })
    } catch (error: any) {
      this.handleApiError(error)
    }
  }
}
