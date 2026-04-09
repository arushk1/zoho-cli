import { Flags } from '@oclif/core'
import { DeskBaseCommand } from '../../../desk-base-command.js'

export default class DeskViewsList extends DeskBaseCommand<typeof DeskViewsList> {
  static id = 'desk views list'
  static summary = 'List Zoho Desk views'

  static flags = {
    page: Flags.integer({ description: 'Page number', default: 1 }),
    'per-page': Flags.integer({ description: 'Results per page', default: 100 }),
    module: Flags.string({ description: 'Module to list views for', options: ['tickets', 'contacts', 'accounts', 'tasks', 'calls', 'events'] }),
  }

  async run(): Promise<void> {
    const { flags } = this
    try {
      const params: Record<string, string> = {
        ...DeskBaseCommand.paginationParams(flags),
      }
      if (flags.module) params.module = flags.module
      const data = await this.deskGet('/views', params)
      this.outputSuccess(data.data ?? [], { action: 'desk.views.list' })
    } catch (error: any) {
      this.handleApiError(error)
    }
  }
}
