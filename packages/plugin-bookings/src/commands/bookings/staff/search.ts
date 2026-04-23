import { Args } from '@oclif/core'
import { BookingsBaseCommand } from '../../../bookings-base-command.js'

export default class BookingsStaffSearch extends BookingsBaseCommand<typeof BookingsStaffSearch> {
  static id = 'bookings staff search'
  static summary = 'Search staff by email substring'

  static args = {
    email: Args.string({ description: 'Email substring to match', required: true }),
  }

  async run(): Promise<void> {
    try {
      const workspace = await this.resolveWorkspaceId()
      const result = await this.bookingsGet<any>('staffs', { workspace_id: workspace, staff_email: this.args.email })
      const data = Array.isArray(result) ? result : (result?.data ?? result)
      this.outputSuccess(data, { action: 'staff.search' })
    } catch (error: any) {
      this.handleApiError(error)
    }
  }
}
