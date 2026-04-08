import { Flags } from '@oclif/core'
import { PeopleBaseCommand } from '../../../people-base-command.js'

export default class PeopleAttendanceEntries extends PeopleBaseCommand<typeof PeopleAttendanceEntries> {
  static id = 'people attendance entries'
  static summary = 'Get attendance entries for a date/employee'
  static examples = [
    'zoho people attendance entries --date 2024-01-15',
    'zoho people attendance entries --employee 12345 --date 2024-01-15',
  ]

  static flags = {
    date: Flags.string({
      description: 'Date to fetch entries for',
    }),
    employee: Flags.string({
      description: 'Employee identifier (empId, emailId, or mapId)',
    }),
    'date-format': Flags.string({
      description: 'Date format string (e.g. yyyy-MM-dd)',
    }),
  }

  async run(): Promise<void> {
    const { flags } = this
    try {
      const params: Record<string, string> = {}
      if (flags.date) params.date = flags.date
      if (flags.employee) params.empId = flags.employee
      if (flags['date-format']) params.dateFormat = flags['date-format']

      const { data } = await this.apiClient.get('/people/api/attendance/getAttendanceEntries', { params })
      this.outputSuccess(this.extractResult(data), { action: 'attendance.entries' })
    } catch (error: any) {
      this.handleApiError(error)
    }
  }
}
