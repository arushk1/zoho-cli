import { DeskBaseCommand } from '../../../desk-base-command.js'

export default class DeskProductsCount extends DeskBaseCommand<typeof DeskProductsCount> {
  static id = 'desk products count'
  static summary = 'Get count of Zoho Desk products'

  async run(): Promise<void> {
    try {
      const data = await this.deskGet('/products/count')
      this.outputSuccess(data, { action: 'desk.products.count' })
    } catch (error: any) {
      this.handleApiError(error)
    }
  }
}
