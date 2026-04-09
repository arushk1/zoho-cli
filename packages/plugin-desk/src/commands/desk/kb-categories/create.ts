import { Flags } from '@oclif/core'
import { DeskBaseCommand } from '../../../desk-base-command.js'

export default class DeskKbCategoriesCreate extends DeskBaseCommand<typeof DeskKbCategoriesCreate> {
  static id = 'desk kb-categories create'
  static summary = 'Create a Zoho Desk knowledge base category'

  static flags = {
    data: Flags.string({ description: 'Category data as JSON string', required: true, char: 'd' }),
    'dry-run': Flags.boolean({ description: 'Preview without creating', default: false }),
  }

  async run(): Promise<void> {
    const { flags } = this
    try {
      const body = JSON.parse(flags.data)
      if (flags['dry-run']) {
        this.outputSuccess(body, { action: 'desk.kb-categories.create.dry-run' })
        return
      }
      const data = await this.deskPost('/kbCategories', body)
      this.outputSuccess(data, { action: 'desk.kb-categories.create' })
    } catch (error: any) {
      this.handleApiError(error)
    }
  }
}
