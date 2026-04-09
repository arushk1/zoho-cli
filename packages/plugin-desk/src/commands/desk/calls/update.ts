import { Args, Flags } from '@oclif/core'
import { DeskBaseCommand } from '../../../desk-base-command.js'

export default class DeskCallsUpdate extends DeskBaseCommand<typeof DeskCallsUpdate> {
  static id = 'desk calls update'
  static summary = 'Update a Zoho Desk call by ID'

  static args = {
    id: Args.string({ description: 'Call ID', required: true }),
  }

  static flags = {
    data: Flags.string({ description: 'JSON data for the call update', required: true, char: 'd' }),
    'dry-run': Flags.boolean({ description: 'Preview the request without updating', default: false }),
  }

  async run(): Promise<void> {
    const { args, flags } = this
    try {
      let body: unknown
      try {
        body = JSON.parse(flags.data)
      } catch {
        this.outputError('INVALID_JSON', 'The --data flag must be valid JSON')
        this.exit(3)
      }

      if (flags['dry-run']) {
        this.outputSuccess(body, { action: 'desk.calls.update.dry-run' })
        return
      }

      const data = await this.deskPatch(`/calls/${args.id}`, body)
      this.outputSuccess(data, { action: 'desk.calls.update' })
    } catch (error: any) {
      this.handleApiError(error)
    }
  }
}
