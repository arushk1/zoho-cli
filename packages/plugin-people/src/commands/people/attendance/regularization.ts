import { Flags } from '@oclif/core'
import { PeopleBaseCommand } from '../../../people-base-command.js'

export default class PeopleAttendanceRegularization extends PeopleBaseCommand<typeof PeopleAttendanceRegularization> {
  static id = 'people attendance regularization'
  static summary = 'Get attendance regularization records'
  static examples = [
    'zoho people attendance regularization --from 2024-01-01 --to 2024-01-31',
    'zoho people attendance regularization --employee 12345 --from 2024-01-01 --to 2024-01-31',
  ]

  static flags = {
    from: Flags.string({
      description: 'Start date',
    }),
    to: Flags.string({
      description: 'End date',
    }),
    employee: Flags.string({
      description: 'Employee ID',
    }),
    page: Flags.integer({
      description: 'Start index for pagination',
      default: 0,
    }),
  }

  async run(): Promise<void> {
    const { flags } = this
    try {
      const params: Record<string, string> = {
        startIndex: String(flags.page),
      }
      if (flags.from) params.fromdate = flags.from
      if (flags.to) params.todate = flags.to
      if (flags.employee) params.employeeId = flags.employee

      const { data } = await this.apiClient.get('/people/api/attendance/getRegularizationRecords', { params })
      this.outputSuccess(this.extractResult(data), { action: 'attendance.regularization' })
    } catch (error: any) {
      this.handleApiError(error)
    }
  }
}
