import { Flags } from '@oclif/core'
import { DeskBaseCommand } from '../../../desk-base-command.js'

export default class DeskFieldsList extends DeskBaseCommand<typeof DeskFieldsList> {
  static id = 'desk fields list'
  static summary = 'List Zoho Desk fields for a module'

  static flags = {
    module: Flags.string({
      description: 'Module to list fields for',
      default: 'tickets',
      options: ['tickets', 'contacts', 'accounts', 'tasks', 'calls', 'events', 'products'],
    }),
  }

  async run(): Promise<void> {
    const { flags } = this
    try {
      const endpointMap: Record<string, string> = {
        tickets: '/ticketFields',
        contacts: '/contactFields',
        accounts: '/accountFields',
        tasks: '/taskFields',
        calls: '/callFields',
        events: '/eventFields',
        products: '/productFields',
      }
      const path = endpointMap[flags.module] ?? '/ticketFields'
      const data = await this.deskGet(path)
      this.outputSuccess(data.data ?? [], { action: 'desk.fields.list' })
    } catch (error: any) {
      this.handleApiError(error)
    }
  }
}
