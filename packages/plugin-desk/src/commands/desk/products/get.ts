import { Args } from '@oclif/core'
import { DeskBaseCommand } from '../../../desk-base-command.js'

export default class DeskProductsGet extends DeskBaseCommand<typeof DeskProductsGet> {
  static id = 'desk products get'
  static summary = 'Get a Zoho Desk product by ID'

  static args = {
    id: Args.string({ description: 'Product ID', required: true }),
  }

  async run(): Promise<void> {
    const { args } = this
    try {
      const data = await this.deskGet(`/products/${args.id}`)
      this.outputSuccess(data, { action: 'desk.products.get' })
    } catch (error: any) {
      this.handleApiError(error)
    }
  }
}
