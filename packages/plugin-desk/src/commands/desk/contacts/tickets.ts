import { Args, Flags } from '@oclif/core'
import { DeskBaseCommand } from '../../../desk-base-command.js'

export default class DeskContactsTickets extends DeskBaseCommand<typeof DeskContactsTickets> {
  static id = 'desk contacts tickets'
  static summary = 'List tickets for a Zoho Desk contact'

  static args = {
    id: Args.string({ description: 'Contact ID', required: true }),
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

      const data = await this.deskGet(`/contacts/${args.id}/tickets`, params)
      this.outputSuccess(data.data ?? [], { action: 'desk.contacts.tickets' })
    } catch (error: any) {
      this.handleApiError(error)
    }
  }
}
