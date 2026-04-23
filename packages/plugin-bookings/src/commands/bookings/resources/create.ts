import { Flags } from '@oclif/core'
import { BookingsBaseCommand } from '../../../bookings-base-command.js'

export default class BookingsResourcesCreate extends BookingsBaseCommand<typeof BookingsResourcesCreate> {
  static id = 'bookings resources create'
  static summary = '[EXPERIMENTAL] Create a Zoho Bookings resource (endpoint undocumented; may fail)'

  static flags = {
    data: Flags.string({ description: 'JSON object describing the resource', required: true }),
    'dry-run': Flags.boolean({ description: 'Show request without executing', default: false }),
  }

  async run(): Promise<void> {
    const { flags } = this
    let parsed: Record<string, unknown>
    try {
      parsed = JSON.parse(flags.data)
    } catch {
      this.outputError('INVALID_JSON', 'Invalid JSON in --data flag')
      this.exit(3)
    }
    if (flags['dry-run']) {
      this.outputSuccess({ dryRun: true, method: 'POST', action: 'createresource', body: parsed, experimental: true }, { action: 'resources.create' })
      return
    }
    try {
      const result = await this.bookingsPostForm('createresource', parsed)
      this.outputSuccess(result, { action: 'resources.create' })
    } catch (error: any) {
      this.handleApiError(error)
    }
  }
}
