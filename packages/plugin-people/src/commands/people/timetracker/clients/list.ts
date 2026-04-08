import { PeopleBaseCommand } from '../../../../people-base-command.js'

export default class PeopleTimetrackerClientsList extends PeopleBaseCommand<typeof PeopleTimetrackerClientsList> {
  static id = 'people timetracker clients list'
  static summary = 'List all timetracker clients'

  async run(): Promise<void> {
    try {
      const result = await this.timetrackerRequest('getclients', {})
      this.outputSuccess(result, { action: 'timetracker.clients.list' })
    } catch (error: any) {
      this.handleApiError(error)
    }
  }
}
