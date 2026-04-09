import { Flags } from '@oclif/core'
import { DeskBaseCommand } from '../../../desk-base-command.js'

export default class DeskAccountsList extends DeskBaseCommand<typeof DeskAccountsList> {
  static id = 'desk accounts list'
  static summary = 'List Zoho Desk accounts'

  static flags = {
    page: Flags.integer({ description: 'Page number', default: 1 }),
    'per-page': Flags.integer({ description: 'Results per page', default: 100 }),
    'sort-by': Flags.string({ description: 'Field to sort by' }),
    'sort-order': Flags.string({ description: 'Sort order', options: ['asc', 'desc'] }),
  }

  async run(): Promise<void> {
    const { flags } = this
    try {
      const params: Record<string, string> = {
        ...DeskBaseCommand.paginationParams(flags),
      }
      if (flags['sort-by']) params.sortBy = flags['sort-by']
      if (flags['sort-order']) params.sortOrder = flags['sort-order']

      const data = await this.deskGet('/accounts', params)
      this.outputSuccess(data.data ?? [], { action: 'desk.accounts.list' })
    } catch (error: any) {
      this.handleApiError(error)
    }
  }
}
