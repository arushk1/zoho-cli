import { Args } from '@oclif/core'
import { DeskBaseCommand } from '../../../desk-base-command.js'

export default class DeskProductsDelete extends DeskBaseCommand<typeof DeskProductsDelete> {
  static id = 'desk products delete'
  static summary = 'Delete a Zoho Desk product'

  static args = {
    id: Args.string({ description: 'Product ID', required: true }),
  }

  async run(): Promise<void> {
    const { args } = this
    try {
      await this.deskDelete(`/products/${args.id}`)
      this.outputSuccess(null, { action: 'desk.products.delete' })
    } catch (error: any) {
      this.handleApiError(error)
    }
  }
}
