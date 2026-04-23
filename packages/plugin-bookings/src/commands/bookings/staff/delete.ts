import { Args, Flags } from '@oclif/core'
import { BookingsBaseCommand } from '../../../bookings-base-command.js'

export default class BookingsStaffDelete extends BookingsBaseCommand<typeof BookingsStaffDelete> {
  static id = 'bookings staff delete'
  static summary = '[EXPERIMENTAL] Delete a Zoho Bookings staff member (endpoint undocumented; may fail)'

  static args = {
    id: Args.string({ description: 'Staff ID', required: true }),
  }

  static flags = {
    'dry-run': Flags.boolean({ description: 'Show request without executing', default: false }),
  }

  async run(): Promise<void> {
    const { args, flags } = this
    const fields = { staff_id: args.id }
    if (flags['dry-run']) {
      this.outputSuccess({ dryRun: true, method: 'POST', action: 'deletestaff', body: fields, experimental: true }, { action: 'staff.delete' })
      return
    }
    try {
      const result = await this.bookingsPostForm('deletestaff', fields)
      this.outputSuccess(result, { action: 'staff.delete' })
    } catch (error: any) {
      this.handleApiError(error)
    }
  }
}
