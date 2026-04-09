import { Args, Flags } from '@oclif/core'
import { DeskBaseCommand } from '../../../desk-base-command.js'

export default class DeskTagsUpdate extends DeskBaseCommand<typeof DeskTagsUpdate> {
  static id = 'desk tags update'
  static summary = 'Update a Zoho Desk ticket tag'

  static args = {
    id: Args.string({ description: 'Tag ID', required: true }),
  }

  static flags = {
    data: Flags.string({ description: 'Tag data as JSON string', required: true, char: 'd' }),
    'dry-run': Flags.boolean({ description: 'Preview without updating', default: false }),
  }

  async run(): Promise<void> {
    const { args, flags } = this
    try {
      const body = JSON.parse(flags.data)
      if (flags['dry-run']) {
        this.outputSuccess(body, { action: 'desk.tags.update.dry-run' })
        return
      }
      const data = await this.deskPatch(`/ticketTags/${args.id}`, body)
      this.outputSuccess(data, { action: 'desk.tags.update' })
    } catch (error: any) {
      this.handleApiError(error)
    }
  }
}
