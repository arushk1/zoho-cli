import { Args, Flags } from '@oclif/core'
import { PeopleBaseCommand } from '../../../../people-base-command.js'

export default class PeopleTimetrackerProjectsStatus extends PeopleBaseCommand<typeof PeopleTimetrackerProjectsStatus> {
  static id = 'people timetracker projects status'
  static summary = 'Change the status of a timetracker project'

  static args = {
    id: Args.string({ description: 'Project ID', required: true }),
  }

  static flags = {
    status: Flags.string({ description: 'New project status', required: true, options: ['In-progress', 'completed'] }),
    'dry-run': Flags.boolean({ description: 'Show request without executing', default: false }),
  }

  async run(): Promise<void> {
    const { args, flags } = this

    try {
      if (flags['dry-run']) {
        this.outputSuccess({ dryRun: true, method: 'GET', endpoint: 'changeprojectstatus', projectId: args.id, status: flags.status }, { action: 'timetracker.projects.status' })
        return
      }

      const result = await this.timetrackerRequest('changeprojectstatus', { projectId: args.id, status: flags.status })
      this.outputSuccess(result, { action: 'timetracker.projects.status' })
    } catch (error: any) {
      this.handleApiError(error)
    }
  }
}
