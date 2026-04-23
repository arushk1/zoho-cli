import { Args, Flags } from '@oclif/core'
import { BookingsBaseCommand } from '../../../bookings-base-command.js'

export default class BookingsAppointmentsNoshow extends BookingsBaseCommand<typeof BookingsAppointmentsNoshow> {
  static id = 'bookings appointments noshow'
  static summary = 'Mark an appointment as no-show'

  static args = {
    id: Args.string({ description: 'Booking ID', required: true }),
  }

  static flags = {
    'dry-run': Flags.boolean({ description: 'Show request without executing', default: false }),
  }

  async run(): Promise<void> {
    const { args, flags } = this
    const body = { booking_id: args.id, action: 'noshow' }
    if (flags['dry-run']) {
      this.outputSuccess({ dryRun: true, method: 'POST', action: 'updateappointment', body }, { action: 'appointments.noshow' })
      return
    }
    try {
      const result = await this.bookingsPostForm('updateappointment', body)
      this.outputSuccess(result, { action: 'appointments.noshow' })
    } catch (error: any) {
      this.handleApiError(error)
    }
  }
}
