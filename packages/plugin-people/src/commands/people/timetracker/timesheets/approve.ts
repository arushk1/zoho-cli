import { Args, Flags } from '@oclif/core'
import { PeopleBaseCommand } from '../../../../people-base-command.js'

export default class PeopleTimetrackerTimesheetsApprove extends PeopleBaseCommand<typeof PeopleTimetrackerTimesheetsApprove> {
  static id = 'people timetracker timesheets approve'
  static summary = 'Approve or reject a timesheet'

  static args = {
    id: Args.string({ description: 'Timesheet ID', required: true }),
  }

  static flags = {
    status: Flags.string({ description: 'Approval status', required: true, options: ['approved', 'rejected'] }),
    comments: Flags.string({ description: 'Approval comments' }),
    'dry-run': Flags.boolean({ description: 'Show request without executing', default: false }),
  }

  async run(): Promise<void> {
    const { args, flags } = this

    try {
      const params: Record<string, string> = {
        timesheetId: args.id,
        approvalStatus: flags.status,
      }
      if (flags.comments) params.comments = flags.comments

      if (flags['dry-run']) {
        this.outputSuccess({ dryRun: true, method: 'GET', endpoint: 'approvetimesheet', params }, { action: 'timetracker.timesheets.approve' })
        return
      }

      const result = await this.timetrackerRequest('approvetimesheet', params)
      this.outputSuccess(result, { action: 'timetracker.timesheets.approve' })
    } catch (error: any) {
      this.handleApiError(error)
    }
  }
}
