import { Flags } from '@oclif/core'
import { BookingsBaseCommand } from '../../../bookings-base-command.js'

export default class BookingsServicesList extends BookingsBaseCommand<typeof BookingsServicesList> {
  static id = 'bookings services list'
  static summary = 'List Zoho Bookings services in a workspace'
  static examples = ['zoho bookings services list', 'zoho bookings services list --staff stf_123']

  static flags = {
    staff: Flags.string({ description: 'Filter by staff ID' }),
  }

  async run(): Promise<void> {
    try {
      const workspace = await this.resolveWorkspaceId()
      const params: Record<string, string | undefined> = { workspace_id: workspace }
      if (this.flags.staff) params.staff_id = this.flags.staff
      const result = await this.bookingsGet<any>('services', params)
      const data = Array.isArray(result) ? result : (result?.data ?? result)
      this.outputSuccess(data, { action: 'services.list' })
    } catch (error: any) {
      this.handleApiError(error)
    }
  }
}
