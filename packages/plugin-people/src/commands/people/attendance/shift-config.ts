import { Flags } from '@oclif/core'
import { PeopleBaseCommand } from '../../../people-base-command.js'

export default class PeopleAttendanceShiftConfig extends PeopleBaseCommand<typeof PeopleAttendanceShiftConfig> {
  static id = 'people attendance shift-config'
  static summary = 'Get shift configuration for an employee'
  static examples = [
    'zoho people attendance shift-config --employee 12345',
    'zoho people attendance shift-config --employee 12345 --from 2024-01-01 --to 2024-01-31',
  ]

  static flags = {
    employee: Flags.string({
      description: 'Employee ID',
      required: true,
    }),
    from: Flags.string({
      description: 'Start date',
    }),
    to: Flags.string({
      description: 'End date',
    }),
  }

  async run(): Promise<void> {
    const { flags } = this
    try {
      const params: Record<string, string> = {
        empId: flags.employee,
      }
      if (flags.from) params.sdate = flags.from
      if (flags.to) params.edate = flags.to

      const { data } = await this.apiClient.get('/people/api/attendance/getShiftConfiguration', { params })
      this.outputSuccess(this.extractResult(data), { action: 'attendance.shift-config' })
    } catch (error: any) {
      this.handleApiError(error)
    }
  }
}
