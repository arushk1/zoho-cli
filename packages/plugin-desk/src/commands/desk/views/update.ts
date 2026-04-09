import { Args, Flags } from '@oclif/core'
import { DeskBaseCommand } from '../../../desk-base-command.js'

export default class DeskViewsUpdate extends DeskBaseCommand<typeof DeskViewsUpdate> {
  static id = 'desk views update'
  static summary = 'Update a Zoho Desk view'

  static args = {
    id: Args.string({ description: 'View ID', required: true }),
  }

  static flags = {
    data: Flags.string({ description: 'View data as JSON string', required: true, char: 'd' }),
    'dry-run': Flags.boolean({ description: 'Preview without updating', default: false }),
  }

  async run(): Promise<void> {
    const { args, flags } = this
    try {
      const body = JSON.parse(flags.data)
      if (flags['dry-run']) {
        this.outputSuccess(body, { action: 'desk.views.update.dry-run' })
        return
      }
      const data = await this.deskPatch(`/views/${args.id}`, body)
      this.outputSuccess(data, { action: 'desk.views.update' })
    } catch (error: any) {
      this.handleApiError(error)
    }
  }
}
