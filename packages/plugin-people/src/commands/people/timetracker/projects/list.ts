import { PeopleBaseCommand } from '../../../../people-base-command.js'

export default class PeopleTimetrackerProjectsList extends PeopleBaseCommand<typeof PeopleTimetrackerProjectsList> {
  static id = 'people timetracker projects list'
  static summary = 'List all timetracker projects'

  async run(): Promise<void> {
    try {
      const result = await this.timetrackerRequest('getprojects', {})
      this.outputSuccess(result, { action: 'timetracker.projects.list' })
    } catch (error: any) {
      this.handleApiError(error)
    }
  }
}
