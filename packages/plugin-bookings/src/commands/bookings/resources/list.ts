import { Flags } from '@oclif/core'
import { BookingsBaseCommand } from '../../../bookings-base-command.js'

export default class BookingsResourcesList extends BookingsBaseCommand<typeof BookingsResourcesList> {
  static id = 'bookings resources list'
  static summary = 'List Zoho Bookings resources'

  static flags = {
    service: Flags.string({ description: 'Filter by service ID' }),
  }

  async run(): Promise<void> {
    try {
      const params: Record<string, string | undefined> = {}
      if (this.flags.service) params.service_id = this.flags.service
      const result = await this.bookingsGet<any>('resources', params)
      const data = Array.isArray(result) ? result : (result?.data ?? result)
      this.outputSuccess(data, { action: 'resources.list' })
    } catch (error: any) {
      this.handleApiError(error)
    }
  }
}
