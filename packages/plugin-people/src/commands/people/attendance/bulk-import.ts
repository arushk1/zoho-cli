import { Flags } from '@oclif/core'
import { PeopleBaseCommand } from '../../../people-base-command.js'

export default class PeopleAttendanceBulkImport extends PeopleBaseCommand<typeof PeopleAttendanceBulkImport> {
  static id = 'people attendance bulk-import'
  static summary = 'Bulk import attendance check-in/out entries'
  static examples = [
    'zoho people attendance bulk-import -d \'[{"empId":"12345","checkIn":"2024-01-15 09:00:00","checkOut":"2024-01-15 18:00:00"}]\'',
  ]

  static flags = {
    data: Flags.string({
      char: 'd',
      description: 'JSON array of check-in/out entries',
      required: true,
    }),
    'date-format': Flags.string({
      description: 'Date format string (e.g. yyyy-MM-dd HH:mm:ss)',
    }),
    'dry-run': Flags.boolean({
      description: 'Preview without making changes',
      default: false,
    }),
  }

  async run(): Promise<void> {
    const { flags } = this
    let parsedArray: unknown[]
    try {
      parsedArray = JSON.parse(flags.data)
    } catch {
      this.outputError('INVALID_JSON', 'Failed to parse --data as JSON array')
      this.exit(3)
    }

    if (!Array.isArray(parsedArray)) {
      this.outputError('INVALID_JSON', '--data must be a JSON array')
      this.exit(3)
    }

    if (flags['dry-run']) {
      this.outputSuccess({ dryRun: true, entries: parsedArray, count: parsedArray.length }, { action: 'attendance.bulk-import' })
      return
    }

    try {
      const params = new URLSearchParams()
      params.append('data', JSON.stringify(parsedArray))
      if (flags['date-format']) params.append('dateFormat', flags['date-format'])

      const { data } = await this.apiClient.post(
        '/people/api/attendance/bulkImport',
        params.toString(),
        { headers: { 'Content-Type': 'application/x-www-form-urlencoded' } },
      )
      this.outputSuccess(this.extractResult(data), { action: 'attendance.bulk-import' })
    } catch (error: any) {
      this.handleApiError(error)
    }
  }
}
