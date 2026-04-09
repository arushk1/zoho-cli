import { Flags } from '@oclif/core'
import { DeskBaseCommand } from '../../../desk-base-command.js'

export default class DeskProductsCreate extends DeskBaseCommand<typeof DeskProductsCreate> {
  static id = 'desk products create'
  static summary = 'Create a Zoho Desk product'

  static flags = {
    data: Flags.string({ description: 'Product data as JSON string', required: true, char: 'd' }),
    'dry-run': Flags.boolean({ description: 'Preview without creating', default: false }),
  }

  async run(): Promise<void> {
    const { flags } = this
    try {
      const body = JSON.parse(flags.data)
      if (flags['dry-run']) {
        this.outputSuccess(body, { action: 'desk.products.create.dry-run' })
        return
      }
      const data = await this.deskPost('/products', body)
      this.outputSuccess(data, { action: 'desk.products.create' })
    } catch (error: any) {
      this.handleApiError(error)
    }
  }
}
