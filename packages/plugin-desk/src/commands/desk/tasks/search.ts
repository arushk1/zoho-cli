import { Flags } from '@oclif/core'
import { DeskBaseCommand } from '../../../desk-base-command.js'

export default class DeskTasksSearch extends DeskBaseCommand<typeof DeskTasksSearch> {
  static id = 'desk tasks search'
  static summary = 'Search Zoho Desk tasks'

  static flags = {
    query: Flags.string({ description: 'Search query string', required: true }),
    page: Flags.integer({ description: 'Page number', default: 1 }),
    'per-page': Flags.integer({ description: 'Results per page', default: 100 }),
  }

  async run(): Promise<void> {
    const { flags } = this
    try {
      const params: Record<string, string> = {
        ...DeskBaseCommand.paginationParams(flags),
        word: flags.query,
      }

      const data = await this.deskGet('/tasks/search', params)
      this.outputSuccess(data.data ?? [], { action: 'desk.tasks.search' })
    } catch (error: any) {
      this.handleApiError(error)
    }
  }
}
