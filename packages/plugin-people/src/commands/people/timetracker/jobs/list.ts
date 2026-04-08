import { Flags } from '@oclif/core'
import { PeopleBaseCommand } from '../../../../people-base-command.js'

export default class PeopleTimetrackerJobsList extends PeopleBaseCommand<typeof PeopleTimetrackerJobsList> {
  static id = 'people timetracker jobs list'
  static summary = 'List timetracker jobs'

  static flags = {
    user: Flags.string({ description: 'User email or ID' }),
    project: Flags.string({ description: 'Project ID' }),
    client: Flags.string({ description: 'Client ID' }),
    'job-status': Flags.string({ description: 'Job status filter' }),
  }

  async run(): Promise<void> {
    const { flags } = this

    try {
      const params: Record<string, string> = {}
      if (flags.user) params.user = flags.user
      if (flags.project) params.projectId = flags.project
      if (flags.client) params.clientId = flags.client
      if (flags['job-status']) params.jobStatus = flags['job-status']

      const result = await this.timetrackerRequest('getjobs', params)
      this.outputSuccess(result, { action: 'timetracker.jobs.list' })
    } catch (error: any) {
      this.handleApiError(error)
    }
  }
}
