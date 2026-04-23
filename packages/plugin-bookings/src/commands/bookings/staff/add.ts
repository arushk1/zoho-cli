import { Flags } from '@oclif/core'
import { readFile } from 'node:fs/promises'
import { BookingsBaseCommand } from '../../../bookings-base-command.js'
import { bookingsDateTimeFlag } from '../../../date-format.js'

export default class BookingsStaffAdd extends BookingsBaseCommand<typeof BookingsStaffAdd> {
  static id = 'bookings staff add'
  static summary = 'Add one or more staff to the current workspace (bulk up to 50)'
  static examples = [
    'zoho bookings staff add --name Alice --email alice@acme.com --role Staff',
    'zoho bookings staff add --file staff.json',
  ]

  static flags = {
    name: Flags.string({ description: 'Staff full name (single-record mode)' }),
    email: Flags.string({ description: 'Staff email (single-record mode)' }),
    role: Flags.string({ description: 'Admin | Manager | Staff', options: ['Admin', 'Manager', 'Staff'] }),
    gender: Flags.string({ description: 'Gender' }),
    dob: bookingsDateTimeFlag({ description: 'Date of birth', dateOnly: true }),
    phone: Flags.string({ description: 'Phone number' }),
    designation: Flags.string({ description: 'Designation' }),
    'assigned-services': Flags.string({ description: 'Comma-separated service IDs to assign' }),
    'additional-info': Flags.string({ description: 'Additional info (JSON object)' }),
    file: Flags.string({ description: 'Path to JSON array of up to 50 staff objects (bulk mode)' }),
    'dry-run': Flags.boolean({ description: 'Show request without executing', default: false }),
  }

  async run(): Promise<void> {
    const { flags } = this
    try {
      let staffMap: unknown[]
      if (flags.file) {
        const raw = await readFile(flags.file, 'utf-8')
        const parsed = JSON.parse(raw)
        if (!Array.isArray(parsed)) {
          this.outputError('INVALID_FILE', '--file must contain a JSON array of staff objects')
          this.exit(3)
        }
        staffMap = parsed
      } else {
        if (!flags.name || !flags.email) {
          this.outputError('MISSING_FLAGS', 'Single-record mode requires --name and --email (or use --file for bulk)')
          this.exit(3)
        }
        const staff: Record<string, unknown> = {
          name: flags.name,
          email: flags.email,
          role: flags.role,
          gender: flags.gender,
          dob: flags.dob,
          phone: flags.phone,
          designation: flags.designation,
        }
        if (flags['assigned-services']) {
          staff.assigned_services = flags['assigned-services'].split(',').map((s) => s.trim()).filter(Boolean)
        }
        if (flags['additional-info']) {
          try {
            staff.additional_info = JSON.parse(flags['additional-info'])
          } catch {
            this.outputError('INVALID_JSON', 'Invalid JSON in --additional-info flag')
            this.exit(3)
          }
        }
        staffMap = [staff]
      }

      if (staffMap.length > 50) {
        this.outputError('TOO_MANY_STAFF', 'Zoho Bookings allows at most 50 staff per add call')
        this.exit(3)
      }

      const workspace = await this.resolveWorkspaceId()
      const body = { workspace_id: workspace, staffMap }
      if (flags['dry-run']) {
        this.outputSuccess({ dryRun: true, method: 'POST', action: 'addstaff', body }, { action: 'staff.add' })
        return
      }
      const result = await this.bookingsPostForm('addstaff', body)
      this.outputSuccess(result, { action: 'staff.add', count: staffMap.length })
    } catch (error: any) {
      this.handleApiError(error)
    }
  }
}
