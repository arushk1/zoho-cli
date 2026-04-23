import { Flags } from '@oclif/core'
import { BookingsBaseCommand } from '../../../bookings-base-command.js'

export default class BookingsServicesCreate extends BookingsBaseCommand<typeof BookingsServicesCreate> {
  static id = 'bookings services create'
  static summary = 'Create a one-on-one Zoho Bookings service'
  static examples = ['zoho bookings services create --name "30-min Consult" --duration 30']

  static flags = {
    name: Flags.string({ description: 'Service name', required: true }),
    duration: Flags.integer({ description: 'Duration in minutes' }),
    cost: Flags.string({ description: 'Cost (number; currency from workspace)' }),
    'pre-buffer': Flags.integer({ description: 'Pre-buffer in minutes' }),
    'post-buffer': Flags.integer({ description: 'Post-buffer in minutes' }),
    description: Flags.string({ description: 'Service description' }),
    'assigned-staffs': Flags.string({ description: 'Comma-separated staff IDs to assign' }),
    'meeting-mode': Flags.string({ description: 'online | offline', options: ['online', 'offline'] }),
    'meeting-type': Flags.string({ description: 'zohomeeting|zoom|teams|gmeet (online) or physical address (offline)' }),
    'dry-run': Flags.boolean({ description: 'Show request without executing', default: false }),
  }

  async run(): Promise<void> {
    const { flags } = this
    try {
      const workspace = await this.resolveWorkspaceId()
      const fields: Record<string, unknown> = {
        workspace_id: workspace,
        name: flags.name,
        duration: flags.duration,
        cost: flags.cost,
        pre_buffer: flags['pre-buffer'],
        post_buffer: flags['post-buffer'],
        description: flags.description,
        assigned_staffs: flags['assigned-staffs']?.split(',').map((s) => s.trim()).filter(Boolean),
        meeting_mode: flags['meeting-mode'],
        meeting_type: flags['meeting-type'],
      }
      if (flags['dry-run']) {
        this.outputSuccess({ dryRun: true, method: 'POST', action: 'createservice', body: fields }, { action: 'services.create' })
        return
      }
      const result = await this.bookingsPostForm('createservice', fields)
      this.outputSuccess(result, { action: 'services.create' })
    } catch (error: any) {
      this.handleApiError(error)
    }
  }
}
