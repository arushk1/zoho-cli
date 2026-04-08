import { Flags } from '@oclif/core'
import { PeopleBaseCommand } from '../../../people-base-command.js'

export default class PeopleLeaveTypes extends PeopleBaseCommand<typeof PeopleLeaveTypes> {
  static id = 'people leave types'
  static summary = 'Get leave type details for a user'
  static examples = [
    'zoho people leave types --user 12345',
  ]

  static flags = {
    user: Flags.string({ description: 'User ID', required: true }),
  }

  async run(): Promise<void> {
    const { flags } = this

    try {
      const { data } = await this.apiClient.get('/people/api/leave/getLeaveTypeDetails', {
        params: { userId: flags.user },
      })
      this.outputSuccess(this.extractResult(data), { action: 'leave.types' })
    } catch (error: any) {
      this.handleApiError(error)
    }
  }
}
