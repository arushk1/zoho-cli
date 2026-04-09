import { Args, Flags } from '@oclif/core'
import { DeskBaseCommand } from '../../../desk-base-command.js'

export default class DeskKbCategoriesUpdate extends DeskBaseCommand<typeof DeskKbCategoriesUpdate> {
  static id = 'desk kb-categories update'
  static summary = 'Update a Zoho Desk knowledge base category'

  static args = {
    id: Args.string({ description: 'Category ID', required: true }),
  }

  static flags = {
    data: Flags.string({ description: 'Category data as JSON string', required: true, char: 'd' }),
    'dry-run': Flags.boolean({ description: 'Preview without updating', default: false }),
  }

  async run(): Promise<void> {
    const { args, flags } = this
    try {
      const body = JSON.parse(flags.data)
      if (flags['dry-run']) {
        this.outputSuccess(body, { action: 'desk.kb-categories.update.dry-run' })
        return
      }
      const data = await this.deskPatch(`/kbCategories/${args.id}`, body)
      this.outputSuccess(data, { action: 'desk.kb-categories.update' })
    } catch (error: any) {
      this.handleApiError(error)
    }
  }
}
