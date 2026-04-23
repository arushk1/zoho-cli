import { Args, Flags } from '@oclif/core'
import { BookingsBaseCommand } from '../../../bookings-base-command.js'

export default class BookingsWorkspacesDelete extends BookingsBaseCommand<typeof BookingsWorkspacesDelete> {
  static id = 'bookings workspaces delete'
  static summary = 'Delete a Zoho Bookings workspace'
  static examples = ['zoho bookings workspaces delete ws_123 --ignore-past-appointments']

  static args = {
    id: Args.string({ description: 'Workspace ID', required: true }),
  }

  static flags = {
    'ignore-past-appointments': Flags.boolean({
      description: 'Force delete even if workspace has past appointments',
      default: false,
    }),
    'dry-run': Flags.boolean({ description: 'Show request without executing', default: false }),
  }

  async run(): Promise<void> {
    const { args, flags } = this
    const body = {
      workspaceId: args.id,
      ignorePastAppointment: flags['ignore-past-appointments'] ? 'true' : 'false',
    }
    if (flags['dry-run']) {
      this.outputSuccess({ dryRun: true, method: 'POST', action: 'deleteworkspace', body }, { action: 'workspaces.delete' })
      return
    }
    try {
      const result = await this.bookingsPostForm('deleteworkspace', body)
      this.outputSuccess(result, { action: 'workspaces.delete' })
    } catch (error: any) {
      this.handleApiError(error)
    }
  }
}
