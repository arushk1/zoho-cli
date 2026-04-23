import { Flags } from '@oclif/core'
import { BookingsBaseCommand } from '../../../bookings-base-command.js'
import { bookingsDateTimeFlag } from '../../../date-format.js'

const STATUSES = ['UPCOMING', 'CANCEL', 'ONGOING', 'PENDING', 'COMPLETED', 'NO_SHOW', 'PENDING_PAYMENT', 'PAYMENT_FAILURE']

export default class BookingsAppointmentsList extends BookingsBaseCommand<typeof BookingsAppointmentsList> {
  static id = 'bookings appointments list'
  static summary = 'List/filter appointments (paginated)'
  static examples = [
    'zoho bookings appointments list --status UPCOMING --per-page 100',
    'zoho bookings appointments list --customer-email alice@acme.com',
  ]

  static flags = {
    service: Flags.string({ description: 'Filter by service ID' }),
    staff: Flags.string({ description: 'Filter by staff ID' }),
    resource: Flags.string({ description: 'Filter by resource ID' }),
    'from-time': bookingsDateTimeFlag({ description: 'Earliest appointment start time' }),
    'to-time': bookingsDateTimeFlag({ description: 'Latest appointment start time' }),
    status: Flags.string({ description: `One of: ${STATUSES.join(', ')}`, options: STATUSES }),
    page: Flags.integer({ description: 'Page number (1-based)', default: 1 }),
    'per-page': Flags.integer({ description: 'Records per page (max 100, or 60 with --need-customer-more-info)', default: 50 }),
    'need-customer-more-info': Flags.boolean({ description: 'Include extended customer fields', default: false }),
    'customer-name': Flags.string({ description: 'Match customer name substring' }),
    'customer-email': Flags.string({ description: 'Match customer email substring' }),
    'customer-phone-number': Flags.string({ description: 'Match customer phone substring' }),
    'appointment-created-from': bookingsDateTimeFlag({ description: 'Filter by appointment-creation range start' }),
    'appointment-created-till': bookingsDateTimeFlag({ description: 'Filter by appointment-creation range end' }),
  }

  async run(): Promise<void> {
    const { flags } = this
    try {
      const limit = flags['need-customer-more-info']
        ? Math.min(flags['per-page'], 60)
        : Math.min(flags['per-page'], 100)
      const fields: Record<string, unknown> = {
        service_id: flags.service,
        staff_id: flags.staff,
        resource_id: flags.resource,
        from_time: flags['from-time'],
        to_time: flags['to-time'],
        status: flags.status,
        page: flags.page,
        per_page: limit,
        need_customer_more_info: flags['need-customer-more-info'] ? 'true' : undefined,
        customer_name: flags['customer-name'],
        customer_email: flags['customer-email'],
        customer_phone_number: flags['customer-phone-number'],
        appointment_created_from: flags['appointment-created-from'],
        appointment_created_till: flags['appointment-created-till'],
      }
      const result = await this.bookingsPostForm<any>('fetchappointment', fields)
      const data = Array.isArray(result) ? result : (result?.data ?? result)
      const hasMore = Boolean(result?.next_page_available)
      this.outputSuccess(data, { action: 'appointments.list', page: flags.page, perPage: limit, hasMore })
    } catch (error: any) {
      this.handleApiError(error)
    }
  }
}
