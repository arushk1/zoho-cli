import { Flags } from '@oclif/core'
import { BookingsBaseCommand } from '../../../bookings-base-command.js'

export default class BookingsWorkspacesCreate extends BookingsBaseCommand<typeof BookingsWorkspacesCreate> {
  static id = 'bookings workspaces create'
  static summary = 'Create a Zoho Bookings workspace'
  static examples = ['zoho bookings workspaces create --name "Sales Team"']

  static flags = {
    name: Flags.string({ description: 'Workspace name (2-50 chars)', required: true }),
    'dry-run': Flags.boolean({ description: 'Show request without executing', default: false }),
  }

  async run(): Promise<void> {
    const { flags } = this
    if (flags['dry-run']) {
      this.outputSuccess({ dryRun: true, method: 'POST', action: 'createworkspace', body: { name: flags.name } }, { action: 'workspaces.create' })
      return
    }
    try {
      const result = await this.bookingsPostForm('createworkspace', { name: flags.name })
      this.outputSuccess(result, { action: 'workspaces.create' })
    } catch (error: any) {
      this.handleApiError(error)
    }
  }
}
