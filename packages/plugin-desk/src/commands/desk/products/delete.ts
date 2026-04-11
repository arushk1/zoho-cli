import { Args, Flags } from '@oclif/core'
import { DeskBaseCommand } from '../../../desk-base-command.js'

export default class DeskProductsDelete extends DeskBaseCommand<typeof DeskProductsDelete> {
  static id = 'desk products delete'
  static summary = 'Delete a Zoho Desk product'

  static args = {
    id: Args.string({ description: 'Product ID', required: true }),
  }

  static flags = {
    'dry-run': Flags.boolean({ description: 'Preview without deleting', default: false }),
  }

  async run(): Promise<void> {
    const { args, flags } = this
    try {
      if (flags['dry-run']) {
        this.outputSuccess({ deleted: false, id: args.id, dryRun: true }, { action: 'desk.products.delete.dry-run' })
        return
      }
      await this.deskDelete(`/products/${args.id}`)
      this.outputSuccess(null, { action: 'desk.products.delete' })
    } catch (error: any) {
      this.handleApiError(error)
    }
  }
}
