import { Args, Flags } from '@oclif/core'
import { BookingsBaseCommand } from '../../../bookings-base-command.js'

export default class BookingsStaffUpdate extends BookingsBaseCommand<typeof BookingsStaffUpdate> {
  static id = 'bookings staff update'
  static summary = '[EXPERIMENTAL] Update a Zoho Bookings staff member (endpoint undocumented; may fail)'

  static args = {
    id: Args.string({ description: 'Staff ID', required: true }),
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
    const fields = { staff_id: args.id, ...parsed }
    if (flags['dry-run']) {
      this.outputSuccess({ dryRun: true, method: 'POST', action: 'updatestaff', body: fields, experimental: true }, { action: 'staff.update' })
      return
    }
    try {
      const result = await this.bookingsPostForm('updatestaff', fields)
      this.outputSuccess(result, { action: 'staff.update' })
    } catch (error: any) {
      this.handleApiError(error)
    }
  }
}
