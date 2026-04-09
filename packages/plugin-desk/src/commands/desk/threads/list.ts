import { Flags } from '@oclif/core'
import { DeskBaseCommand } from '../../../desk-base-command.js'

export default class DeskThreadsList extends DeskBaseCommand<typeof DeskThreadsList> {
  static id = 'desk threads list'
  static summary = 'List threads for a ticket'

  static flags = {
    ticket: Flags.string({ description: 'Ticket ID', required: true, char: 't' }),
    page: Flags.integer({ description: 'Page number', default: 1 }),
    'per-page': Flags.integer({ description: 'Records per page (max 100)', default: 100 }),
  }

  async run(): Promise<void> {
    const { flags } = this
    try {
      const params = { ...DeskBaseCommand.paginationParams(flags) }
      const data = await this.deskGet(`/tickets/${flags.ticket}/threads`, params)
      this.outputSuccess(data.data ?? [], { action: 'desk.threads.list', page: flags.page, perPage: flags['per-page'], count: data.data?.length ?? 0 })
    } catch (error: any) {
      this.handleApiError(error)
    }
  }
}
