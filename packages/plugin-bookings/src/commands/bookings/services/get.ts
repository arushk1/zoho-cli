import { Args } from '@oclif/core'
import { BookingsBaseCommand } from '../../../bookings-base-command.js'

export default class BookingsServicesGet extends BookingsBaseCommand<typeof BookingsServicesGet> {
  static id = 'bookings services get'
  static summary = 'Get a Zoho Bookings service by ID'

  static args = {
    id: Args.string({ description: 'Service ID', required: true }),
  }

  async run(): Promise<void> {
    try {
      const workspace = await this.resolveWorkspaceId()
      const result = await this.bookingsGet<any>('services', { workspace_id: workspace, service_id: this.args.id })
      this.outputSuccess(result, { action: 'services.get' })
    } catch (error: any) {
      this.handleApiError(error)
    }
  }
}
