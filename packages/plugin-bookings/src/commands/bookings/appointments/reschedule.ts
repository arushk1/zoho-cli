import { Args, Flags } from '@oclif/core'
import { BookingsBaseCommand } from '../../../bookings-base-command.js'
import { bookingsDateTimeFlag } from '../../../date-format.js'

export default class BookingsAppointmentsReschedule extends BookingsBaseCommand<typeof BookingsAppointmentsReschedule> {
  static id = 'bookings appointments reschedule'
  static summary = 'Reschedule an appointment (change staff/group and/or start time)'

  static args = {
    id: Args.string({ description: 'Booking ID', required: true }),
  }

  static flags = {
    staff: Flags.string({ description: 'New staff ID' }),
    group: Flags.string({ description: 'New group ID' }),
    'start-time': bookingsDateTimeFlag({ description: 'New appointment start (ISO 8601)' }),
    'dry-run': Flags.boolean({ description: 'Show request without executing', default: false }),
  }

  async run(): Promise<void> {
    const { args, flags } = this
    if (!flags.staff && !flags.group && !flags['start-time']) {
      this.outputError('MISSING_FLAGS', 'At least one of --staff, --group, or --start-time is required')
      this.exit(3)
    }
    try {
      const body: Record<string, unknown> = {
        booking_id: args.id,
        staff_id: flags.staff,
        group_id: flags.group,
        start_time: flags['start-time'],
      }
      if (flags['dry-run']) {
        this.outputSuccess({ dryRun: true, method: 'POST', action: 'rescheduleappointment', body }, { action: 'appointments.reschedule' })
        return
      }
      const result = await this.bookingsPostForm('rescheduleappointment', body)
      this.outputSuccess(result, { action: 'appointments.reschedule' })
    } catch (error: any) {
      this.handleApiError(error)
    }
  }
}
