import { Args } from '@oclif/core'
import { PeopleBaseCommand } from '../../../../people-base-command.js'

export default class PeopleTimetrackerClientsGet extends PeopleBaseCommand<typeof PeopleTimetrackerClientsGet> {
  static id = 'people timetracker clients get'
  static summary = 'Get details of a timetracker client'

  static args = {
    id: Args.string({ description: 'Client ID', required: true }),
  }

  async run(): Promise<void> {
    const { args } = this

    try {
      const result = await this.timetrackerRequest('getclientdetails', { clientId: args.id })
      this.outputSuccess(result, { action: 'timetracker.clients.get' })
    } catch (error: any) {
      this.handleApiError(error)
    }
  }
}
