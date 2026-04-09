import { Flags } from '@oclif/core'
import { DeskBaseCommand } from '../../../desk-base-command.js'

export default class DeskContactsSearch extends DeskBaseCommand<typeof DeskContactsSearch> {
  static id = 'desk contacts search'
  static summary = 'Search Zoho Desk contacts'

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

      const data = await this.deskGet('/contacts/search', params)
      this.outputSuccess(data.data ?? [], { action: 'desk.contacts.search' })
    } catch (error: any) {
      this.handleApiError(error)
    }
  }
}
