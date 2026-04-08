import { Flags } from '@oclif/core'
import { PeopleBaseCommand } from '../../../people-base-command.js'

export default class PeopleLeaveUserReport extends PeopleBaseCommand<typeof PeopleLeaveUserReport> {
  static id = 'people leave user-report'
  static summary = 'Get leave report for a specific employee'
  static examples = [
    'zoho people leave user-report --employee 12345',
    'zoho people leave user-report --employee 12345 --to 2024-12-31',
  ]

  static flags = {
    employee: Flags.string({ description: 'Employee ID', required: true }),
    to: Flags.string({ description: 'End date filter' }),
  }

  async run(): Promise<void> {
    const { flags } = this

    try {
      const params: Record<string, string> = {
        employee: flags.employee,
      }

      if (flags.to) params.to = flags.to

      const { data } = await this.apiClient.get('/people/api/v2/leavetracker/reports/user', { params })
      this.outputSuccess(this.extractResult(data), { action: 'leave.user-report' })
    } catch (error: any) {
      this.handleApiError(error)
    }
  }
}
