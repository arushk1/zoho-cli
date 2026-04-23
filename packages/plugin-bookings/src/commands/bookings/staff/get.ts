import { Args } from '@oclif/core'
import { BookingsBaseCommand } from '../../../bookings-base-command.js'

export default class BookingsStaffGet extends BookingsBaseCommand<typeof BookingsStaffGet> {
  static id = 'bookings staff get'
  static summary = 'Get a Zoho Bookings staff member by ID'

  static args = {
    id: Args.string({ description: 'Staff ID', required: true }),
  }

  async run(): Promise<void> {
    try {
      const workspace = await this.resolveWorkspaceId()
      const result = await this.bookingsGet<any>('staffs', { workspace_id: workspace, staff_id: this.args.id })
      this.outputSuccess(result, { action: 'staff.get' })
    } catch (error: any) {
      this.handleApiError(error)
    }
  }
}
