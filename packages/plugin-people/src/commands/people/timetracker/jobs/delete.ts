import { Args, Flags } from '@oclif/core'
import { PeopleBaseCommand } from '../../../../people-base-command.js'

export default class PeopleTimetrackerJobsDelete extends PeopleBaseCommand<typeof PeopleTimetrackerJobsDelete> {
  static id = 'people timetracker jobs delete'
  static summary = 'Delete a timetracker job'

  static args = {
    id: Args.string({ description: 'Job ID', required: true }),
  }

  static flags = {
    'dry-run': Flags.boolean({ description: 'Show request without executing', default: false }),
  }

  async run(): Promise<void> {
    const { args, flags } = this

    try {
      if (flags['dry-run']) {
        this.outputSuccess({ dryRun: true, method: 'GET', endpoint: 'deletejob', jobId: args.id }, { action: 'timetracker.jobs.delete' })
        return
      }

      const result = await this.timetrackerRequest('deletejob', { jobId: args.id })
      this.outputSuccess(result, { action: 'timetracker.jobs.delete' })
    } catch (error: any) {
      this.handleApiError(error)
    }
  }
}
