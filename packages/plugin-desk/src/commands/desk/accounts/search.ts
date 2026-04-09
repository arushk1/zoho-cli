import { Flags } from '@oclif/core'
import { DeskBaseCommand } from '../../../desk-base-command.js'

export default class DeskAccountsSearch extends DeskBaseCommand<typeof DeskAccountsSearch> {
  static id = 'desk accounts search'
  static summary = 'Search Zoho Desk accounts'

  static flags = {
    query: Flags.string({ description: 'Search query string', required: true }),
    page: Flags.integer({ description: 'Page number', default: 1 }),
    'per-page': Flags.integer({ description: 'Results per page', default: 100 }),
  }

  async run(): Promise<void> {
    const { flags } = this
    try {
      const params: Record<string, string> = {
        searchStr: flags.query,
        ...DeskBaseCommand.paginationParams(flags),
      }

      const data = await this.deskGet('/accounts/search', params)
      this.outputSuccess(data.data ?? [], { action: 'desk.accounts.search' })
    } catch (error: any) {
      this.handleApiError(error)
    }
  }
}
