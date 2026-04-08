import { Flags } from '@oclif/core'
import { PeopleBaseCommand } from '../../../people-base-command.js'

export default class PeopleAttendanceCheckout extends PeopleBaseCommand<typeof PeopleAttendanceCheckout> {
  static id = 'people attendance checkout'
  static summary = 'Check out an employee'
  static examples = [
    'zoho people attendance checkout -d \'{"empId":"12345","checkOut":"2024-01-15 18:00:00","dateFormat":"yyyy-MM-dd HH:mm:ss"}\'',
  ]

  static flags = {
    data: Flags.string({
      char: 'd',
      description: 'JSON with empId/emailId, checkOut, dateFormat',
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
      this.outputSuccess({ dryRun: true, params: parsed }, { action: 'attendance.checkout' })
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
      this.outputSuccess(this.extractResult(data), { action: 'attendance.checkout' })
    } catch (error: any) {
      this.handleApiError(error)
    }
  }
}
