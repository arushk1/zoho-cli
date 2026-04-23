import { Args, Flags } from '@oclif/core'
import { BookingsBaseCommand } from '../../../bookings-base-command.js'

export default class BookingsServicesDelete extends BookingsBaseCommand<typeof BookingsServicesDelete> {
  static id = 'bookings services delete'
  static summary = '[EXPERIMENTAL] Delete a Zoho Bookings service (endpoint undocumented; may fail)'

  static args = {
    id: Args.string({ description: 'Service ID', required: true }),
  }

  static flags = {
    'dry-run': Flags.boolean({ description: 'Show request without executing', default: false }),
  }

  async run(): Promise<void> {
    const { args, flags } = this
    const fields = { service_id: args.id }
    if (flags['dry-run']) {
      this.outputSuccess({ dryRun: true, method: 'POST', action: 'deleteservice', body: fields, experimental: true }, { action: 'services.delete' })
      return
    }
    try {
      const result = await this.bookingsPostForm('deleteservice', fields)
      this.outputSuccess(result, { action: 'services.delete' })
    } catch (error: any) {
      this.handleApiError(error)
    }
  }
}
