import { Flags } from '@oclif/core'
import { PeopleBaseCommand } from '../../../people-base-command.js'

export default class PeopleAttendanceCheckin extends PeopleBaseCommand<typeof PeopleAttendanceCheckin> {
  static id = 'people attendance checkin'
  static summary = 'Check in an employee'
  static examples = [
    'zoho people attendance checkin -d \'{"empId":"12345","checkIn":"2024-01-15 09:00:00","dateFormat":"yyyy-MM-dd HH:mm:ss"}\'',
  ]

  static flags = {
    data: Flags.string({
      char: 'd',
      description: 'JSON with empId/emailId, checkIn, dateFormat',
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
      this.outputSuccess({ dryRun: true, params: parsed }, { action: 'attendance.checkin' })
      return
    }

    try {
      const params = new URLSearchParams()
      for (const [key, value] of Object.entries(parsed)) {
        params.append(key, String(value))
      }

      const { data } = await this.apiClient.post(
        '/people/api/attendance',
        params.toString(),
        { headers: { 'Content-Type': 'application/x-www-form-urlencoded' } },
      )
      this.outputSuccess(this.extractResult(data), { action: 'attendance.checkin' })
    } catch (error: any) {
      this.handleApiError(error)
    }
  }
}
