import { Args, Flags } from '@oclif/core'
import { DeskBaseCommand } from '../../../desk-base-command.js'

export default class DeskContactsGet extends DeskBaseCommand<typeof DeskContactsGet> {
  static id = 'desk contacts get'
  static summary = 'Get a Zoho Desk contact by ID'

  static args = {
    id: Args.string({ description: 'Contact ID', required: true }),
  }

  static flags = {
    include: Flags.string({ description: 'Comma-separated list of related data to include' }),
    fields: Flags.string({ description: 'Comma-separated list of fields to return' }),
  }

  async run(): Promise<void> {
    const { args, flags } = this
    try {
      const params: Record<string, string> = {}
      if (flags.include) params.include = flags.include
      if (flags.fields) params.fields = flags.fields

      const data = await this.deskGet(`/contacts/${args.id}`, params)
      this.outputSuccess(data, { action: 'desk.contacts.get' })
    } catch (error: any) {
      this.handleApiError(error)
    }
  }
}
