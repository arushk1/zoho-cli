import { Flags } from '@oclif/core'
import { PeopleBaseCommand } from '../../../people-base-command.js'

export default class PeopleAttendanceReport extends PeopleBaseCommand<typeof PeopleAttendanceReport> {
  static id = 'people attendance report'
  static summary = 'Get attendance report for a date range'
  static examples = [
    'zoho people attendance report --from 2024-01-01 --to 2024-01-31',
    'zoho people attendance report --from 2024-01-01 --to 2024-01-31 --employee 12345',
  ]

  static flags = {
    from: Flags.string({
      description: 'Start date',
      required: true,
    }),
    to: Flags.string({
      description: 'End date',
      required: true,
    }),
    employee: Flags.string({
      description: 'Employee identifier (empId or emailId)',
    }),
    page: Flags.integer({
      description: 'Start index (stepped by 100)',
      default: 0,
    }),
    'date-format': Flags.string({
      description: 'Date format string (e.g. yyyy-MM-dd)',
    }),
  }

  async run(): Promise<void> {
    const { flags } = this
    try {
      const params: Record<string, string> = {
        sdate: flags.from,
        edate: flags.to,
        startIndex: String(flags.page),
      }
      if (flags.employee) params.empId = flags.employee
      if (flags['date-format']) params.dateFormat = flags['date-format']

      const { data } = await this.apiClient.get('/people/api/attendance/getUserReport', { params })
      this.outputSuccess(this.extractResult(data), { action: 'attendance.report' })
    } catch (error: any) {
      this.handleApiError(error)
    }
  }
}
