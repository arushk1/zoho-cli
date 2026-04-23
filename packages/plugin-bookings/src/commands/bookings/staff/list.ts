import { Flags } from '@oclif/core'
import { BookingsBaseCommand } from '../../../bookings-base-command.js'

export default class BookingsStaffList extends BookingsBaseCommand<typeof BookingsStaffList> {
  static id = 'bookings staff list'
  static summary = 'List staff in the current Bookings workspace'

  static flags = {
    service: Flags.string({ description: 'Filter by service ID' }),
  }

  async run(): Promise<void> {
    try {
      const workspace = await this.resolveWorkspaceId()
      const params: Record<string, string | undefined> = { workspace_id: workspace }
      if (this.flags.service) params.service_id = this.flags.service
      const result = await this.bookingsGet<any>('staffs', params)
      const data = Array.isArray(result) ? result : (result?.data ?? result)
      this.outputSuccess(data, { action: 'staff.list' })
    } catch (error: any) {
      this.handleApiError(error)
    }
  }
}
