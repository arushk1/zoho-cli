import { Args, Flags } from '@oclif/core'
import { BookingsBaseCommand } from '../../../bookings-base-command.js'

export default class BookingsAppointmentsCancel extends BookingsBaseCommand<typeof BookingsAppointmentsCancel> {
  static id = 'bookings appointments cancel'
  static summary = 'Cancel an appointment'

  static args = {
    id: Args.string({ description: 'Booking ID', required: true }),
  }

  static flags = {
    'dry-run': Flags.boolean({ description: 'Show request without executing', default: false }),
  }

  async run(): Promise<void> {
    const { args, flags } = this
    const body = { booking_id: args.id, action: 'cancel' }
    if (flags['dry-run']) {
      this.outputSuccess({ dryRun: true, method: 'POST', action: 'updateappointment', body }, { action: 'appointments.cancel' })
      return
    }
    try {
      const result = await this.bookingsPostForm('updateappointment', body)
      this.outputSuccess(result, { action: 'appointments.cancel' })
    } catch (error: any) {
      this.handleApiError(error)
    }
  }
}
