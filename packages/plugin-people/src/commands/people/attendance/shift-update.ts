import { Flags } from '@oclif/core'
import { PeopleBaseCommand } from '../../../people-base-command.js'

export default class PeopleAttendanceShiftUpdate extends PeopleBaseCommand<typeof PeopleAttendanceShiftUpdate> {
  static id = 'people attendance shift-update'
  static summary = 'Update shift assignment for an employee'
  static examples = [
    'zoho people attendance shift-update -d \'{"empId":"12345","shiftName":"Morning","fdate":"2024-01-01","tdate":"2024-01-31"}\'',
  ]

  static flags = {
    data: Flags.string({
      char: 'd',
      description: 'JSON with empId, shiftName, fdate, tdate',
      required: true,
    }),
    'dry-run': Flags.boolean({
      description: 'Preview without making changes',
      default: false,
    }),
  }

  async run(): Promise<void> {
    const { flags } = this
    let parsed: Record<string, string>
    try {
      parsed = JSON.parse(flags.data)
    } catch {
      this.outputError('INVALID_JSON', 'Failed to parse --data as JSON')
      this.exit(3)
    }

    if (flags['dry-run']) {
      this.outputSuccess({ dryRun: true, params: parsed }, { action: 'attendance.shift-update' })
      return
    }

    try {
      const params = new URLSearchParams()
      for (const [key, value] of Object.entries(parsed)) {
        params.append(key, String(value))
      }

      const { data } = await this.apiClient.post(
        '/people/api/attendance/updateUserShift',
        params.toString(),
        { headers: { 'Content-Type': 'application/x-www-form-urlencoded' } },
      )
      this.outputSuccess(this.extractResult(data), { action: 'attendance.shift-update' })
    } catch (error: any) {
      this.handleApiError(error)
    }
  }
}
