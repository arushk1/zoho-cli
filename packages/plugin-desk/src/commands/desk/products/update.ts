import { Args, Flags } from '@oclif/core'
import { DeskBaseCommand } from '../../../desk-base-command.js'

export default class DeskProductsUpdate extends DeskBaseCommand<typeof DeskProductsUpdate> {
  static id = 'desk products update'
  static summary = 'Update a Zoho Desk product'

  static args = {
    id: Args.string({ description: 'Product ID', required: true }),
  }

  static flags = {
    data: Flags.string({ description: 'Product data as JSON string', required: true, char: 'd' }),
    'dry-run': Flags.boolean({ description: 'Preview without updating', default: false }),
  }

  async run(): Promise<void> {
    const { args, flags } = this
    try {
      const body = JSON.parse(flags.data)
      if (flags['dry-run']) {
        this.outputSuccess(body, { action: 'desk.products.update.dry-run' })
        return
      }
      const data = await this.deskPatch(`/products/${args.id}`, body)
      this.outputSuccess(data, { action: 'desk.products.update' })
    } catch (error: any) {
      this.handleApiError(error)
    }
  }
}
