import { Flags } from '@oclif/core'
import { PeopleBaseCommand } from '../../../people-base-command.js'

export default class PeopleLeaveBookedReport extends PeopleBaseCommand<typeof PeopleLeaveBookedReport> {
  static id = 'people leave booked-report'
  static summary = 'Get booked and balance leave report'
  static examples = [
    'zoho people leave booked-report --from 2024-01-01 --to 2024-12-31',
  ]

  static flags = {
    from: Flags.string({ description: 'Start date', required: true }),
    to: Flags.string({ description: 'End date', required: true }),
    employee: Flags.string({ description: 'Employee ID filter' }),
    department: Flags.string({ description: 'Department filter' }),
    'leave-type': Flags.string({ description: 'Leave type filter' }),
    page: Flags.integer({ description: 'Page number', default: 1 }),
    'per-page': Flags.integer({ description: 'Records per page', default: 30 }),
  }

  async run(): Promise<void> {
    const { flags } = this

    try {
      const startIndex = (flags.page - 1) * flags['per-page']
      const params: Record<string, string> = {
        from: flags.from,
        to: flags.to,
        startIndex: String(startIndex),
        limit: String(flags['per-page']),
      }

      if (flags.employee) params.employee = flags.employee
      if (flags.department) params.department = flags.department
      if (flags['leave-type']) params.leavetype = flags['leave-type']

      const { data } = await this.apiClient.get('/people/api/v2/leavetracker/reports/bookedAndBalance', { params })
      this.outputSuccess(this.extractResult(data), {
        action: 'leave.booked-report',
        page: flags.page,
        perPage: flags['per-page'],
      })
    } catch (error: any) {
      this.handleApiError(error)
    }
  }
}
