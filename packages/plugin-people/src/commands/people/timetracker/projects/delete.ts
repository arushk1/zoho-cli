import { Args, Flags } from '@oclif/core'
import { PeopleBaseCommand } from '../../../../people-base-command.js'

export default class PeopleTimetrackerProjectsDelete extends PeopleBaseCommand<typeof PeopleTimetrackerProjectsDelete> {
  static id = 'people timetracker projects delete'
  static summary = 'Delete a timetracker project'

  static args = {
    id: Args.string({ description: 'Project ID', required: true }),
  }

  static flags = {
    'dry-run': Flags.boolean({ description: 'Show request without executing', default: false }),
  }

  async run(): Promise<void> {
    const { args, flags } = this

    try {
      if (flags['dry-run']) {
        this.outputSuccess({ dryRun: true, method: 'GET', endpoint: 'deleteproject', projectId: args.id }, { action: 'timetracker.projects.delete' })
        return
      }

      const result = await this.timetrackerRequest('deleteproject', { projectId: args.id })
      this.outputSuccess(result, { action: 'timetracker.projects.delete' })
    } catch (error: any) {
      this.handleApiError(error)
    }
  }
}
