import { Flags } from '@oclif/core'
import { PeopleBaseCommand } from '../../../people-base-command.js'

export default class PeopleLeaveHolidays extends PeopleBaseCommand<typeof PeopleLeaveHolidays> {
  static id = 'people leave holidays'
  static summary = 'List holidays'
  static examples = [
    'zoho people leave holidays',
    'zoho people leave holidays --from 2024-01-01 --to 2024-12-31',
    'zoho people leave holidays --upcoming',
  ]

  static flags = {
    user: Flags.string({ description: 'User ID' }),
    location: Flags.string({ description: 'Location filter' }),
    from: Flags.string({ description: 'Start date' }),
    to: Flags.string({ description: 'End date' }),
    upcoming: Flags.boolean({ description: 'Show only upcoming holidays', default: false }),
  }

  async run(): Promise<void> {
    const { flags } = this

    try {
      const params: Record<string, string> = {}

      if (flags.user) params.userId = flags.user
      if (flags.location) params.location = flags.location
      if (flags.from) params.from = flags.from
      if (flags.to) params.to = flags.to
      if (flags.upcoming) params.upcoming = 'true'

      const { data } = await this.apiClient.get('/people/api/leave/v2/holidays/get', { params })
      this.outputSuccess(this.extractResult(data), { action: 'leave.holidays' })
    } catch (error: any) {
      this.handleApiError(error)
    }
  }
}
