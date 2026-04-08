import { Flags } from '@oclif/core'
import { PeopleBaseCommand } from '../../../../people-base-command.js'

export default class PeopleTimetrackerTimesheetsList extends PeopleBaseCommand<typeof PeopleTimetrackerTimesheetsList> {
  static id = 'people timetracker timesheets list'
  static summary = 'List timesheets for a user'

  static flags = {
    user: Flags.string({ description: 'User email or ID', required: true }),
    from: Flags.string({ description: 'Start date (yyyy-MM-dd)' }),
    to: Flags.string({ description: 'End date (yyyy-MM-dd)' }),
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
      if (flags['approval-status']) params.approvalStatus = flags['approval-status']

      const result = await this.timetrackerRequest('gettimesheet', params)
      this.outputSuccess(result, { action: 'timetracker.timesheets.list' })
    } catch (error: any) {
      this.handleApiError(error)
    }
  }
}
