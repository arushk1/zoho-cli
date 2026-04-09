import { Args } from '@oclif/core'
import { DeskBaseCommand } from '../../../desk-base-command.js'

export default class DeskKbCategoriesDelete extends DeskBaseCommand<typeof DeskKbCategoriesDelete> {
  static id = 'desk kb-categories delete'
  static summary = 'Delete a Zoho Desk knowledge base category'

  static args = {
    id: Args.string({ description: 'Category ID', required: true }),
  }

  async run(): Promise<void> {
    const { args } = this
    try {
      await this.deskDelete(`/kbCategories/${args.id}`)
      this.outputSuccess(null, { action: 'desk.kb-categories.delete' })
    } catch (error: any) {
      this.handleApiError(error)
    }
  }
}
