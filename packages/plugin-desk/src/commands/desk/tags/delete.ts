import { Args } from '@oclif/core'
import { DeskBaseCommand } from '../../../desk-base-command.js'

export default class DeskTagsDelete extends DeskBaseCommand<typeof DeskTagsDelete> {
  static id = 'desk tags delete'
  static summary = 'Delete a Zoho Desk ticket tag'

  static args = {
    id: Args.string({ description: 'Tag ID', required: true }),
  }

  async run(): Promise<void> {
    const { args } = this
    try {
      await this.deskDelete(`/ticketTags/${args.id}`)
      this.outputSuccess(null, { action: 'desk.tags.delete' })
    } catch (error: any) {
      this.handleApiError(error)
    }
  }
}
