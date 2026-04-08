import { Flags } from '@oclif/core'
import { PeopleBaseCommand } from '../../../../people-base-command.js'

export default class PeopleTimetrackerTimelogsList extends PeopleBaseCommand<typeof PeopleTimetrackerTimelogsList> {
  static id = 'people timetracker timelogs list'
  static summary = 'List timelogs for a user'

  static flags = {
    user: Flags.string({ description: 'User email or ID', required: true }),
    from: Flags.string({ description: 'Start date (yyyy-MM-dd)' }),
    to: Flags.string({ description: 'End date (yyyy-MM-dd)' }),
    job: Flags.string({ description: 'Job ID filter' }),
    project: Flags.string({ description: 'Project ID filter' }),
    client: Flags.string({ description: 'Client ID filter' }),
    'approval-status': Flags.string({ description: 'Approval status filter' }),
    page: Flags.integer({ description: 'Page index (zero-based)', default: 0 }),
    'per-page': Flags.integer({ description: 'Records per page', default: 200 }),
  }

  async run(): Promise<void> {
    const { flags } = this

    try {
      const params: Record<string, string> = {
        user: flags.user,
        sIndex: String(flags.page),
        limit: String(flags['per-page']),
      }
      if (flags.from) params.fromDate = flags.from
      if (flags.to) params.toDate = flags.to
      if (flags.job) params.jobId = flags.job
      if (flags.project) params.projectId = flags.project
      if (flags.client) params.clientId = flags.client
      if (flags['approval-status']) params.approvalStatus = flags['approval-status']

      const result = await this.timetrackerRequest('gettimelogs', params)
      this.outputSuccess(result, { action: 'timetracker.timelogs.list' })
    } catch (error: any) {
      this.handleApiError(error)
    }
  }
}
