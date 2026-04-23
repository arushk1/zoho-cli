import { Args, Flags } from '@oclif/core'
import { BookingsBaseCommand } from '../../../bookings-base-command.js'

export default class BookingsAppointmentsComplete extends BookingsBaseCommand<typeof BookingsAppointmentsComplete> {
  static id = 'bookings appointments complete'
  static summary = 'Mark an appointment as completed'

  static args = {
    id: Args.string({ description: 'Booking ID', required: true }),
  }

  static flags = {
    'dry-run': Flags.boolean({ description: 'Show request without executing', default: false }),
  }

  async run(): Promise<void> {
    const { args, flags } = this
    const body = { booking_id: args.id, action: 'completed' }
    if (flags['dry-run']) {
      this.outputSuccess({ dryRun: true, method: 'POST', action: 'updateappointment', body }, { action: 'appointments.complete' })
      return
    }
    try {
      const result = await this.bookingsPostForm('updateappointment', body)
      this.outputSuccess(result, { action: 'appointments.complete' })
    } catch (error: any) {
      this.handleApiError(error)
    }
  }
}
