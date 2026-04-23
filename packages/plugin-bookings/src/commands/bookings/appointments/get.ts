import { Args } from '@oclif/core'
import { BookingsBaseCommand } from '../../../bookings-base-command.js'

export default class BookingsAppointmentsGet extends BookingsBaseCommand<typeof BookingsAppointmentsGet> {
  static id = 'bookings appointments get'
  static summary = 'Get a Zoho Bookings appointment by ID'

  static args = {
    id: Args.string({ description: 'Booking ID', required: true }),
  }

  async run(): Promise<void> {
    try {
      const result = await this.bookingsGet<any>('getappointment', { booking_id: this.args.id })
      this.outputSuccess(result, { action: 'appointments.get' })
    } catch (error: any) {
      this.handleApiError(error)
    }
  }
}
