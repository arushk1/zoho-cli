import { Args, Flags } from '@oclif/core'
import { PeopleBaseCommand } from '../../../../people-base-command.js'

export default class PeopleTimetrackerClientsDelete extends PeopleBaseCommand<typeof PeopleTimetrackerClientsDelete> {
  static id = 'people timetracker clients delete'
  static summary = 'Delete a timetracker client'

  static args = {
    id: Args.string({ description: 'Client ID', required: true }),
  }

  static flags = {
    'dry-run': Flags.boolean({ description: 'Show request without executing', default: false }),
  }

  async run(): Promise<void> {
    const { args, flags } = this

    try {
      if (flags['dry-run']) {
        this.outputSuccess({ dryRun: true, method: 'GET', endpoint: 'deleteclient', clientId: args.id }, { action: 'timetracker.clients.delete' })
        return
      }

      const result = await this.timetrackerRequest('deleteclient', { clientId: args.id })
      this.outputSuccess(result, { action: 'timetracker.clients.delete' })
    } catch (error: any) {
      this.handleApiError(error)
    }
  }
}
