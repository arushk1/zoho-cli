import { Flags } from '@oclif/core'
import { PeopleBaseCommand } from '../../../people-base-command.js'

export default class PeopleAttendanceLatest extends PeopleBaseCommand<typeof PeopleAttendanceLatest> {
  static id = 'people attendance latest'
  static summary = 'Fetch latest attendance entries'
  static examples = [
    'zoho people attendance latest',
    'zoho people attendance latest --duration 30',
  ]

  static flags = {
    duration: Flags.integer({
      description: 'Minutes to look back',
      default: 60,
    }),
  }

  async run(): Promise<void> {
    const { flags } = this
    try {
      const { data } = await this.apiClient.get('/api/attendance/fetchLatestAttEntries', {
        params: { duration: String(flags.duration) },
      })
      this.outputSuccess(this.extractResult(data), { action: 'attendance.latest' })
    } catch (error: any) {
      this.handleApiError(error)
    }
  }
}
