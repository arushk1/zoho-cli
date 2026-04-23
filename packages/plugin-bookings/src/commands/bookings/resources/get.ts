import { Args } from '@oclif/core'
import { BookingsBaseCommand } from '../../../bookings-base-command.js'

export default class BookingsResourcesGet extends BookingsBaseCommand<typeof BookingsResourcesGet> {
  static id = 'bookings resources get'
  static summary = 'Get a Zoho Bookings resource by ID'

  static args = {
    id: Args.string({ description: 'Resource ID', required: true }),
  }

  async run(): Promise<void> {
    try {
      const result = await this.bookingsGet<any>('resources', { resource_id: this.args.id })
      this.outputSuccess(result, { action: 'resources.get' })
    } catch (error: any) {
      this.handleApiError(error)
    }
  }
}
