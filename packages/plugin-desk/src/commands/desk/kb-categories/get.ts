import { Args } from '@oclif/core'
import { DeskBaseCommand } from '../../../desk-base-command.js'

export default class DeskKbCategoriesGet extends DeskBaseCommand<typeof DeskKbCategoriesGet> {
  static id = 'desk kb-categories get'
  static summary = 'Get a Zoho Desk knowledge base category by ID'

  static args = {
    id: Args.string({ description: 'Category ID', required: true }),
  }

  async run(): Promise<void> {
    const { args } = this
    try {
      const data = await this.deskGet(`/kbCategories/${args.id}`)
      this.outputSuccess(data, { action: 'desk.kb-categories.get' })
    } catch (error: any) {
      this.handleApiError(error)
    }
  }
}
