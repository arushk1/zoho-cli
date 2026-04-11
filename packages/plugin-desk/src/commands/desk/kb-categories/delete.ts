import { Args, Flags } from '@oclif/core'
import { DeskBaseCommand } from '../../../desk-base-command.js'

export default class DeskKbCategoriesDelete extends DeskBaseCommand<typeof DeskKbCategoriesDelete> {
  static id = 'desk kb-categories delete'
  static summary = 'Delete a Zoho Desk knowledge base category'

  static args = {
    id: Args.string({ description: 'Category ID', required: true }),
  }

  static flags = {
    'dry-run': Flags.boolean({ description: 'Preview without deleting', default: false }),
  }

  async run(): Promise<void> {
    const { args, flags } = this
    try {
      if (flags['dry-run']) {
        this.outputSuccess({ deleted: false, id: args.id, dryRun: true }, { action: 'desk.kb-categories.delete.dry-run' })
        return
      }
      await this.deskDelete(`/kbCategories/${args.id}`)
      this.outputSuccess(null, { action: 'desk.kb-categories.delete' })
    } catch (error: any) {
      this.handleApiError(error)
    }
  }
}
