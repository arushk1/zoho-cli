import { Args, Flags } from '@oclif/core'
import { BookingsBaseCommand } from '../../../bookings-base-command.js'

export default class BookingsWorkspacesUpdate extends BookingsBaseCommand<typeof BookingsWorkspacesUpdate> {
  static id = 'bookings workspaces update'
  static summary = 'Update a Zoho Bookings workspace (via dataMap JSON)'
  static examples = [
    'zoho bookings workspaces update ws_123 --data \'{"description":"new desc"}\'',
  ]

  static args = {
    id: Args.string({ description: 'Workspace ID', required: true }),
  }

  static flags = {
    data: Flags.string({ description: 'JSON object for dataMap (see Zoho docs for allowed keys)', required: true }),
    'dry-run': Flags.boolean({ description: 'Show request without executing', default: false }),
  }

  async run(): Promise<void> {
    const { args, flags } = this
    let parsed: Record<string, unknown>
    try {
      parsed = JSON.parse(flags.data)
    } catch {
      this.outputError('INVALID_JSON', 'Invalid JSON in --data flag')
      this.exit(3)
    }
    const body = { workspaceId: args.id, dataMap: parsed }
    if (flags['dry-run']) {
      this.outputSuccess({ dryRun: true, method: 'POST', action: 'updateworkspace', body }, { action: 'workspaces.update' })
      return
    }
    try {
      const result = await this.bookingsPostForm('updateworkspace', body)
      this.outputSuccess(result, { action: 'workspaces.update' })
    } catch (error: any) {
      this.handleApiError(error)
    }
  }
}
