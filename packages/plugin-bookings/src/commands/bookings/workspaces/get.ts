import { Args } from '@oclif/core'
import { BookingsBaseCommand } from '../../../bookings-base-command.js'

export default class BookingsWorkspacesGet extends BookingsBaseCommand<typeof BookingsWorkspacesGet> {
  static id = 'bookings workspaces get'
  static summary = 'Get a Zoho Bookings workspace by ID'

  static args = {
    id: Args.string({ description: 'Workspace ID', required: true }),
  }

  async run(): Promise<void> {
    try {
      const result = await this.bookingsGet<any>('workspaces', { workspace_id: this.args.id })
      this.outputSuccess(result, { action: 'workspaces.get' })
    } catch (error: any) {
      this.handleApiError(error)
    }
  }
}
