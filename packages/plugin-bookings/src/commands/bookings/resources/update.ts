import { Args, Flags } from '@oclif/core'
import { BookingsBaseCommand } from '../../../bookings-base-command.js'

export default class BookingsResourcesUpdate extends BookingsBaseCommand<typeof BookingsResourcesUpdate> {
  static id = 'bookings resources update'
  static summary = '[EXPERIMENTAL] Update a Zoho Bookings resource (endpoint undocumented; may fail)'

  static args = {
    id: Args.string({ description: 'Resource ID', required: true }),
  }

  static flags = {
    data: Flags.string({ description: 'JSON object with fields to update', required: true }),
    'dry-run': Flags.boolean({ description: 'Show request without executing', default: false }),
  }

  async run(): Promise<void> {
    const { args, flags } = this
    let parsed: Record<string, unknown>
    try {
      parsed = JSON.parse(flags.data)
    } catch {
      this.outputError('INVALID_JSON', 'Invalid JSON in --data flag')
      this.exit(3)
    }
    const fields = { resource_id: args.id, ...parsed }
    if (flags['dry-run']) {
      this.outputSuccess({ dryRun: true, method: 'POST', action: 'updateresource', body: fields, experimental: true }, { action: 'resources.update' })
      return
    }
    try {
      const result = await this.bookingsPostForm('updateresource', fields)
      this.outputSuccess(result, { action: 'resources.update' })
    } catch (error: any) {
      this.handleApiError(error)
    }
  }
}
