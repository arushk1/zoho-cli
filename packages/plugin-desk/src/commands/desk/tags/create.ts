import { Flags } from '@oclif/core'
import { DeskBaseCommand } from '../../../desk-base-command.js'

export default class DeskTagsCreate extends DeskBaseCommand<typeof DeskTagsCreate> {
  static id = 'desk tags create'
  static summary = 'Create a Zoho Desk ticket tag'

  static flags = {
    data: Flags.string({ description: 'Tag data as JSON string', required: true, char: 'd' }),
    'dry-run': Flags.boolean({ description: 'Preview without creating', default: false }),
  }

  async run(): Promise<void> {
    const { flags } = this
    try {
      const body = JSON.parse(flags.data)
      if (flags['dry-run']) {
        this.outputSuccess(body, { action: 'desk.tags.create.dry-run' })
        return
      }
      const data = await this.deskPost('/ticketTags', body)
      this.outputSuccess(data, { action: 'desk.tags.create' })
    } catch (error: any) {
      this.handleApiError(error)
    }
  }
}
