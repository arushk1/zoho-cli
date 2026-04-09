import { Flags } from '@oclif/core'
import { DeskBaseCommand } from '../../../desk-base-command.js'

export default class DeskTimeEntriesList extends DeskBaseCommand<typeof DeskTimeEntriesList> {
  static id = 'desk time-entries list'
  static summary = 'List Zoho Desk time entries'

  static flags = {
    page: Flags.integer({ description: 'Page number', default: 1 }),
    'per-page': Flags.integer({ description: 'Results per page', default: 100 }),
  }

  async run(): Promise<void> {
    const { flags } = this
    try {
      const params: Record<string, string> = {
        ...DeskBaseCommand.paginationParams(flags),
      }

      const data = await this.deskGet('/timeEntries', params)
      this.outputSuccess(data.data ?? [], { action: 'desk.time-entries.list' })
    } catch (error: any) {
      this.handleApiError(error)
    }
  }
}
