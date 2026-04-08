import { Flags } from '@oclif/core'
import { PeopleBaseCommand } from '../../../people-base-command.js'

export default class PeopleTimetrackerPayrollReport extends PeopleBaseCommand<typeof PeopleTimetrackerPayrollReport> {
  static id = 'people timetracker payroll-report'
  static summary = 'Get payroll report from timetracker'

  static flags = {
    user: Flags.string({ description: 'User erecno or "all"', default: 'all' }),
    from: Flags.string({ description: 'Start date (yyyy-MM-dd)', required: true }),
    to: Flags.string({ description: 'End date (yyyy-MM-dd)', required: true }),
    'direct-subs-only': Flags.boolean({ description: 'Include only direct subordinates', default: false }),
    'approval-status': Flags.string({ description: 'Approval status filter' }),
    page: Flags.integer({ description: 'Page index (zero-based)', default: 0 }),
    'per-page': Flags.integer({ description: 'Records per page', default: 100 }),
  }

  async run(): Promise<void> {
    const { flags } = this

    try {
      const params: Record<string, string> = {
        userErecNo: flags.user,
        fromDate: flags.from,
        toDate: flags.to,
        sIndex: String(flags.page),
        limit: String(flags['per-page']),
      }
      if (flags['direct-subs-only']) params.isDirectSubOnlyNeeded = 'true'
      if (flags['approval-status']) params.approvalStatus = flags['approval-status']

      const { data: resp } = await this.apiClient.get('/people/api/timetracker/getpayrollreport', { params })
      const result = this.extractResult(resp)
      this.outputSuccess(result, { action: 'timetracker.payroll-report' })
    } catch (error: any) {
      this.handleApiError(error)
    }
  }
}
