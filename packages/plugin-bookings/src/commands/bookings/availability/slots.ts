import { Flags } from '@oclif/core'
import { BookingsBaseCommand } from '../../../bookings-base-command.js'
import { bookingsDateTimeFlag } from '../../../date-format.js'

export default class BookingsAvailabilitySlots extends BookingsBaseCommand<typeof BookingsAvailabilitySlots> {
  static id = 'bookings availability slots'
  static summary = 'Fetch available booking slots for a service/staff/group/resource on a date'
  static examples = [
    'zoho bookings availability slots --service svc_1 --staff stf_1 --selected-date 2026-05-01',
  ]

  static flags = {
    service: Flags.string({ description: 'Service ID', required: true }),
    staff: Flags.string({ description: 'Staff ID (mutually exclusive with --group, --resource)' }),
    group: Flags.string({ description: 'Group ID (mutually exclusive with --staff, --resource)' }),
    resource: Flags.string({ description: 'Resource ID (mutually exclusive with --staff, --group)' }),
    'selected-date': bookingsDateTimeFlag({ description: 'Date (ISO YYYY-MM-DD)', required: true, dateOnly: true }),
  }

  async run(): Promise<void> {
    const { flags } = this
    const assignees = [flags.staff, flags.group, flags.resource].filter(Boolean)
    if (assignees.length !== 1) {
      this.outputError('INVALID_FLAGS', 'Exactly one of --staff, --group, or --resource is required')
      this.exit(3)
    }
    try {
      const params: Record<string, string | undefined> = {
        service_id: flags.service,
        selected_date: flags['selected-date'],
      }
      if (flags.staff) params.staff_id = flags.staff
      if (flags.group) params.group_id = flags.group
      if (flags.resource) params.resource_id = flags.resource
      const result = await this.bookingsGet<any>('availableslots', params)
      this.outputSuccess(result, { action: 'availability.slots' })
    } catch (error: any) {
      this.handleApiError(error)
    }
  }
}
