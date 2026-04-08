import { Args, Flags } from '@oclif/core'
import { PeopleBaseCommand } from '../../../../people-base-command.js'

export default class PeopleTimetrackerJobsStatus extends PeopleBaseCommand<typeof PeopleTimetrackerJobsStatus> {
  static id = 'people timetracker jobs status'
  static summary = 'Change the status of a timetracker job'

  static args = {
    id: Args.string({ description: 'Job ID', required: true }),
  }

  static flags = {
    status: Flags.string({ description: 'New job status', required: true, options: ['In-Progress', 'Completed'] }),
    'dry-run': Flags.boolean({ description: 'Show request without executing', default: false }),
  }

  async run(): Promise<void> {
    const { args, flags } = this

    try {
      if (flags['dry-run']) {
        this.outputSuccess({ dryRun: true, method: 'GET', endpoint: 'modifyjobstatus', jobId: args.id, jobStatus: flags.status }, { action: 'timetracker.jobs.status' })
        return
      }

      const result = await this.timetrackerRequest('modifyjobstatus', { jobId: args.id, jobStatus: flags.status })
      this.outputSuccess(result, { action: 'timetracker.jobs.status' })
    } catch (error: any) {
      this.handleApiError(error)
    }
  }
}
