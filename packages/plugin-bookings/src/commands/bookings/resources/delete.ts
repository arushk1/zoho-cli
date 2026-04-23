import { Args, Flags } from '@oclif/core'
import { BookingsBaseCommand } from '../../../bookings-base-command.js'

export default class BookingsResourcesDelete extends BookingsBaseCommand<typeof BookingsResourcesDelete> {
  static id = 'bookings resources delete'
  static summary = '[EXPERIMENTAL] Delete a Zoho Bookings resource (endpoint undocumented; may fail)'

  static args = {
    id: Args.string({ description: 'Resource ID', required: true }),
  }

  static flags = {
    'dry-run': Flags.boolean({ description: 'Show request without executing', default: false }),
  }

  async run(): Promise<void> {
    const { args, flags } = this
    const fields = { resource_id: args.id }
    if (flags['dry-run']) {
      this.outputSuccess({ dryRun: true, method: 'POST', action: 'deleteresource', body: fields, experimental: true }, { action: 'resources.delete' })
      return
    }
    try {
      const result = await this.bookingsPostForm('deleteresource', fields)
      this.outputSuccess(result, { action: 'resources.delete' })
    } catch (error: any) {
      this.handleApiError(error)
    }
  }
}
