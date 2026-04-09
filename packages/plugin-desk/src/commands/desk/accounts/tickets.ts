import { Args, Flags } from '@oclif/core'
import { DeskBaseCommand } from '../../../desk-base-command.js'

export default class DeskAccountsTickets extends DeskBaseCommand<typeof DeskAccountsTickets> {
  static id = 'desk accounts tickets'
  static summary = 'List tickets for a Zoho Desk account'

  static args = {
    id: Args.string({ description: 'Account ID', required: true }),
  }

  static flags = {
    page: Flags.integer({ description: 'Page number', default: 1 }),
    'per-page': Flags.integer({ description: 'Results per page', default: 100 }),
  }

  async run(): Promise<void> {
    const { args, flags } = this
    try {
      const params: Record<string, string> = {
        ...DeskBaseCommand.paginationParams(flags),
      }

      const data = await this.deskGet(`/accounts/${args.id}/tickets`, params)
      this.outputSuccess(data.data ?? [], { action: 'desk.accounts.tickets' })
    } catch (error: any) {
      this.handleApiError(error)
    }
  }
}
