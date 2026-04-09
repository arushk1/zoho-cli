import { Args } from '@oclif/core'
import { DeskBaseCommand } from '../../../desk-base-command.js'

export default class DeskTagsGet extends DeskBaseCommand<typeof DeskTagsGet> {
  static id = 'desk tags get'
  static summary = 'Get a Zoho Desk ticket tag by ID'

  static args = {
    id: Args.string({ description: 'Tag ID', required: true }),
  }

  async run(): Promise<void> {
    const { args } = this
    try {
      const data = await this.deskGet(`/ticketTags/${args.id}`)
      this.outputSuccess(data, { action: 'desk.tags.get' })
    } catch (error: any) {
      this.handleApiError(error)
    }
  }
}
