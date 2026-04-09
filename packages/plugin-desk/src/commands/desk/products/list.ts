import { Flags } from '@oclif/core'
import { DeskBaseCommand } from '../../../desk-base-command.js'

export default class DeskProductsList extends DeskBaseCommand<typeof DeskProductsList> {
  static id = 'desk products list'
  static summary = 'List Zoho Desk products'

  static flags = {
    page: Flags.integer({ description: 'Page number', default: 1 }),
    'per-page': Flags.integer({ description: 'Results per page', default: 100 }),
  }

  async run(): Promise<void> {
    const { flags } = this
    try {
      const params = DeskBaseCommand.paginationParams(flags)
      const data = await this.deskGet('/products', params)
      this.outputSuccess(data.data ?? [], { action: 'desk.products.list' })
    } catch (error: any) {
      this.handleApiError(error)
    }
  }
}
