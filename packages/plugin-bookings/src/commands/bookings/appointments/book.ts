import { Flags } from '@oclif/core'
import { BookingsBaseCommand } from '../../../bookings-base-command.js'
import { bookingsDateTimeFlag } from '../../../date-format.js'

export default class BookingsAppointmentsBook extends BookingsBaseCommand<typeof BookingsAppointmentsBook> {
  static id = 'bookings appointments book'
  static summary = 'Create a new appointment (one of staff/group/resource + customer details required)'
  static examples = [
    'zoho bookings appointments book --service svc_1 --staff stf_1 --from-time 2026-05-01T10:00 --customer-name Alice --customer-email alice@x.com --customer-phone-number 555-1234',
  ]

  static flags = {
    service: Flags.string({ description: 'Service ID', required: true }),
    staff: Flags.string({ description: 'Staff ID' }),
    group: Flags.string({ description: 'Group ID' }),
    resource: Flags.string({ description: 'Resource ID' }),
    'from-time': bookingsDateTimeFlag({ description: 'Appointment start (ISO 8601)', required: true }),
    'to-time': bookingsDateTimeFlag({ description: 'Appointment end (ISO 8601; for resource bookings)' }),
    timezone: Flags.string({ description: 'IANA timezone (e.g. Asia/Kolkata)' }),
    'customer-details': Flags.string({ description: 'JSON object with full customer details (alternative to --customer-name/email/phone)' }),
    'customer-name': Flags.string({ description: 'Customer full name' }),
    'customer-email': Flags.string({ description: 'Customer email' }),
    'customer-phone-number': Flags.string({ description: 'Customer phone' }),
    notes: Flags.string({ description: 'Appointment notes' }),
    'additional-fields': Flags.string({ description: 'JSON object of custom field values' }),
    'payment-info': Flags.string({ description: 'JSON object for payment_info (e.g. {"cost_paid": "100"})' }),
    'dry-run': Flags.boolean({ description: 'Show request without executing', default: false }),
  }

  async run(): Promise<void> {
    const { flags } = this
    const assignees = [flags.staff, flags.group, flags.resource].filter(Boolean)
    if (assignees.length !== 1) {
      this.outputError('INVALID_FLAGS', 'Exactly one of --staff, --group, or --resource is required')
      this.exit(3)
    }
    let customer: Record<string, unknown>
    if (flags['customer-details']) {
      try {
        customer = JSON.parse(flags['customer-details'])
      } catch {
        this.outputError('INVALID_JSON', 'Invalid JSON in --customer-details flag')
        this.exit(3)
      }
    } else {
      if (!flags['customer-name'] || !flags['customer-email'] || !flags['customer-phone-number']) {
        this.outputError(
          'MISSING_FLAGS',
          'Either --customer-details <json> or all three of --customer-name / --customer-email / --customer-phone-number are required',
        )
        this.exit(3)
      }
      customer = {
        name: flags['customer-name'],
        email: flags['customer-email'],
        phone_number: flags['customer-phone-number'],
      }
    }
    let additional: unknown
    if (flags['additional-fields']) {
      try {
        additional = JSON.parse(flags['additional-fields'])
      } catch {
        this.outputError('INVALID_JSON', 'Invalid JSON in --additional-fields flag')
        this.exit(3)
      }
    }
    let payment: unknown
    if (flags['payment-info']) {
      try {
        payment = JSON.parse(flags['payment-info'])
      } catch {
        this.outputError('INVALID_JSON', 'Invalid JSON in --payment-info flag')
        this.exit(3)
      }
    }
    try {
      const body: Record<string, unknown> = {
        service_id: flags.service,
        staff_id: flags.staff,
        group_id: flags.group,
        resource_id: flags.resource,
        from_time: flags['from-time'],
        to_time: flags['to-time'],
        timezone: flags.timezone,
        notes: flags.notes,
        customer_details: customer,
        additional_fields: additional,
        payment_info: payment,
      }
      if (flags['dry-run']) {
        this.outputSuccess({ dryRun: true, method: 'POST', action: 'appointment', body }, { action: 'appointments.book' })
        return
      }
      const result = await this.bookingsPostForm('appointment', body)
      this.outputSuccess(result, { action: 'appointments.book' })
    } catch (error: any) {
      this.handleApiError(error)
    }
  }
}
